import Redis from "ioredis"
import { createHash } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { configureWebPush, isAllowedPushEndpoint, type PushSubscriptionJson } from "@/lib/cliente/push"

const SESSION_COOKIE = "cliente_session"
const redisOptions = { connectTimeout: 5000, maxRetriesPerRequest: 1, retryStrategy: () => null }
export const dynamic = "force-dynamic"

async function getAccount(request: NextRequest, redis: Redis) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) return null
  const accountKey = await redis.get(`sesiones-cliente:${token}`)
  return accountKey && /^cuentas:\d{11}$/.test(accountKey) ? accountKey : null
}

export async function GET(request: NextRequest) {
  const redisUrl = process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  if (!redisUrl) return NextResponse.json({ error: "Redis no está configurado." }, { status: 500 })
  const redis = new Redis(redisUrl, redisOptions)
  try {
    if (!(await getAccount(request, redis))) return NextResponse.json({ error: "La sesión venció." }, { status: 401 })
    const { publicKey } = configureWebPush()
    return NextResponse.json({ publicKey })
  } catch (error) {
    console.error("No se pudo preparar Web Push:", error instanceof Error ? error.message : "Error desconocido")
    return NextResponse.json({ error: "Las notificaciones push no están configuradas en el servidor." }, { status: 503 })
  } finally { redis.disconnect() }
}

export async function POST(request: NextRequest) {
  const redisUrl = process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  if (!redisUrl) return NextResponse.json({ error: "Redis no está configurado." }, { status: 500 })
  const redis = new Redis(redisUrl, redisOptions)
  try {
    const accountKey = await getAccount(request, redis)
    if (!accountKey) return NextResponse.json({ error: "La sesión venció." }, { status: 401 })
    let body: unknown
    try { body = await request.json() } catch { return NextResponse.json({ error: "Suscripción inválida." }, { status: 400 }) }
    if (!body || typeof body !== "object" || !("endpoint" in body) || !("keys" in body)) {
      return NextResponse.json({ error: "Suscripción inválida." }, { status: 400 })
    }
    const subscription = body as PushSubscriptionJson
    if (typeof subscription.endpoint !== "string" || subscription.endpoint.length > 2048 ||
      !isAllowedPushEndpoint(subscription.endpoint) || !subscription.keys ||
      typeof subscription.keys.p256dh !== "string" || typeof subscription.keys.auth !== "string" ||
      subscription.keys.p256dh.length > 200 || subscription.keys.auth.length > 100) {
      return NextResponse.json({ error: "Suscripción inválida." }, { status: 400 })
    }
    const field = createHash("sha256").update(subscription.endpoint).digest("hex")
    await redis.hset(`${accountKey}:push`, field, JSON.stringify(subscription))
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("No se pudo guardar la suscripción push:", error instanceof Error ? error.message : "Error desconocido")
    return NextResponse.json({ error: "No se pudo guardar el dispositivo." }, { status: 500 })
  } finally { redis.disconnect() }
}

export async function DELETE(request: NextRequest) {
  const redisUrl = process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  if (!redisUrl) return NextResponse.json({ error: "Redis no está configurado." }, { status: 500 })
  const redis = new Redis(redisUrl, redisOptions)
  try {
    const accountKey = await getAccount(request, redis)
    if (!accountKey) return NextResponse.json({ error: "La sesión venció." }, { status: 401 })
    let body: { endpoint?: unknown }
    try { body = await request.json() } catch { return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 }) }
    if (typeof body.endpoint !== "string") return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
    const field = createHash("sha256").update(body.endpoint).digest("hex")
    await redis.hdel(`${accountKey}:push`, field)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "No se pudo quitar el dispositivo." }, { status: 500 })
  } finally { redis.disconnect() }
}
