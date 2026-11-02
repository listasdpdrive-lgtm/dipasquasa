import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import QRCode from "qrcode"

export type FacturaItem = Record<string, unknown>

export type FacturaImprimible = {
  id: string
  fields: Record<string, string>
  account?: Record<string, string>
}

type ArcaRecord = Record<string, unknown>

type ReceiptData = {
  number: string
  type: string
  date: string
  total: string
  netAmount: number
  ivaAmount: number
  paid: string
  balance: string
  clientName: string
  clientCuit: string
  clientAddress: string
  saleCondition: string
  items: FacturaItem[]
  arca: ArcaRecord | null
  arcaClient: ArcaRecord | null
  arcaAmounts: ArcaRecord | null
  caeData: ArcaRecord | null
  cae: string
  caeExpiration: string
  qr: ArcaRecord | null
  qrPayload: string
  cbteTipo: number
  ptoVta: number
  cbteNro: number
}

function asRecord(value: unknown): ArcaRecord | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as ArcaRecord
  }
  return null
}

function parseRecord(value: string | undefined): ArcaRecord | null {
  if (!value) return null
  try {
    const parsed: unknown = JSON.parse(value)
    return asRecord(parsed)
  } catch {
    return null
  }
}

function getText(record: ArcaRecord | null, ...keys: string[]) {
  for (const key of keys) {
    const value = record?.[key]
    if (typeof value === "string" || typeof value === "number") {
      return String(value)
    }
  }
  return ""
}

function getNumber(record: ArcaRecord | null, ...keys: string[]) {
  const value = getText(record, ...keys)
  const number = Number(value)
  return value && Number.isFinite(number) ? number : 0
}

function parseNumericValue(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return 0
  if (typeof value === "number") return Number.isFinite(value) ? value : 0
  const normalized = value.trim().replace(/\.(?=.*[,])/g, "").replace(",", ".")
  const number = Number(normalized)
  return normalized && Number.isFinite(number) ? number : 0
}

function getOptionalNumber(record: ArcaRecord | null, ...keys: string[]) {
  for (const key of keys) {
    const value = record?.[key]
    if (typeof value !== "string" && typeof value !== "number") continue
    const number = parseNumericValue(value)
    if (String(value).trim() && Number.isFinite(number)) return number
  }
  return null
}

function calculateItemAmounts(items: FacturaItem[]) {
  return items.reduce<{ net: number; iva: number }>(
    (amounts, item) => {
      const quantity = parseNumericValue(item.cantidad)
      const price = parseNumericValue(item.precioUnitario ?? item.costo)
      const discount = parseNumericValue(item.bonificacion ?? item.bonif ?? item.descuento)
      const net = quantity * price * (1 - discount / 100)
      const taxCondition = String(item.condicionIvaItem ?? "").toLowerCase()
      const taxable = !taxCondition || taxCondition === "gravado"
      const rawRate = String(item.alicuotaIva ?? item.iva ?? "21").replace("%", "").trim()
      const rate = Number(rawRate.replace(",", "."))
      return {
        net: amounts.net + net,
        iva: amounts.iva + (taxable && Number.isFinite(rate) ? net * (rate / 100) : 0),
      }
    },
    { net: 0, iva: 0 }
  )
}

function getQrPayload(value: unknown) {
  if (typeof value === "string") return value
  const record = asRecord(value)
  return getText(record, "url", "payload", "qrData", "data")
}

function getQrImage(value: unknown) {
  const record = asRecord(value)
  const image = getText(record, "imageDataUrl", "dataUrl", "image", "imagen")
  return image.startsWith("data:image/") ? image : ""
}

function normalizeArcaDate(value: string) {
  const compactDate = value.match(/^(\d{4})(\d{2})(\d{2})$/)
  if (compactDate) return `${compactDate[1]}-${compactDate[2]}-${compactDate[3]}`
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10)
}

