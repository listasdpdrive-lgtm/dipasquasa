import Redis from "ioredis"
import { NextRequest, NextResponse } from "next/server"
import { sendPush, type PushSubscriptionJson } from "@/lib/cliente/push"

export const dynamic = "force-dynamic"
export const maxDuration = 60

type Fields = Record<string, string>

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")
}

function amount(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null
  const raw = String(value).trim().replace(/[^\d,.-]/g, "")
  if (!raw) return null
  const parsed = Number(raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw)
  return Number.isFinite(parsed) ? parsed : null
}

function receiptTotal(fields: Fields): number | null {
  let meta: Record<string, unknown> = {}
  try { meta = JSON.parse(fields.__meta || "{}") as Record<string, unknown> } catch { /* malformed metadata */ }
  const direct = amount(meta.total)
  if (direct !== null) return direct
  const items = Object.entries(fields).flatMap(([key, value]) => {
    if (key === "__meta") return []
    try {
      const item = JSON.parse(value) as Record<string, unknown>
      return (item.descripcion || item.codigo) ? [item] : []
    } catch { return [] }
  })
  if (!items.length) return null
  let total = 0
  for (const item of items) {
    const cost = amount(item.costo ?? item.cost ?? item.precio)
    const quantity = amount(item.cantidad ?? item.quantity)
    if (cost === null || quantity === null) return null
    total += cost * quantity
  }
  return total
}

async function scanKeys(redis: Redis, pattern: string) {
  const keys: string[] = []
  let cursor = "0"
  do {
    const [next, found] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 200)
    cursor = next
    keys.push(...found)
  } while (cursor !== "0")
  return keys
}

async function getPendingBalance(redis: Redis, cuit: string) {
  const paid = new Set(await redis.smembers(`cuentas:${cuit}:remitos:pagados`))
  const keys = await scanKeys(redis, `cuentas:${cuit}:remitos:*`)
  let balance = 0
  let complete = true
  for (const key of keys) {
    if (key.endsWith(":pagados") || await redis.type(key) !== "hash") continue
    const id = key.slice(`cuentas:${cuit}:remitos:`.length)
    if (paid.has(id)) continue
    const total = receiptTotal(await redis.hgetall(key))
    if (total === null) complete = false
    else balance += total
  }
  return { balance, complete }
}

async function sendAccountAlert(redis: Redis, cuit: string, title: string, body: string) {
  const key = `cuentas:${cuit}:push`
  const entries = Object.entries(await redis.hgetall(key))
  const results = await Promise.allSettled(entries.map(async ([field, raw]) => {
    try { await sendPush(JSON.parse(raw) as PushSubscriptionJson, { title, body, url: "/cliente/cuenta" }) }
    catch (error) {
      if (typeof error === "object" && error !== null && "statusCode" in error && [404, 410].includes(Number(error.statusCode))) await redis.hdel(key, field)
      throw error
    }
  }))
  return results.some((result) => result.status === "fulfilled")
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) return NextResponse.json({ error: "CRON_SECRET no está configurado." }, { status: 503 })
  if (request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  const redisUrl = process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  if (!redisUrl) return NextResponse.json({ error: "Redis no está configurado." }, { status: 500 })
  const redis = new Redis(redisUrl, { connectTimeout: 5000, maxRetriesPerRequest: 1, retryStrategy: () => null })
  let checked = 0
  let sent = 0
  try {
    const accountKeys = await scanKeys(redis, "cuentas:*")
    for (const accountKey of accountKeys) {
      const match = accountKey.match(/^cuentas:(\d{11})$/)
      if (!match || await redis.type(accountKey) !== "hash") continue
      const cuit = match[1]
      const fields = await redis.hgetall(accountKey)
      const limitValue = Object.entries(fields).find(([field, value]) => normalize(field) === "limitecredito" && value.trim())?.[1]
      const limit = amount(limitValue)
      if (limit === null || limit <= 0) continue
      const pending = await getPendingBalance(redis, cuit)
      if (!pending.complete) continue
      checked++
      const usage = pending.balance / limit
      const status = usage >= 1 ? "exceeded" : usage >= 0.8 ? "near" : ""
      const statusKey = `cuentas:${cuit}:push:limit-status`
      const previousStatus = await redis.get(statusKey)
      if (!status) {
        if (previousStatus) await redis.del(statusKey)
        continue
      }
      if (status === previousStatus) continue
      const sentToDevice = await sendAccountAlert(
        redis,
        cuit,
        status === "exceeded" ? "Superaste el límite de tu cuenta" : "Estás cerca del límite de tu cuenta",
        `Tu saldo pendiente representa ${new Intl.NumberFormat("es-AR", { style: "percent", maximumFractionDigits: 0 }).format(usage)} del límite de crédito.`
      )
      if (sentToDevice) {
        await redis.set(statusKey, status)
        sent++
      }
    }
    return NextResponse.json({ ok: true, checked, notificationsSent: sent })
  } catch (error) {
    console.error("No se pudo revisar los límites de cuenta:", error instanceof Error ? error.message : "Error desconocido")
    return NextResponse.json({ error: "No se pudieron revisar los límites." }, { status: 500 })
  } finally { redis.disconnect() }
}
