import Redis from "ioredis"
import { NextRequest, NextResponse } from "next/server"
import { sendPush, type PushSubscriptionJson } from "@/lib/cliente/push"

export const dynamic = "force-dynamic"
export const maxDuration = 30

export async function POST(request: NextRequest) {
  const redisUrl = process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  if (!redisUrl) return NextResponse.json({ error: "Redis no está configurado." }, { status: 500 })
  const token = request.cookies.get("cliente_session")?.value
  if (!token) return NextResponse.json({ error: "La sesión venció." }, { status: 401 })
  const redis = new Redis(redisUrl, { connectTimeout: 5000, maxRetriesPerRequest: 1, retryStrategy: () => null })
  try {
    let closedWebTest = false
    let delaySeconds = 0
    let limitStatus: "near" | "exceeded" | null = null
    try {
      const body: unknown = await request.json()
      if (typeof body === "object" && body !== null) {
        closedWebTest = "closedWebTest" in body && body.closedWebTest === true
        if ("limitStatus" in body && (body.limitStatus === "near" || body.limitStatus === "exceeded")) {
          limitStatus = body.limitStatus
        }
        if (closedWebTest && "delaySeconds" in body && body.delaySeconds === 15) delaySeconds = 15
      }
    } catch { /* The body is optional for the regular test button. */ }
    const accountKey = await redis.get(`sesiones-cliente:${token}`)
    if (!accountKey || !/^cuentas:\d{11}$/.test(accountKey)) return NextResponse.json({ error: "La sesión venció." }, { status: 401 })
    const subscriptions = await redis.hgetall(`${accountKey}:push`)
    const entries = Object.entries(subscriptions)
    if (delaySeconds > 0) await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000))
    if (!entries.length) return NextResponse.json({ error: "Este dispositivo todavía no está suscrito. Activa las notificaciones primero." }, { status: 404 })
    const results = await Promise.allSettled(entries.map(async ([field, value]) => {
      try {
        const payload = limitStatus === "exceeded"
          ? { title: "Superaste el lÃ­mite de tu cuenta", body: "Esta es una prueba: el saldo pendiente alcanzÃ³ el 100% del lÃ­mite de crÃ©dito.", url: "/cliente/cuenta" }
          : limitStatus === "near"
            ? { title: "EstÃ¡s cerca del lÃ­mite de tu cuenta", body: "Esta es una prueba: el saldo pendiente alcanzÃ³ el 80% del lÃ­mite de crÃ©dito.", url: "/cliente/cuenta" }
            : closedWebTest
              ? { title: "Prueba con la web cerrada", body: "Push enviado para probar el aviso con la pagina cerrada.", url: "/cliente/cuenta" }
              : { title: "Notificacion de prueba", body: "Las notificaciones push estan funcionando en este dispositivo.", url: "/cliente/cuenta" }
        await sendPush(JSON.parse(value) as PushSubscriptionJson, payload)
      }
      catch (error) {
        if (typeof error === "object" && error !== null && "statusCode" in error && [404, 410].includes(Number(error.statusCode))) {
          await redis.hdel(`${accountKey}:push`, field)
        }
        throw error
      }
    }))
    const delivered = results.filter((result) => result.status === "fulfilled").length
    const failures = results.flatMap((result) => {
      if (result.status !== "rejected") return []
      const reason = result.reason as { statusCode?: number; message?: string }
      return [reason.statusCode ? `HTTP ${reason.statusCode}` : (reason.message || "Error de red").slice(0, 120)]
    })
    if (failures.length) console.error("El proveedor push rechazó suscripciones:", failures)
    if (!delivered) return NextResponse.json({ error: 'El proveedor rechazo el push (' + failures.join(', ') + '). Revisa suscripcion y claves VAPID.' }, { status: 502 })
    return NextResponse.json({ ok: true, devices: delivered })
  } catch (error) {
    console.error("No se pudo enviar la prueba push:", error instanceof Error ? error.message : "Error desconocido")
    return NextResponse.json({ error: "No se pudo enviar la notificación de prueba." }, { status: 500 })
  } finally { redis.disconnect() }
}
