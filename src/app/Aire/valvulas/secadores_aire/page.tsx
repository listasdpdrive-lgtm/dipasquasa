"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, Folders, Wrench, MapPin, Mail, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"

export default function secadores_aire() {

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
        
            <Sidebar/>
            <main className="flex-1 relative">

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
                            onClick={() => window.location.href = "/catalogos/AIRE/SECADORES DE AIRE, FILTROS Y VÁLVULAS DE DRENAJE.pdf"}
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
</main>
            </div>
       
    )
}
