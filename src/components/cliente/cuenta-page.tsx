"use client"

import { Headercuentas } from "@/components/headercuentas"
import {
  clearClientAccountCache,
  ClientAccountLoadError,
  getCachedClientAccountData,
  loadClientAccountData,
} from "@/lib/cliente/cuenta-cache"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  descargarFacturaPdf,
  imprimirFactura,
  type FacturaImprimible,
} from "@/lib/cliente/factura-pdf"
import {
  Building2,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  CircleDollarSign,
  BellRing,
  Download,
  Mail,
  FileText,
  LayoutDashboard,
  Package,
  Phone,
  Printer,
  ReceiptText,
  Search,
  X,
} from "lucide-react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type ReceiptRecord = Record<string, unknown>

const FIELD_LABELS: Record<string, string> = {
  razonSocial: "Razón social",
  nombre: "Nombre",
  domicilio: "Domicilio",
  limiteCredito: "Límite de crédito",
  username: "Usuario",
  usuario: "Usuario",
  cuit: "CUIT",
  saldoFavor: "Saldo a favor",
  ultimaFechaRemito: "Última fecha de remito",
}

type Section = "resumen" | "datos" | "remitos" | "ayuda"

const NAV_ITEMS: {
  id: Section
  label: string
  icon: typeof LayoutDashboard
}[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "datos", label: "Datos de la cuenta", icon: Building2 },
  { id: "remitos", label: "Facturas", icon: ReceiptText },
  { id: "ayuda", label: "Ayuda y contacto", icon: CircleHelp },
]

function formatLabel(field: string) {
  const normalizedField = normalizeField(field)
  const label = Object.entries(FIELD_LABELS).find(
    ([key]) => normalizeField(key) === normalizedField
  )?.[1]

  return (
    label ||
    field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/^./, (letter) => letter.toUpperCase())
  )
}

function normalizeField(field: string) {
  return field
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
}