function buildArcaQrPayload(data: Omit<ReceiptData, "qrPayload">) {
  const date = normalizeArcaDate(data.date)
  if (!date || !data.cae) return ""

  const qrData = {
    ver: 1,
    fecha: date,
    cuit: 20207487490,
    ptoVta: data.ptoVta,
    tipoCmp: data.cbteTipo,
    nroCmp: data.cbteNro,
    importe: getNumber(data.arcaAmounts, "total") || Number(data.total || 0),
    moneda: "PES",
    ctz: 1,
    tipoDocRec: getNumber(data.arcaClient, "docTipo") || 99,
    nroDocRec: getNumber(data.arcaClient, "docNro"),
    tipoCodAut: "E",
    codAut: Number(data.cae),
  }
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(qrData))))
  return `https://www.arca.gob.ar/fe/qr/?p=${encoded}`
}

function getReceiptData(factura: FacturaImprimible): ReceiptData {
  const meta = parseRecord(factura.fields.__meta)
  const arca = asRecord(meta?.arca)
  const arcaClient = asRecord(arca?.cliente)
  const arcaAmounts = asRecord(arca?.importes) ?? asRecord(meta?.importes)
  const caeData = asRecord(arca?.cae) ?? asRecord(meta?.cae)
  const qr = asRecord(arca?.qr) ?? asRecord(meta?.qr)
  const items = Object.entries(factura.fields).flatMap(([key, value]) => {
    if (key === "__meta") return []
    const item = parseRecord(value)
    return item && (item.descripcion || item.codigo) ? [item] : []
  })
  const calculatedAmounts = calculateItemAmounts(items)
  const netAmount =
    getOptionalNumber(arcaAmounts, "neto", "importeNetoGravado", "impNeto") ??
    calculatedAmounts.net
  const ivaAmount =
    getOptionalNumber(arcaAmounts, "iva", "importeIva", "impIva") ??
    calculatedAmounts.iva

  const cae = getText(caeData, "cae", "CAE", "codAut", "codigoAutorizacion") ||
    getText(arca, "cae", "CAE")
  const arcaId = getText(arca, "id").split("-").map(Number)
  const cbteTipo =
    getNumber(caeData, "cbteTipo", "tipoCmp") ||
    getNumber(arca, "cbteTipo", "tipoCmp") ||
    (arcaId.length === 3 ? arcaId[1] : 0) ||
    (getText(arca, "tipo").toUpperCase() === "A"
      ? 1
      : getText(arca, "tipo").toUpperCase() === "C"
        ? 11
        : 6)
  const ptoVta =
    getNumber(caeData, "ptoVta", "puntoVenta") ||
    getNumber(arca, "ptoVta", "puntoVenta") ||
    (arcaId.length === 3 ? arcaId[0] : 0)
  const cbteNro =
    getNumber(caeData, "cbteNro", "nroCmp", "numero") ||
    getNumber(arca, "cbteNro", "nroCmp", "numero") ||
    (arcaId.length === 3 ? arcaId[2] : 0)
  const data: ReceiptData = {
    number: getText(meta, "remito") || factura.id,
    type: getText(meta, "tipo") || getText(arca, "tipo") || "Factura",
    date: getText(meta, "fecha"),
    total: getText(meta, "total") || getText(arcaAmounts, "total"),
    netAmount,
    ivaAmount,
    paid: getText(meta, "pagado"),
    balance: getText(meta, "saldo"),
    clientName:
      getText(arcaClient, "razonSocial") ||
      factura.account?.razonSocial || factura.account?.nombre || "Consumidor Final",
    clientCuit:
      getText(arcaClient, "docNro") ||
      factura.account?.cuit?.replace(/^(\d{2})-?(\d{8})-?(\d)$/, "$1-$2-$3") ||
      "",
    clientAddress:
      getText(meta, "domicilioCliente", "direccionCliente", "domicilio") ||
      getText(arcaClient, "domicilio") ||
      "",
    saleCondition: getText(meta, "condicionVenta", "condicionDeVenta"),
    items,
    arca,
    arcaClient,
    arcaAmounts,
    caeData,
    cae,
    caeExpiration: getText(caeData, "caeFchVto", "fechaVencimiento", "fchVto"),
    qr,
    qrPayload: getQrPayload(arca?.qr) || getQrPayload(meta?.qr),
    cbteTipo,
    ptoVta,
    cbteNro,
  }
  if (!data.qrPayload) data.qrPayload = buildArcaQrPayload(data)
  return data
}

