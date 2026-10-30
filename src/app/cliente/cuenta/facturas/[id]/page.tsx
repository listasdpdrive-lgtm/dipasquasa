"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  descargarFacturaPdf,
  generarQrFactura,
  getFacturaArcaInfo,
  imprimirFactura,
  type FacturaImprimible,
} from "@/lib/cliente/factura-pdf"
import {
  ClientAccountLoadError,
  loadClientAccountData,
} from "@/lib/cliente/cuenta-cache"
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Package,
  Printer,
} from "lucide-react"

type ReceiptRecord = Record<string, unknown>

type Receipt = {
  id: string
  fields: Record<string, string>
  account?: Record<string, string>
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

function decodeReceiptId(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
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
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(date)
}

function formatLabel(field: string) {
  return field
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase())
}

function ReceiptDetails({ receipt }: { receipt: Receipt }) {
  const [actionError, setActionError] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [qrImage, setQrImage] = useState("")
  const meta = receipt.fields.__meta
    ? parseRecord(receipt.fields.__meta)
    : null
  const items = Object.entries(receipt.fields).flatMap(([key, value]) => {
    if (key === "__meta") return []
    const item = parseRecord(value)
    if (!item || (!item.descripcion && !item.codigo)) return []
    return [{ key, item }]
  })
  const otherFields = Object.entries(receipt.fields).filter(([key, value]) => {
    if (key === "__meta" || parseRecord(value)) return false
    return true
  })
  const number = getText(meta, "remito") || receipt.id
  const date = getText(meta, "fecha")
  const type = getText(meta, "tipo")
  const total = getText(meta, "total")
  const paid = getText(meta, "pagado")
  const balance = getText(meta, "saldo")
  const factura: FacturaImprimible = receipt
  const arcaInfo = getFacturaArcaInfo(factura)

  useEffect(() => {
    let isActive = true
    void generarQrFactura(factura)
      .then((image) => {
        if (isActive) setQrImage(image)
      })
      .catch((error: unknown) => {
        if (isActive) {
          setActionError(
            error instanceof Error
              ? error.message
              : "No se pudo preparar el código QR de la factura."
          )
        }
      })
    return () => {
      isActive = false
    }
  }, [receipt])

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
    <main className="light-theme min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/cliente/cuenta"
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Volver a mi cuenta
        </Link>

        <div className="mb-4 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => void printFactura()}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Printer size={16} aria-hidden="true" />
            Imprimir
          </button>
          <button
            type="button"
            onClick={downloadFactura}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Download size={16} aria-hidden="true" />
            {isDownloading ? "Preparando..." : "Descargar PDF"}
          </button>
        </div>
        {actionError && (
          <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {actionError}
          </p>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white px-5 py-6 sm:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
                <FileText size={23} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {type || "Factura"}
                </p>
                <h1 className="text-2xl font-bold text-slate-900">
                  Factura {number}
                </h1>
                {date && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <CalendarDays size={15} aria-hidden="true" />
                    {formatDate(date)}
                  </p>
                )}
              </div>
            </div>
            {total && (
              <div className="sm:text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {formatAmount(total)}
                </p>
              </div>
            )}
          </header>

          {(paid || balance) && (
            <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50">
              {paid && (
                <div className="px-5 py-4 sm:px-8">
                  <p className="text-xs text-slate-500">Pagado</p>
                  <p className="mt-1 font-semibold text-emerald-700">
                    {formatAmount(paid)}
                  </p>
                </div>
              )}
              {balance && (
                <div className="px-5 py-4 sm:px-8">
                  <p className="text-xs text-slate-500">Saldo pendiente</p>
                  <p className="mt-1 font-semibold text-amber-700">
                    {formatAmount(balance)}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-8 border-t border-slate-100 p-5 sm:p-8">
            {(arcaInfo.cae || arcaInfo.hasQr) && (
              <section className="rounded-xl border border-slate-200 p-5">
                <h2 className="text-lg font-semibold">Autorización ARCA</h2>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    {arcaInfo.cae && (
                      <div>
                        <dt className="text-slate-500">CAE</dt>
                        <dd className="mt-1 break-all font-semibold text-slate-900">
                          {arcaInfo.cae}
                        </dd>
                      </div>
                    )}
                    {arcaInfo.caeExpiration && (
                      <div>
                        <dt className="text-slate-500">Vencimiento del CAE</dt>
                        <dd className="mt-1 font-semibold text-slate-900">
                          {formatDate(arcaInfo.caeExpiration)}
                        </dd>
                      </div>
                    )}
                    {arcaInfo.ambiente && (
                      <div>
                        <dt className="text-slate-500">Ambiente</dt>
                        <dd className="mt-1 font-semibold capitalize text-slate-900">
                          {arcaInfo.ambiente}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {qrImage && (
                    <img
                      src={qrImage}
                      alt="Código QR de validación ARCA"
                      className="h-28 w-28"
                    />
                  )}
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Package size={19} className="text-slate-400" aria-hidden="true" />
                Artículos ({items.length})
              </h2>
              {items.length ? (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Artículo</th>
                        <th className="px-4 py-3 font-semibold">Código</th>
                        <th className="px-4 py-3 text-right font-semibold">
                          Cantidad
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                          Costo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map(({ key, item }) => (
                        <tr key={key}>
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {getText(item, "descripcion") || "Artículo"}
                            {getText(item, "proveedor") && (
                              <span className="mt-1 block text-xs font-normal text-slate-500">
                                Proveedor: {getText(item, "proveedor")}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {getText(item, "codigo") || "—"}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                            {getText(item, "cantidad") || "—"}
                          </td>
                          <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-800">
                            {formatAmount(getText(item, "costo"))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  No hay artículos detallados en esta factura.
                </p>
              )}
            </section>

            {otherFields.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold">
                  Información adicional
                </h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                  {otherFields.map(([field, value]) => (
                    <div key={field} className="min-w-0">
                      <dt className="text-xs font-medium text-slate-500">
                        {formatLabel(field)}
                      </dt>
                      <dd className="mt-1 break-words text-sm text-slate-800">
                        {value || "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ReceiptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    async function loadReceipt() {
      try {
        const result = await loadClientAccountData()
        const requestedId = decodeReceiptId(Array.isArray(id) ? id[0] : id)
        const match = result.remitos.find(
          (item) =>
            item.id === requestedId ||
            decodeReceiptId(item.id) === requestedId
        )
        if (isActive) {
          if (match) {
            setReceipt({
              ...match,
              account: result.account,
            })
          } else {
            setError("No se encontró la factura solicitada.")
          }
        }
      } catch (loadError) {
        if (
          loadError instanceof ClientAccountLoadError &&
          loadError.status === 401
        ) {
          router.replace("/cliente")
          return
        }
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No se pudo conectar. Intentá nuevamente."
          )
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadReceipt()
    return () => {
      isActive = false
    }
  }, [id, router])

  if (isLoading) {
    return (
      <main className="light-theme min-h-screen bg-slate-50 p-8 text-slate-500">
        <div role="status" className="mx-auto max-w-5xl">
          Cargando factura...
        </div>
      </main>
    )
  }

  if (error || !receipt) {
    return (
      <main className="light-theme min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/cliente/cuenta"
            className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Volver a mi cuenta
          </Link>
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error || "No se encontró la factura solicitada."}
          </p>
        </div>
      </main>
    )
  }

  return <ReceiptDetails receipt={receipt} />
}