function decodeApplicationServerKey(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=")
  const binary = window.atob(padded.replace(/-/g, "+").replace(/_/g, "/"))
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function DataFields({ fields }: { fields: Record<string, string> }) {
  const entries = Object.entries(fields).filter(
    ([field]) => field.toLowerCase() !== "password"
  )

  if (!entries.length) {
    return <p className="text-sm text-gray-500">No hay datos para mostrar.</p>
  }

  return (
    <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {entries.map(([field, value]) => (
        <div
          key={field}
          className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
        >
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {formatLabel(field)}
          </dt>
          <dd className="mt-2 break-words text-base font-semibold leading-6 text-slate-900">
            {formatAccountValue(field, value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function parseRecord(value: string): ReceiptRecord | null {
  try {
    const parsed: unknown = JSON.parse(value)
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as ReceiptRecord
    }
  } catch {
    return null
  }
  return null
}

function getReceiptDetails(fields: Record<string, string>) {
  const meta = fields.__meta ? parseRecord(fields.__meta) : null
  const items = Object.entries(fields).flatMap(([key, value]) => {
    if (key === "__meta") return []
    const item = parseRecord(value)
    if (!item || (!item.descripcion && !item.codigo)) return []
    return [{ key, item }]
  })

  return { meta, items }
}

function getText(record: ReceiptRecord | null, ...keys: string[]) {
  for (const key of keys) {
    const value = record?.[key]
    if (typeof value === "string" || typeof value === "number") {
      return String(value)
    }
  }
  return ""
}

function formatAmount(value: string) {
  const amount = Number(value)
  if (!value || !Number.isFinite(amount)) return value || "—"
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(amount)
}

function parseAccountAmount(value: string | undefined) {
  if (!value) return null
  const normalized = value.trim().replace(/[^\d,.-]/g, "")
  if (!normalized) return null
  const decimalNormalized = normalized.includes(",")
    ? normalized.replace(/\./g, "").replace(",", ".")
    : normalized
  const amount = Number(decimalNormalized)
  return Number.isFinite(amount) ? amount : null
}

function getReceiptTotal(fields: Record<string, string>) {
  const { meta, items } = getReceiptDetails(fields)
  const total = parseAccountAmount(getText(meta, "total"))
  if (total !== null) return total
  if (!items.length) return null

  let sum = 0
  for (const { item } of items) {
    const cost = parseAccountAmount(getText(item, "costo", "cost", "precio"))
    const quantity = parseAccountAmount(getText(item, "cantidad", "quantity"))
    if (cost === null || quantity === null) return null
    sum += cost * quantity
  }
  return sum
}

function getPendingBalance(
  remitos: { id: string; fields: Record<string, string> }[],
  paidRemitos: string[]
) {
  const paid = new Set(paidRemitos)
  const pending = remitos.filter(({ id }) => !paid.has(id))
  if (!pending.length) return { amount: 0, count: 0, complete: true }

  let amount = 0
  let complete = true
  for (const remito of pending) {
    const total = getReceiptTotal(remito.fields)
    if (total === null) complete = false
    else amount += total
  }
  return { amount, count: pending.length, complete }
}

function parseJsonArray(value: string | undefined) {
  if (!value) return []
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getCollectionTotal(fields: Record<string, string>) {
  const directTotal = parseAccountAmount(
    fields.total || fields.monto || fields.importe
  )
  if (directTotal !== null) return directTotal

  const paymentMethods = parseJsonArray(fields.mediosPago)
  const retentions = parseJsonArray(fields.retenciones)
  if (!paymentMethods.length && !retentions.length) return null

  let total = 0
  for (const entry of [...paymentMethods, ...retentions]) {
    if (typeof entry !== "object" || entry === null) return null
    const amount = parseAccountAmount(
      "monto" in entry && (typeof entry.monto === "string" || typeof entry.monto === "number")
        ? String(entry.monto)
        : undefined
    )
    if (amount === null) return null
    total += amount
  }
  return total
}

function getCollectionMonthKey(id: string, fields: Record<string, string>) {
  const dateValue = fields.fecha || fields.fechaEmision || fields.createdAt || ""
  const isoDate = dateValue.match(/^(\d{4})-(\d{2})/)
  if (isoDate) return `${isoDate[1]}-${isoDate[2]}`

  const dayFirstDate = dateValue.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
  if (dayFirstDate) return `${dayFirstDate[3]}-${dayFirstDate[2].padStart(2, "0")}`

  const dateInId = id.match(/(?:^|[-_])(\d{4})(\d{2})(\d{2})(?:[-_]|$)/)
  return dateInId ? `${dateInId[1]}-${dateInId[2]}` : null
}

function getMonthlyReceiptTotals(
  remitos: { id: string; fields: Record<string, string> }[],
  recibos: { id: string; fields: Record<string, string> }[],
  now = new Date()
) {
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + index, 1)
    return {
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      month: new Intl.DateTimeFormat("es-AR", {
        month: "short",
        year: "2-digit",
      }).format(date),
      remitos: 0,
      recibos: 0,
    }
  })
  const monthByKey = new Map(months.map((month) => [month.key, month]))

  for (const remito of remitos) {
    const { meta } = getReceiptDetails(remito.fields)
    const monthKey = getCollectionMonthKey(remito.id, {
      fecha: getText(meta, "fecha"),
    })
    const month = monthKey ? monthByKey.get(monthKey) : undefined
    const amount = getReceiptTotal(remito.fields)
    if (month && amount !== null) month.remitos += amount
  }

  for (const recibo of recibos) {
    const monthKey = getCollectionMonthKey(recibo.id, recibo.fields)
    const month = monthKey ? monthByKey.get(monthKey) : undefined
    const amount = getCollectionTotal(recibo.fields)
    if (month && amount !== null) month.recibos += amount
  }

  return months
}

function formatDate(value: string) {
  const dayFirstDate = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
  const date = dayFirstDate
    ? new Date(
        Number(dayFirstDate[3]),
        Number(dayFirstDate[2]) - 1,
        Number(dayFirstDate[1])
      )
    : new Date(value)

  if (
    dayFirstDate &&
    (date.getDate() !== Number(dayFirstDate[1]) ||
      date.getMonth() !== Number(dayFirstDate[2]) - 1 ||
      date.getFullYear() !== Number(dayFirstDate[3]))
  ) {
    return value
  }
  if (!value || Number.isNaN(date.getTime())) return value || "—"
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
  }).format(date)
}

function formatAccountValue(field: string, value: string) {
  if (!value) return "—"

  const normalizedField = normalizeField(field)
  if (normalizedField === "cuit") {
    return value.replace(/^(\d{2})-?(\d{8})-?(\d)$/, "$1-$2-$3")
  }
  if (normalizedField.includes("fecha") || normalizedField.includes("date")) {
    return formatDate(value)
  }
  if (
    normalizedField.includes("limitecredito") ||
    normalizedField.includes("saldofavor")
  ) {
    return formatAmount(value)
  }

  return value
}

function ReceiptCard({
  id,
  fields,
  account,
  isPaid,
}: {
  id: string
  fields: Record<string, string>
  account: Record<string, string>
  isPaid: boolean
}) {
  const [actionError, setActionError] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const { meta, items } = getReceiptDetails(fields)
  const receiptNumber = getText(meta, "remito") || id
  const receiptType = getText(meta, "tipo")
  const receiptDate = getText(meta, "fecha")
  const total = getText(meta, "total") || String(getReceiptTotal(fields) ?? "")
  const factura: FacturaImprimible = { id, fields, account }

  const downloadFactura = async () => {
    setActionError("")
    setIsDownloading(true)
    try {
      await descargarFacturaPdf(factura)
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "No se pudo descargar la factura."
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const printFactura = async () => {
    setActionError("")
    try {
      await imprimirFactura(factura)
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "No se pudo imprimir la factura."
      )
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col items-stretch gap-3 bg-gradient-to-r from-slate-50 to-white p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
            <FileText size={21} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="break-words font-semibold text-slate-900 sm:truncate">
              Factura {receiptNumber}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              {receiptDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={13} aria-hidden="true" />
                  {formatDate(receiptDate)}
                </span>
              )}
              {receiptType && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 capitalize text-slate-600">
                  {receiptType}
                </span>
              )}
              <span className={`rounded-full px-2 py-0.5 font-medium ${isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {isPaid ? "Pagado" : "Saldo pendiente"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
                <Package size={12} aria-hidden="true" />
                {items.length} {items.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>
          </div>
        </div>
        {total && (
          <div className="flex items-center justify-between gap-3 border-t border-slate-200/70 pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total
            </p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">
              {formatAmount(total)}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-3">
        <p className="break-words text-xs text-slate-500">
          {receiptType ? `Documento: ${receiptType}` : "Documento de cuenta"}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => void printFactura()}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:min-h-0 sm:w-auto sm:px-3"
          >
            <Printer size={16} aria-hidden="true" />
            Imprimir
          </button>
          <button
            type="button"
            onClick={downloadFactura}
            disabled={isDownloading}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:min-h-0 sm:w-auto sm:px-3"
          >
            <Download size={16} aria-hidden="true" />
            {isDownloading ? "Preparando..." : "Descargar PDF"}
          </button>
        </div>
      </div>
      {actionError && (
        <p role="alert" className="border-t border-red-100 px-5 py-2 text-sm text-red-700 sm:px-6">
          {actionError}
        </p>
      )}
    </article>
  )
}

export default function CuentaClientePage({
  section = "resumen",
}: {
  section?: Section
}) {
  const [data, setData] = useState(getCachedClientAccountData)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(() => !getCachedClientAccountData())
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unsupported">("default")
  const [isPushSubscribed, setIsPushSubscribed] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const loadAccount = useCallback(async () => {
    try {
      const result = await loadClientAccountData()
      setData(result)
    } catch (loadError) {
      if (
        loadError instanceof ClientAccountLoadError &&
        loadError.status === 401
      ) {
        clearClientAccountCache()
        router.replace("/cliente")
        return
      }
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudo conectar. Intentá nuevamente."
      )
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    void loadAccount()
  }, [loadAccount])

  const logout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch("/api/cliente/logout", { method: "POST" })
      if (!response.ok) {
        const result = await response.json()
        setError(result.error || "No se pudo cerrar la sesión.")
        setIsLoggingOut(false)
        return
      }
      clearClientAccountCache()
      router.replace("/cliente")
    } catch {
      setError("No se pudo cerrar la sesión. Intentá nuevamente.")
      setIsLoggingOut(false)
    }
  }

  const filteredRemitos = useMemo(() => {
    if (!data) return []
    const query = searchTerm.trim().toLowerCase()
    if (!query) return data.remitos

    return data.remitos.filter(({ id, fields }) =>
      `${id} ${Object.values(fields).join(" ")}`.toLowerCase().includes(query)
    )
  }, [data, searchTerm])

  const accountName =
    data?.account.razonSocial || data?.account.nombre || "Cliente"
  const accountBalance = data
    ? getPendingBalance(data.remitos, data.paidRemitos)
    : null
  const accountLimit = data
    ? (Object.entries(data.account as Record<string, string>).find(
        ([field, value]) =>
          normalizeField(field) === "limitecredito" &&
          typeof value === "string" &&
          value.trim() !== ""
      )?.[1] as string | undefined)
    : undefined
  const numericAccountLimit = parseAccountAmount(accountLimit)
  const limitUsage =
    accountBalance?.complete &&
    numericAccountLimit !== null &&
    numericAccountLimit !== undefined &&
    numericAccountLimit > 0
      ? accountBalance.amount / numericAccountLimit
      : null
  const limitStatus = limitUsage === null || limitUsage < 0.8
    ? null
    : limitUsage >= 1 ? "exceeded" : "near"

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationPermission("unsupported")
      return
    }
    setNotificationPermission(Notification.permission)
  }, [])

  useEffect(() => {
    if (notificationPermission !== "granted" || !("serviceWorker" in navigator)) return
    void navigator.serviceWorker.ready
      .then(async (registration) => setIsPushSubscribed(Boolean(await registration.pushManager.getSubscription())))
      .catch(() => setIsPushSubscribed(false))
  }, [notificationPermission])

  useEffect(() => {
    if (!data || limitStatus) return
    const accountId = data.account.cuit || data.account.username || accountName
    try {
      window.localStorage.removeItem(`cuenta-limit-notification:${accountId}`)
    } catch {
      // El almacenamiento puede estar deshabilitado en algunos navegadores.
    }
  }, [accountName, data, limitStatus])

  useEffect(() => {
    if (!data || !limitStatus || notificationPermission !== "granted") return

    const accountId = data.account.cuit || data.account.username || accountName
    const storageKey = `cuenta-limit-notification:${accountId}`
    try {
      if (window.localStorage.getItem(storageKey) === limitStatus) return
      window.localStorage.setItem(storageKey, limitStatus)
    } catch {
      // Si el almacenamiento está bloqueado, se prioriza mostrar el aviso.
    }

    const title = limitStatus === "exceeded"
      ? "Superaste el límite de tu cuenta"
      : "Estás cerca del límite de tu cuenta"
    const body = `Tu saldo pendiente representa ${new Intl.NumberFormat("es-AR", { style: "percent", maximumFractionDigits: 0 }).format(limitUsage ?? 0)} del límite de crédito.`
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.ready
        .then((registration) => registration.showNotification(title, {
          body,
          icon: "/logoC.png",
          badge: "/logoC.png",
          data: { url: "/cliente/cuenta" },
        }))
        .catch(() => new Notification(title, { body, icon: "/logoC.png" }))
    } else {
      new Notification(title, { body, icon: "/logoC.png" })
    }
  }, [accountName, data, limitStatus, limitUsage, notificationPermission])

  const enableNotifications = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      setNotificationPermission("unsupported")
      return false
    }
    const permission = await Notification.requestPermission()
    setNotificationPermission(permission)
    if (permission !== "granted") return false
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setNotificationMessage("Este navegador no admite notificaciones push en segundo plano.")
      return false
    }
    try {
      const keyResponse = await fetch("/api/cliente/notificaciones")
      const keyData = await keyResponse.json()
      if (!keyResponse.ok) throw new Error(keyData.error || "No se pudo iniciar la suscripcion push.")
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription() || await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeApplicationServerKey(keyData.publicKey),
      })
      const saveResponse = await fetch("/api/cliente/notificaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      })
      const saveData = await saveResponse.json()
      if (!saveResponse.ok) throw new Error(saveData.error || "No se pudo registrar este dispositivo.")
      setIsPushSubscribed(true)
      setNotificationMessage("Este dispositivo quedo suscrito para recibir avisos push.")
      return true
    } catch (subscribeError) {
      setNotificationMessage(subscribeError instanceof Error ? subscribeError.message : "No se pudo activar el push.")
      return false
    }
  }

  const sendTestNotification = async () => {
    let permission = notificationPermission
    if (permission !== "granted") {
      permission = await Notification.requestPermission()
      setNotificationPermission(permission)
    }
    if (permission !== "granted") return

    const title = "Notificación de prueba"
    const body = "Las notificaciones de tu cuenta están funcionando en este dispositivo."
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        body,
        icon: "/logoC.png",
        badge: "/logoC.png",
      })
    } else {
      new Notification(title, { body, icon: "/logoC.png" })
    }
  }
  const sendPushTest = async (
    closedWebTest = false,
    delaySeconds = 0,
    limitStatus: "near" | "exceeded" | null = null
  ) => {
    if (notificationPermission !== "granted" || !isPushSubscribed) {
      if (!(await enableNotifications())) return
    }
    setNotificationMessage(closedWebTest && delaySeconds > 0
      ? `El push se enviara en ${delaySeconds} segundos. Cierra esta pestana ahora.`
      : "")
    try {
      const response = await fetch("/api/cliente/notificaciones/prueba", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ closedWebTest, delaySeconds, limitStatus }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "No se pudo enviar la prueba push.")
      setNotificationMessage(limitStatus
        ? "Alerta simulada enviada. No se modifico el saldo real de la cuenta."
        : closedWebTest
          ? "El servidor envio el push de prueba."
        : "Push de prueba enviado al servidor para este dispositivo.")
    } catch (testError) {
      setNotificationMessage(testError instanceof Error ? testError.message : "No se pudo enviar la prueba push.")
    }
  }

  const monthlyReceiptTotals = data
    ? getMonthlyReceiptTotals(data.remitos, data.recibos)
    : []
  

  const selectSection = (nextSection: Section) => {
    const paths: Record<Section, string> = {
      resumen: "/cliente/cuenta",
      datos: "/cliente/cuenta/datos",
      remitos: "/cliente/cuenta/facturas",
      ayuda: "/cliente/cuenta/ayuda",
    }
    router.push(paths[nextSection])
  }

  return (
    <main className="light-theme min-h-screen bg-slate-50 text-slate-900">
      <Headercuentas
        items={NAV_ITEMS.map(({ id, label }) => ({ id, label }))}
        activeSection={section}
        accountName={accountName}
        onSelectSection={(nextSection) => {
          if (
            nextSection === "resumen" ||
            nextSection === "datos" ||
            nextSection === "remitos" ||
            nextSection === "ayuda"
          ) {
            selectSection(nextSection)
          }
        }}
        onLogout={logout}
        isLoggingOut={isLoggingOut}
      />

      <div className="flex min-h-screen pt-24">
        

        <div className="min-w-0 flex-1">
          

          <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
            {error && (
              <div
                role="alert"
                className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setError("")}
                  aria-label="Cerrar aviso"
                  className="rounded p-0.5 hover:bg-red-100"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {isLoading ? (
              <div
                role="status"
                className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm"
              >
                Cargando información de la cuenta...
              </div>
            ) : data ? (
              <>

                {section === "resumen" && (
                  <>
                    

                    <section
                      aria-label="Resumen de cuenta"
                      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    >
                      <button
                        type="button"
                        onClick={() => selectSection("datos")}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <Building2 size={21} aria-hidden="true" />
                          </span>
                          <ChevronRight
                            size={18}
                            className="text-slate-400 transition group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-5 text-sm font-medium text-slate-500">
                          Datos de la cuenta
                        </p>
                        <p className="mt-1 truncate text-lg font-semibold text-slate-900">
                          {data.account.razonSocial ||
                            data.account.nombre ||
                            "Ver información"}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => selectSection("remitos")}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700">
                            <FileText size={21} aria-hidden="true" />
                          </span>
                          <ChevronRight
                            size={18}
                            className="text-slate-400 transition group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-5 text-sm font-medium text-slate-500">
                          Facturas registradas
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-slate-900">
                          {data.remitos.length}
                        </p>
                      </button>
                      
                    </section>

                    <section
                      aria-label="Estado de cuenta"
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accountBalance && accountBalance.count > 0 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                          <CircleDollarSign size={21} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-500">Estado de cuenta</p>
                          {accountBalance ? (
                            <>
                              <p className="mt-1 text-lg font-semibold text-slate-900">
                                {accountBalance.count === 0 ? "Al día" : `${accountBalance.count} ${accountBalance.count === 1 ? "remito pendiente" : "remitos pendientes"}`}
                              </p>
                              {accountBalance.count > 0 && (
                                <p className="mt-1 text-sm text-slate-600">
                                  Saldo pendiente: <span className="font-semibold">{accountBalance.complete ? formatAmount(String(accountBalance.amount)) : `al menos ${formatAmount(String(accountBalance.amount))}; faltan costos en algunos remitos`}</span>
                                </p>
                              )}
                              {accountLimit !== undefined && (
                                <p className="mt-1 text-sm text-slate-600">
                                  Límite de la cuenta: <span className="font-semibold">{formatAccountValue("limiteCredito", accountLimit)}</span>
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="mt-1 text-sm text-slate-600">
                              El saldo todavía no está disponible. Contactanos para consultarlo.
                            </p>
                          )}
                        </div>
                      </div>
                    </section>

                    {limitUsage !== null && limitUsage >= 0.8 && (
                      <aside
                        role="status"
                        className={`flex items-start gap-3 rounded-2xl border p-4 ${limitUsage >= 1 ? "border-red-200 bg-red-50 text-red-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}
                      >
                        <BellRing size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-semibold">
                            {limitUsage >= 1
                              ? "Alcanzaste o superaste el límite de tu cuenta"
                              : "Estás cerca del límite de tu cuenta"}
                          </p>
                          <p className="mt-1 text-sm">
                            Tu saldo pendiente representa {new Intl.NumberFormat("es-AR", { style: "percent", maximumFractionDigits: 0 }).format(limitUsage)} del límite de crédito.
                            {limitUsage >= 1
                              ? " Contactanos para revisar tu cuenta."
                              : " Te avisamos para que puedas anticiparte."}
                          </p>
                        </div>
                      </aside>
                    )}

                    {notificationPermission !== "unsupported" && (
                      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">Avisos de límite en este dispositivo</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {notificationPermission === "granted"
                              ? "Recibirás un aviso al abrir tu cuenta si el saldo está cerca o supera el límite."
                              : "Activa las notificaciones para recibir un aviso al consultar tu cuenta."}
                          </p>
                        </div>
                        {notificationMessage && <p role="status" className="mt-1 text-sm font-medium text-slate-700">{notificationMessage}</p>}
                        <div className="flex flex-wrap gap-2">
                          {(notificationPermission !== "granted" || !isPushSubscribed) && (
                            <button
                              type="button"
                              onClick={() => void enableNotifications()}
                              disabled={notificationPermission === "denied"}
                              className="shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {notificationPermission === "denied" ? "Permiso bloqueado en el navegador" : "Activar notificaciones"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => void sendPushTest(true, 15)}
                            disabled={notificationPermission === "denied"}
                            className="shrink-0 rounded-xl border border-blue-300 px-4 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Probar con la web cerrada
                          </button>
                          <button
                            type="button"
                            onClick={() => void sendPushTest(true, 15, "exceeded")}
                            disabled={notificationPermission === "denied"}
                            className="shrink-0 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Simular aviso de límite superado
                          </button>
                          <button
                            type="button"
                            onClick={() => void sendPushTest()}
                            disabled={notificationPermission === "denied"}
                            className="shrink-0 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Enviar notificación de prueba
                          </button>
                        </div>
                      </section>
                    )}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                      <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900">Salidas por mes</h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Remitos emitidos y recibos cobrados por mes durante los últimos 12 meses.
                        </p>
                      </div>
                      {data.remitos.length === 0 && data.recibos.length === 0 ? (
                        <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                          Todavía no hay remitos ni recibos para graficar.
                        </p>
                      ) : (
                        <div className="h-72 w-full" role="img" aria-label="Gráfica de importes de remitos por mes">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyReceiptTotals} margin={{ top: 8, right: 16, left: 8, bottom: 4 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="month" tickLine={false} axisLine={false} />
                              <YAxis
                                width={82}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => formatAmount(String(value))}
                              />
                              <Tooltip
                                formatter={(value, name) => [formatAmount(String(value ?? 0)), name]}
                                labelFormatter={(label, payload) => payload?.[0]?.payload?.key || label}
                              />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="remitos"
                                name="Remitos emitidos"
                                stroke="#dc2626"
                                strokeWidth={3}
                                dot={{ r: 3, fill: "#dc2626" }}
                                activeDot={{ r: 6 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="recibos"
                                name="Recibos cobrados"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{ r: 3, fill: "#2563eb" }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </section>

                   
                  </>
                )}

                {section === "datos" && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Building2 size={22} aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Datos de la cuenta
                    </h2>
                    <p className="mb-4 mt-1 text-sm text-slate-500">
                      Información registrada para tu cuenta.
                    </p>
                    <DataFields fields={data.account} />
                  </section>
                )}

                {section === "ayuda" && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <CircleHelp size={22} aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">Ayuda y contacto</h2>
                    <p className="mb-6 mt-1 text-sm text-slate-500">
                      Comunicate con nuestro equipo si necesitás ayuda con tu cuenta o tus facturas.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <a href="https://wa.me/5492614663077" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-green-300 hover:bg-green-50">
                        <Phone size={20} className="text-green-700" aria-hidden="true" />
                        <span><span className="block text-sm font-semibold text-slate-900">WhatsApp</span><span className="text-sm text-slate-500">+54 9 261 466-3077</span></span>
                      </a>
                      <a href="mailto:dipasquarepuestos@gmail.com" className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50">
                        <Mail size={20} className="text-blue-700" aria-hidden="true" />
                        <span><span className="block text-sm font-semibold text-slate-900">Correo electrónico</span><span className="text-sm text-slate-500">dipasquarepuestos@gmail.com</span></span>
                      </a>
                    </div>
                    <p className="mt-6 text-sm text-slate-500">Atención: lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 13:00.</p>
                  </section>
                )}

                {section === "remitos" && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                      <div>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700">
                          <ReceiptText size={22} aria-hidden="true" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          Facturas
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          {data.remitos.length}{" "}
                          {data.remitos.length === 1
                            ? "remito asociado"
                            : "remitos asociados"}{" "}
                          a tu cuenta.
                        </p>
                      </div>
                      {data.remitos.length > 0 && (
                        <label className="relative block sm:w-72">
                          <Search
                            size={17}
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) =>
                              setSearchTerm(event.target.value)
                            }
                            placeholder="Buscar Comprobantes..."
                            aria-label="Buscar Comprobantes"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50"
                          />
                        </label>
                      )}
                    </div>

                    {data.remitos.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                        <ReceiptText
                          size={28}
                          aria-hidden="true"
                          className="mx-auto text-slate-400"
                        />
                        <p className="mt-3 font-medium text-slate-700">
                          Todavía no hay facturas
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Cuando haya facturas asociadas a tu cuenta, aparecerán
                          en esta sección.
                        </p>
                      </div>
                    ) : filteredRemitos.length === 0 ? (
                      <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                        No se encontraron facturas con esa búsqueda.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {filteredRemitos.map((remito) => (
                          <ReceiptCard
                            key={remito.id}
                            id={remito.id}
                            fields={remito.fields}
                            account={data.account}
                            isPaid={data.paidRemitos.includes(remito.id)}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
      
    </main>
  )
}