export async function generarQrFactura(factura: FacturaImprimible) {
  const data = getReceiptData(factura)
  const savedImage = getQrImage(data.qr) || getQrImage(data.arca)
  if (savedImage) return savedImage
  if (!data.qrPayload) return ""
  return QRCode.toDataURL(data.qrPayload, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 240,
  })
}

export function getFacturaArcaInfo(factura: FacturaImprimible) {
  const data = getReceiptData(factura)
  return {
    cae: data.cae,
    caeExpiration: data.caeExpiration,
    ambiente: getText(data.arca, "ambiente"),
    hasQr: Boolean(data.qrPayload || getQrImage(data.qr) || getQrImage(data.arca)),
  }
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function formatMoney(value: unknown) {
  const amount = Number(value)
  if (value === "" || value === null || value === undefined || !Number.isFinite(amount)) {
    return "—"
  }
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount)
}

function formatDate(value: string) {
  if (!value) return "—"
  const dayFirstDate = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
  const compactDate = value.match(/^(\d{4})(\d{2})(\d{2})$/)
  const date =
    compactDate
      ? new Date(
          Number(compactDate[1]),
          Number(compactDate[2]) - 1,
          Number(compactDate[3])
        )
      : dayFirstDate
        ? new Date(
            Number(dayFirstDate[3]),
            Number(dayFirstDate[2]) - 1,
            Number(dayFirstDate[1])
          )
        : new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("es-AR").format(date)
}

