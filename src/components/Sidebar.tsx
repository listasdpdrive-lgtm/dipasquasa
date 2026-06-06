"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowLeft, Download } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"

const NAVIGATION_ITEMS = [
{ href: "/", label: "Inicio" },
{ pdf: "/catalogos/ACCESORIOS/accesorios bepo 14_05_26.pdf", label: "Accesorios" },
{ href: "/Aire", label: "Aire" },
{ href: "/AST-PRA", label: "AST-PRA" },
{ href: "/Buloneria", label: "Bulonería" },
{ href: "/carrier", label: "Carrier" },
{ href: "/Electricidad", label: "Electricidad" },
{ href: "/Elemento_amarre", label: "Elementos de Amarre" },
{ pdf: "/catalogos/SEGURIDAD/Elementos de seguridad 21-05-26.pdf", label: "Elemento de Seguridad" },
{ href: "/filtros", label: "Filtros" },
{ href: "/Frenos", label: "Frenos" },
{ pdf: "/catalogos/herramientas/Herramientas 21-05-26.pdf", label: "Herramientas" },
{ href: "/punta_eje", label: "Tren Delantero y Punta Eje" },
{ href: "/Pesados", label: "Pesados" },
{ href: "/Varios", label: "Accesorios varios" },
{ pdf: "/catalogos/Vigia 06-06-26pdf.pdf", label: "Vigia" }
]

export default function Sidebar() {
const [mobileOpen, setMobileOpen] = useState(false)
const router = useRouter()
const pathname = usePathname()

const sidebarVariants = {
hidden: { x: -260 },
visible: { x: 0, transition: { duration: 0.3 } },
exit: { x: -260, transition: { duration: 0.25 } }
}

return (
<div>
<motion.div className="fixed bottom-24 right-5 z-[70]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}>
<button onClick={() => window.open("https://wa.me/2614663077", "_blank")} className="bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg">
<Image src="/images/wp-icon.png" alt="WhatsApp" width={24} height={24} />
</button>
</motion.div>

<motion.div className="md:hidden fixed bottom-5 right-5 z-[70]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: "spring" }}>
<button onClick={() => (window.location.href = "tel:+542614663077")} className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg">
📞
</button>
</motion.div>

<header className="fixed top-0 left-0 w-full bg-white shadow z-50">
<div className="max-w-7xl mx-auto px-4">
<div className="flex items-center justify-between h-16 md:h-26">
{/* SECCIÓN IZQUIERDA: Volver + Menu + Logo */}
<div className="flex items-center gap-4">
{pathname !== "/" && (
<motion.button onClick={() => router.back()} whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }} className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shrink-0">
<ArrowLeft size={18} />
Volver
</motion.button>
)}
<button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setMobileOpen(!mobileOpen)}>
{mobileOpen ? <X size={28} /> : <Menu size={28} />}
</button>
<Link href="/" className="flex items-center">
<Image src="/logoC.png" alt="Di Pasqua" width={120} height={38} priority className="object-contain md:w-[140px] md:h-[45px]" />
</Link>
</div>

{/* SECCIÓN CENTRO DESKTOP: Botón Catálogo en el medio exacto */}
<div className="hidden md:flex flex-1 justify-center px-4">
<a href="/catalogos/CATALOGO UNIDO COMPLETO.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition shadow-sm whitespace-nowrap">
<Download size={16} />
Catálogo Completo
</a>
</div>

{/* SECCIÓN DERECHA DESKTOP: Horarios + Ubicación */}
<div className="hidden md:flex items-center gap-4 shrink-0">
<span className="text-sm text-gray-600 whitespace-nowrap">🕒 Lun a Vie 9:00 – 18:00 · Sab 9:00–13:00</span>
<button onClick={() => window.open("https://maps.app.goo.gl/jTb2ruaWZ9ahHzsU9", "_blank")} className="px-3 py-1.5 rounded-xl border border-red-600 text-red-600 text-sm font-semibold hover:bg-red-600 hover:text-white transition whitespace-nowrap">
Ubicación
</button>
</div>

{/* SECCIÓN RESPONSIVA MÓVIL (Mantiene tu diseño móvil compacto intacto) */}
<div className="flex md:hidden items-center gap-2">
<a href="/catalogos/catalogo-completo.pdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-sm" title="Catálogo Completo">
<Download size={18} />
</a>
<button onClick={() => window.open("https://maps.app.goo.gl/jTb2ruaWZ9ahHzsU9", "_blank")} className="px-2.5 py-1.5 rounded-xl border border-red-600 text-red-600 text-xs font-semibold">
Ubicación
</button>
</div>
</div>
</div>
</header>

<AnimatePresence>
{mobileOpen && (
<>
<motion.div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
<motion.aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl z-50 md:hidden overflow-y-auto" variants={sidebarVariants} initial="hidden" animate="visible" exit="exit">
<div className="p-4 border-b bg-gray-50 text-xs text-gray-500">🕒 Lun a Vie 9–18 · Sab 9–13</div>
<nav className="flex flex-col gap-1 px-3 pt-3 text-sm">
{NAVIGATION_ITEMS.map((item, i) =>
item.pdf ? (
<a key={i} href={item.pdf} target="_blank" onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors block text-gray-700">
{item.label}
</a>
) : (
<Link key={i} href={item.href} onClick={() => setMobileOpen(false)} className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors block text-gray-700">
{item.label}
</Link>
)
)}
</nav>
</motion.aside>
</>
)}
</AnimatePresence>

<aside className="hidden md:block fixed top-26 left-0 w-60 h-[calc(100vh-6.5rem)] bg-white shadow-xl z-40">
<nav className="flex flex-col gap-2 px-4 pt-4 text-sm">
{NAVIGATION_ITEMS.map((item, i) =>
item.pdf ? (
<a key={i} href={item.pdf} target="_blank" className="p-2 rounded hover:bg-gray-200">
{item.label}
</a>
) : (
<Link key={i} href={item.href} className="p-2 rounded hover:bg-gray-200">
{item.label}
</Link>
)
)}
</nav>
</aside>

<aside className="hidden md:block fixed top-26 right-0 w-44 h-[calc(100vh-6.5rem)] bg-white shadow-lg z-30">
<div className="p-3 text-sm space-y-3">
<h3 className="font-semibold text-gray-700">Información</h3>
<p className="text-10 text-gray-600">Catálogo amplio y asesoramiento técnico especializado para mantener tu flota en perfecto estado.</p>
<div className="mt-5">
<h3 className="text-sm font-semibold mb-2">📍 Nuestra ubicación</h3>
<div className="w-full h-48 rounded-xl overflow-hidden border">
<iframe src="https://www.google.com/maps?q=Di+Pasqua+Repuestos&output=embed" width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0" />
</div>
<p className="text-13 py-10 text-gray-600">No dudes en mandarnos tus consultas por whatsapp o llamarnos. Estamos para ayudarte.</p>
<p className="text-13 py-10 text-gray-600">Tel: +54 261 4910438<br />WhatsApp: 261 4663077</p>
</div>
</div>
</aside>

<style jsx global>{`
main { padding-top: 4rem; }
@media (min-width: 768px) {
main { padding-top: 6.5rem; margin-left: 15rem; margin-right: 11rem; }
}
`}</style>
</div>
)
}