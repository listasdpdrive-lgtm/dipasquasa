import Redis from "ioredis"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "node:crypto"

const SESSION_COOKIE = "cliente_session"
const SESSION_TTL_SECONDS = 60 * 60 * 8

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const redisUrl =
    process.env.REDIS_URL || process.env.DATABASE_REDIS_URL

  if (!redisUrl) {
    console.error("Faltan REDIS_URL o DATABASE_REDIS_URL.")
    return NextResponse.json(
      { error: "El acceso de clientes no está configurado." },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "La solicitud no tiene un formato válido." },
      { status: 400 }
    )
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("cuit" in body) ||
    !("username" in body) ||
    !("password" in body) ||
    typeof body.cuit !== "string" ||
    typeof body.username !== "string" ||
    typeof body.password !== "string" ||
    !/^(?:\d{11}|\d{2}-\d{8}-\d)$/.test(body.cuit.trim()) ||
    !body.username.trim() ||
    !body.password ||
    body.username.length > 120 ||
    body.password.length > 256
  ) {
    return NextResponse.json(
      { error: "Ingresá un usuario y una contraseña válidos." },
      { status: 400 }
    )
  }

  const cuit = body.cuit.replace(/-/g, "")
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  const redis = new Redis(redisUrl, {
    connectTimeout: 5000,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
  })

  try {
    const attempts = await redis.eval(
      "local count = redis.call('INCR', KEYS[1]); if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return count",
      1,
      `ratelimit:cliente-login:${ip}`,
      15 * 60
    )
    if (Number(attempts) > 5) {
      return NextResponse.json(
        { error: "Demasiados intentos. Esperá unos minutos e intentá nuevamente." },
        { status: 429 }
      )
    }

    const accountKey = `cuentas:${cuit}`
    if ((await redis.type(accountKey)) !== "hash") {
      return invalidCredentials()
    }

    const [storedUsername, storedPassword] = await Promise.all([
      redis.hget(accountKey, "username"),
      redis.hget(accountKey, "password"),
    ])
    if (
      storedUsername !== body.username.trim() ||
      storedPassword === null ||
      storedPassword !== body.password
    ) {
      return invalidCredentials()
    }

    const sessionToken = randomUUID()
    await redis.set(
      `sesiones-cliente:${sessionToken}`,
      accountKey,
      "EX",
      SESSION_TTL_SECONDS
    )

    const response = NextResponse.json({ ok: true })
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    })
    return response
  } catch (error) {
    console.error(
      "No se pudo autenticar al cliente:",
      error instanceof Error ? error.message : "Error desconocido"
    )
    return NextResponse.json(
      { error: "No se pudo completar el inicio de sesión." },
      { status: 500 }
    )
  } finally {
    redis.disconnect()
  }
}

function invalidCredentials() {
  return NextResponse.json(
    { error: "Usuario o contraseña incorrectos." },
    { status: 401 }
  )
}