function createFacturaHtml(factura: FacturaImprimible, qrImage: string) {
  const data = getReceiptData(factura)
  const letra = (data.type || "A").toString().toUpperCase().includes("C") ? "C" : (data.type || "A").toString().toUpperCase().includes("B") ? "B" : "A"
  const itemRows = data.items.length
    ? data.items
        .map((item) => {
          const quantity = Number(item.cantidad ?? 0)
          const price = Number(item.precioUnitario ?? item.costo ?? 0)
          const bonif = Number(item.bonificacion ?? item.bonif ?? item.descuento ?? 0)
          const subtotal = quantity * price * (1 - bonif / 100)
          const iva = Number(item.alicuotaIva ?? item.iva ?? 21)
          const totalConIva = subtotal * (1 + iva / 100)
          return `<tr>
            <td>${escapeHtml(item.codigo || "—")}</td>
            <td>${escapeHtml(item.descripcion || "Artículo")}</td>
            <td class="center">${escapeHtml(item.cantidad ?? "—")}</td>
            <td class="center">${escapeHtml(item.unidad || item.uMedida || item.medida || "unidades")}</td>
            <td class="right-align">${formatMoney(price)}</td>
            <td class="right-align">${bonif ? `${formatMoney(bonif)}%` : "0.00"}</td>
            <td class="right-align">${formatMoney(subtotal)}</td>
            <td class="right-align">${escapeHtml(item.alicuotaIva ?? item.iva ?? "21%")}</td>
            <td class="right-align">${formatMoney(totalConIva)}</td>
          </tr>`
        })
        .join("")
    : `<tr><td colspan="9" class="center muted">No hay artículos detallados en esta factura.</td></tr>`

  const tipoFactura = (data.type || "Factura").toString().trim()
  const documentTitle = tipoFactura.toUpperCase().startsWith("FACTURA")
    ? tipoFactura.toUpperCase()
    : `FACTURA ${tipoFactura.toUpperCase()}`
  const puntoVenta = String(data.ptoVta || 0).padStart(5, "0")
  const numero = String(data.cbteNro || 0).padStart(8, "0")
  return `
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 9.5pt;
        color: #000;
      }
      .page {
        width: 794px;
        min-height: 1123px;
        height: 1123px;
        padding: 20px;
        page-break-after: always;
        display: flex;
        flex-direction: column;
      }
      .main-box {
        border: 2px solid #000;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      .copy {
        text-align: center;
        font-weight: bold;
        border-bottom: 2px solid #000;
        padding: 6px 8px;
        letter-spacing: 1px;
        background: #f7f7f7;
        text-transform: uppercase;
      }
      .header {
        position: relative;
        display: flex;
        border-bottom: 2px solid #000;
        padding: 14px 0 12px;
        min-height: 125px;
      }
      .left, .right {
        width: 48%;
        padding: 0 16px;
      }
      .right { padding-left: 26px; }
      .divider { width: 4%; }
      .letter {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 58px;
        height: 54px;
        border: 2px solid #000;
        border-top: 0;
        background: #fff;
        text-align: center;
      }
      .letter strong { display: block; font-size: 28px; line-height: 30px; }
      .letter small { font-weight: bold; }
      .title {
        font-size: 18pt;
        font-weight: bold;
        margin: 0 0 12px 10px;
      }
      .line { line-height: 1.5; overflow-wrap: anywhere; }
      .label { font-weight: bold; }
      .client {
        padding: 10px 14px;
        border-bottom: 2px solid #000;
        line-height: 1.5;
      }
      .row { display: flex; }
      .items { width: 100%; border-collapse: collapse; }
      .items th {
        background: #eaeaea;
        border-bottom: 2px solid #000;
        border-right: 2px solid #000;
        padding: 6px 4px;
        font-size: 8pt;
        text-align: left;
      }
      .items td {
        padding: 5px 4px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 8pt;
        vertical-align: top;
      }
      .center { text-align: center; }
      .right-align { text-align: right; }
      .totals {
        border: 2px solid #000;
        margin-top: 18px;
        padding: 12px 18px;
        text-align: right;
      }
      .total { margin-bottom: 4px; }
      .grand {
        font-size: 11pt;
        font-weight: bold;
        border-top: 1px solid #ddd;
        padding-top: 4px;
        margin-top: 6px;
      }
      .afip {
        border-top: 2px solid #000;
        margin-top: 10px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
      }
      .qr { width: 90px; height: 90px; object-fit: contain; }
      .qr-side { display: flex; gap: 12px; align-items: center; }
      .arca { font-size: 26pt; font-weight: 900; font-style: italic; line-height: .85; }
      .small { font-size: 6.5pt; }
      .cae { text-align: right; line-height: 1.4; }
    </style>
    <div class="page">
      <div class="main-box">
        <div class="copy">ORIGINAL</div>
        <div class="header">
          <div class="letter"><strong>${escapeHtml(letra)}</strong><small>COD. ${String(data.cbteTipo || 1).padStart(3, "0")}</small></div>
          <div class="left">
            <div class="line"><span class="label">Razón Social:</span> DI PASQUA ALEJANDRO JOSE.</div>
            <div class="line"><span class="label">Domicilio Comercial:</span> Concordia 51 - Rodeo de La Cruz - Mendoza</div>
            <div class="line"><span class="label">Condición frente al IVA:</span> IVA Responsable Inscripto</div>
          </div>
          <div class="divider"></div>
          <div class="right">
            <div class="title">${escapeHtml(documentTitle)}</div>
            <div class="line"><span class="label">Punto de Venta:</span> ${escapeHtml(puntoVenta)} <span class="label">Comp. Nro:</span> ${escapeHtml(numero)}</div>
            <div class="line"><span class="label">Fecha de Emisión:</span> ${escapeHtml(formatDate(data.date))}</div>
            <div class="line"><span class="label">CUIT:</span> 20207487490</div>
            <div class="line"><span class="label">Ingresos Brutos:</span> 0172217</div>
            <div class="line"><span class="label">Inicio de Actividades:</span> 01/03/1994</div>
          </div>
        </div>
        <div class="client">
          <div class="row">
            <div style="width:38%"><span class="label">CUIT:</span> ${escapeHtml(data.clientCuit || "—")}</div>
            <div style="width:62%"><span class="label">Apellido y Nombre / Razón Social:</span> ${escapeHtml(data.clientName || "Consumidor Final")}</div>
          </div>
          <div class="row">
            <div style="width:50%"><span class="label">Condición frente al IVA:</span> ${escapeHtml(getText(data.arcaClient, "condicionIva", "condicionIvaReceptor") || "IVA Responsable Inscripto")}</div>
            <div style="width:50%"><span class="label">Domicilio:</span> ${escapeHtml(data.clientAddress || "-")}</div>
          </div>
          <div><span class="label">Conpndición de venta:</span> ${escapeHtml(data.saleCondition || "Otras")}</div>
        </div>
        <table class="items">
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th class="center">Cantidad</th>
              <th class="center">U. Medida</th>
              <th class="right-align">Precio Unit.</th>
              <th class="right-align">Bonif.</th>
              <th class="right-align">Subtotal</th>
              <th class="right-align">Alícuota IVA</th>
              <th class="right-align">Subtotal con IVA</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
      </div>
      <div class="totals">
        <div class="total"><span class="label">Importe Neto Gravado:</span> ${formatMoney(data.netAmount)}</div>
        <div class="total"><span class="label">IVA:</span> ${formatMoney(data.ivaAmount)}</div>
        <div class="grand"><span class="label">Importe Total:</span> ${formatMoney(data.total)}</div>
      </div>
      <div class="afip">
        <div class="qr-side">
          ${qrImage ? `<img class="qr" src="${qrImage}" alt="QR ARCA" />` : ""}
          <div>
            <div class="arca">ARCA</div>
            <div class="small">AGENCIA DE RECAUDACIÓN</div>
            <div class="small">Y CONTROL ADUANERO</div>
            <strong>Comprobante Autorizado</strong>
          </div>
        </div>
        <div class="cae">
          <div><span class="label">CAE N°:</span> ${escapeHtml(data.cae || "No disponible")}</div>
          <div><span class="label">Fecha de Vto. de CAE:</span> ${escapeHtml(data.caeExpiration ? formatDate(data.caeExpiration) : "—")}</div>
        </div>
      </div>
    </div>`
}

