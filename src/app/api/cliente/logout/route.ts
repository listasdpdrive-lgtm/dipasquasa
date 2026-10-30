import Redis from "ioredis"
import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "cliente_session"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const redisUrl =
    process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value

  if (sessionToken && redisUrl) {
    const redis = new Redis(redisUrl, {
      connectTimeout: 5000,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
    })

    try {
      await redis.del(`sesiones-cliente:${sessionToken}`)
    } catch (error) {
      console.error(
        "No se pudo invalidar la sesión del cliente:",
        error instanceof Error ? error.message : "Error desconocido"
      )
      return NextResponse.json(
        { error: "No se pudo cerrar la sesión. Intentá nuevamente." },
        { status: 500 }
      )
    } finally {
      redis.disconnect()
    }
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.delete(SESSION_COOKIE)
  return response
}
