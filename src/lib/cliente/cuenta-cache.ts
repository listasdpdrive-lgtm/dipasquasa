export type ClientAccountData = {
  account: Record<string, string>
  remitos: { id: string; fields: Record<string, string> }[]
  paidRemitos: string[]
  recibos: { id: string; fields: Record<string, string> }[]
}

export class ClientAccountLoadError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message)
    this.name = "ClientAccountLoadError"
  }
}

let cachedAccountData: ClientAccountData | null = null
let accountRequest:
  | { version: number; promise: Promise<ClientAccountData> }
  | null = null
let cacheVersion = 0

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((field) => typeof field === "string")
  )
}

function isClientAccountData(value: unknown): value is ClientAccountData {
  if (
    typeof value !== "object" ||
    value === null ||
    !("account" in value) ||
    !("remitos" in value) ||
    !("paidRemitos" in value) ||
    !("recibos" in value) ||
    !isStringRecord(value.account) ||
    !Array.isArray(value.remitos) ||
    !Array.isArray(value.recibos) ||
    !Array.isArray(value.paidRemitos) ||
    !value.paidRemitos.every((id) => typeof id === "string")
  ) {
    return false
  }

  const isReceiptList = (entries: unknown[]) => entries.every(
    (remito) =>
      typeof remito === "object" &&
      remito !== null &&
      "id" in remito &&
      typeof remito.id === "string" &&
      "fields" in remito &&
      isStringRecord(remito.fields)
  )
  return isReceiptList(value.remitos) && isReceiptList(value.recibos)
}

export function getCachedClientAccountData() {
  return cachedAccountData
}

export function clearClientAccountCache() {
  cachedAccountData = null
  accountRequest = null
  cacheVersion += 1
}

export function loadClientAccountData() {
  if (cachedAccountData) {
    return Promise.resolve(cachedAccountData)
  }
  if (accountRequest?.version === cacheVersion) {
    return accountRequest.promise
  }

  const version = cacheVersion
  const promise = fetch("/api/cliente/cuenta", {
    cache: "no-store",
  })
    .then(async (response) => {
      let result: unknown
      try {
        result = await response.json()
      } catch {
        throw new ClientAccountLoadError(
          "No se pudo leer la información de la cuenta.",
          response.status
        )
      }

      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "No se pudo cargar la cuenta."
        throw new ClientAccountLoadError(message, response.status)
      }

      if (!isClientAccountData(result)) {
        throw new ClientAccountLoadError(
          "La respuesta de la cuenta no tiene un formato válido.",
          response.status
        )
      }

      if (cacheVersion === version) {
        cachedAccountData = result
      }
      return result
    })
    .finally(() => {
      if (accountRequest?.promise === promise) {
        accountRequest = null
      }
    })

  accountRequest = { version, promise }
  return promise
}
