"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, Folders, Wrench, MapPin, Mail, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Accesorios() {

    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileOpen, setMobileOpen] = useState(true)
    const [openDropdown, setOpenDropdown] = useState(null)

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name)
    }

    return (
        <div className="flex min-h-screen relative">

            {/* ---------- BOTÓN RETROCEDER FIJO ---------- */}
            <button
                onClick={() => window.history.back()}
                className="fixed top-28 left-353 z-[200] px-6 py-2 
                           bg-red-600 text-white rounded-xl shadow-xl 
                           hover:bg-red-700 transition"
            >
                ← Atras
            </button>
        
            {/* ---------------- SIDEBAR ---------------- */}
            <div
                 className={`${sidebarOpen ? "w-60" : "w-16"} 
                    bg-white shadow-xl transition-all duration-300 
                    p-4 flex flex-col fixed top-0 left-0 h-full z-[100] pt-6`}
            >
                <nav className="flex flex-col gap-4 text-sm">

                    <Link href="/" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Home size={22} />}
                        {sidebarOpen && <span>Inicio</span>}
                    </Link>

                    <Link href="/accesorios" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Folders size={22} />}
                        {sidebarOpen && <span>Accesorios</span>}
                    </Link>

                    <Link href="/Aire" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Wrench size={22} />}
                        {sidebarOpen && <span>Aire</span>}
                    </Link>

                    <Link href="/AST-PRA" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <MapPin size={22} />}
                        {sidebarOpen && <span>AST-PRA</span>}
                    </Link>

                    <Link href="/Buloneria" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Mail size={22} />}
                        {sidebarOpen && <span>Bulonería</span>}
                    </Link>

                    <Link href="/carrier" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Mail size={22} />}
                        {sidebarOpen && <span>Carrier</span>}
                    </Link>

                    <Link href="/Electricidad" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Mail size={22} />}
                        {sidebarOpen && <span>Electricidad</span>}
                    </Link>

                    <Link href="/Elemento_amarre" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Mail size={22} />}
                        {sidebarOpen && <span>Elementos de Amarre</span>}
                    </Link>

                    <Link href="/Elemento_seguridad" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Mail size={22} />}
                        {sidebarOpen && <span>Elemento de seguridad</span>}
                    </Link>

                    <Link href="/Frenos" className="p-2 rounded hover:bg-gray-200 flex items-center gap-3">
                        {!sidebarOpen && <Mail size={22} />}
                        {sidebarOpen && <span>Frenos</span>}
                    </Link>

                </nav>
            </div>

            {/* ---------------- CONTENIDO ---------------- */}
            <div className="flex-1 ml-16 relative">

                {/* HEADER */}
                <header className="fixed top-0 left-0 w-full bg-white shadow z-[190]">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                        <Link href="/" className="text-2xl font-bold text-red-600">
                            Di Pasqua
                        </Link>

                        <nav className="hidden md:flex gap-6 text-lg">
                            
                           <button
    onClick={() =>
        window.open("https://www.google.com/maps/place/Di+Pasqua+Repuestos/@-32.9281022,-68.7365022,17.75z/data=!4m6!3m5!1s0x967e0d94d64fa437:0x33d79dcaae872172!8m2!3d-32.9279133!4d-68.736165!16s%2Fg%2F11gg7490c7?entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoASAFQAw%3D%3D", "_blank")
    }
    className="flex items-center gap-1 hover:text-blue-600"
>
    Ubicación
</button>
                            <Link href="/contacto" className="hover:text-blue-600">Contacto</Link>
                        </nav>

                        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
                        </button>

                    </div>
                </header>

                {/* FONDO */}
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
                    style={{ backgroundImage: "url('/fondo_web.png')" }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-black/80 -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent -z-10"></div>

                {/* ---------------- CUADRO ---------------- */}
                <div className="pt-60 pb-20 flex justify-center">
                    <div className="w-4/5 max-w-6xl flex justify-center">

                        {/* CUADRO CENTRADO Y GRANDE */}
                        <div
                            onClick={() => window.location.href = "/catalogos/AIRE/REPARACIONES TRILER.pdf"}
                            className="w-200 bg-black rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:opacity-80 transition"
                        >
                            <video
                                src="/videos/videotst.mp4"
                                className="w-200 h-[300px] object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