export async function descargarFacturaPdf(factura: FacturaImprimible) {
  const root = document.createElement("div")
  root.style.position = "fixed"
  root.style.left = "0"
  root.style.top = "0"
  root.style.width = "794px"
  root.style.pointerEvents = "none"
  root.style.zIndex = "-1"
  const qrImage = await generarQrFactura(factura)
  root.innerHTML = createFacturaHtml(factura, qrImage)
  document.body.appendChild(root)

  try {
    const page = root.querySelector<HTMLElement>(".page")
    if (!page) throw new Error("No se pudo preparar la factura para descargar.")
    const qr = root.querySelector<HTMLImageElement>(".qr")
    if (qr && !qr.complete) {
      await new Promise<void>((resolve, reject) => {
        qr.addEventListener("load", () => resolve(), { once: true })
        qr.addEventListener(
          "error",
          () => reject(new Error("No se pudo cargar el código QR de la factura.")),
          { once: true }
        )
      })
    }
    const canvas = await html2canvas(page, {
      scale: 2,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
    })
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" })
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, 210, 297)
    const { number } = getReceiptData(factura)
    pdf.save(`factura-${number.replace(/[\\/:*?"<>|]/g, "-")}.pdf`)
  } finally {
    root.remove()
  }
}

export async function imprimirFactura(factura: FacturaImprimible) {
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    throw new Error("El navegador bloqueó la ventana de impresión. Permití las ventanas emergentes e intentá de nuevo.")
  }

  printWindow.addEventListener(
    "load",
    () => {
      printWindow.focus()
      printWindow.print()
    },
    { once: true }
  )
  const qrImage = await generarQrFactura(factura)
  printWindow.document.open()
  printWindow.document.write(createFacturaHtml(factura, qrImage))
  printWindow.document.close()
  printWindow.opener = null
}
