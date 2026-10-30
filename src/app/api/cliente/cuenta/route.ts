import Redis from "ioredis"
import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "cliente_session"
const REMITOS_SCAN_COUNT = 100

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const redisUrl =
    process.env.REDIS_URL || process.env.DATABASE_REDIS_URL
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value

  if (!sessionToken) {
    return NextResponse.json(
      { error: "La sesión no es válida. Iniciá sesión nuevamente." },
      { status: 401 }
    )
  }

  if (!redisUrl) {
    console.error("Faltan REDIS_URL o DATABASE_REDIS_URL.")
    return NextResponse.json(
      { error: "El acceso de clientes no está configurado." },
      { status: 500 }
    )
  }

  const redis = new Redis(redisUrl, {
    connectTimeout: 5000,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
  })

  try {
    const sessionKey = `sesiones-cliente:${sessionToken}`
    const accountKey = await redis.get(sessionKey)
    if (!accountKey || !/^cuentas:\d{11}$/.test(accountKey)) {
      const response = NextResponse.json(
        { error: "La sesión venció. Iniciá sesión nuevamente." },
        { status: 401 }
      )
      response.cookies.delete(SESSION_COOKIE)
      return response
    }

    if ((await redis.type(accountKey)) !== "hash") {
      return NextResponse.json(
        { error: "No se encontró la información de esta cuenta." },
        { status: 404 }
      )
    }

    const account = omitPassword(await redis.hgetall(accountKey))
    const cuit = accountKey.slice("cuentas:".length)
    const remitos = await getRemitos(redis, cuit)
    const paidRemitos = await redis.smembers(`cuentas:${cuit}:remitos:pagados`)
    const recibos = await getRecibos(redis, cuit)

    return NextResponse.json({ account, remitos, paidRemitos, recibos })
  } catch (error) {
    console.error(
      "No se pudo cargar la cuenta del cliente:",
      error instanceof Error ? error.message : "Error desconocido"
    )
    return NextResponse.json(
      { error: "No se pudo cargar la información de la cuenta." },
      { status: 500 }
    )
  } finally {
    redis.disconnect()
  }
}

function omitPassword(fields: Record<string, string>) {
  const { password: _password, ...publicFields } = fields
  return publicFields
}

async function getRemitos(redis: Redis, cuit: string) {
  const remitos: { id: string; fields: Record<string, string> }[] = []
  const prefix = `cuentas:${cuit}:remitos:`
  let cursor = "0"

  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      "MATCH",
      `${prefix}*`,
      "COUNT",
      REMITOS_SCAN_COUNT
    )
    cursor = nextCursor

    for (const key of keys) {
      if ((await redis.type(key)) !== "hash") {
        continue
      }

      remitos.push({
        id: key.slice(prefix.length),
        fields: omitPassword(await redis.hgetall(key)),
      })
    }
  } while (cursor !== "0")

  return remitos.sort((left, right) => left.id.localeCompare(right.id))
}

async function getRecibos(redis: Redis, cuit: string) {
  const recibos: { id: string; fields: Record<string, string> }[] = []
  const prefix = `cuentas:${cuit}:recibos:`
  let cursor = "0"

  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      "MATCH",
      `${prefix}*`,
      "COUNT",
      REMITOS_SCAN_COUNT
    )
    cursor = nextCursor

    for (const key of keys) {
      if ((await redis.type(key)) !== "hash") continue
      recibos.push({
        id: key.slice(prefix.length),
        fields: omitPassword(await redis.hgetall(key)),
      })
    }
  } while (cursor !== "0")

  return recibos.sort((left, right) => left.id.localeCompare(right.id))
}
