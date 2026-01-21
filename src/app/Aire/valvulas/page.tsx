"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  // 🔹 CUADROS DEFINIDOS
  const cuadros = [
    {
      img: "/AIRE-JPG/secadoresaire.png",
      titulo: "Secadores de aire",
      pdf: "/catalogos/AIRE/valvulas/VÁLVULA SECADORES DE AIRE,FILTROS Y VALVULA DE DRENAJE RG.pdf",
    },
    {
      img: "/AIRE-JPG/Valvuladescarga.png",
      titulo: "Válvulas de descarga",
      pdf: "/catalogos/AIRE/valvulas/VÁLVULAS DESCARGA RAPIDA.pdf",
    },
    {
      img: "/AIRE-JPG/valvuladistribuidora.png",
      titulo: "Válvula distribuidora",
      pdf: "/catalogos/AIRE/valvulas/VÁLVULA DISTRIBUIDORA.pdf",
    },
    {
      img: "/AIRE-JPG/valvulaniveladora.png",
      titulo: "Válvulas niveladora",
      pdf:" /catalogos/AIRE/valvulas/VÁLVULA NIVELADORAS Y LIMITADORAS DE SUSPENSIÓN NEUMÁTICA.pdf",
    },
  
    {
      img: "/AIRE-JPG/valvulagobernadora.png",
      titulo: "Válvulas gobernadoras",
     pdf:"/catalogos/AIRE/valvulas/VÁLVULA GOBERNADORA.pdf",
    },
    {
      img: "/AIRE-JPG/valvulamanuales.png",
      titulo: "Válvulas manuales",
      pdf:"/catalogos/AIRE/valvulas/VÁLVULA MANUALES, FRENO Y COMANDO.pdf",
    },
    {
      img: "/AIRE-JPG/valvuladepied.png",
      titulo: "Válvulas de pie",
     pdf:"/catalogos/AIRE/valvulas/VÁLVULAS DE PIE RG.pdf",
    },
    {
      img: "/AIRE-JPG/valvulaprotectora.png",
      titulo: "Válvulas protectoras",
      pdf: "/catalogos/AIRE/valvulas/VÁLVULAS PROTECTORAS DE PRESIÓN LIMITADORAS Y MÁS.pdf",
    },
    {
      img: "/AIRE-JPG/valvulasuspencion.png",
      titulo: "Válvulas de Suspension",
      pdf: "/catalogos/AIRE/valvulas/VÁLVULAS DE SUPERNSIÓN NEUMATICA .pdf",
    },
      {
      img: "/AIRE-JPG/valvularelay.png",
      titulo: "Válvulas de control y relay",
      pdf: "/catalogos/AIRE/valvulas/VÁLVULAS DE CONTROL Y RELAY RG.pdf",
    },
  ]

  return (
    <div className="flex min-h-screen">
     
      <Sidebar />

      <main className="flex-1 relative">
        {/* FONDO */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/fondo_web.png')" }}
        />
        <div className="fixed inset-0 bg-black/70 -z-10" />

        {/* CONTENIDO */}
        <div className="min-h-screen px-10 py-20 flex justify-center">
          <div className="w-full max-w-6xl">

            {/* GRID DE CUADROS */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {cuadros.map((c, i) => {
                const Card = (
                   <div className="bg-white rounded-xl shadow-lg overflow-hidden
                                  transition cursor-pointer
                                  md:hover:scale-105">
                    <Image
                      src={c.img}
                      alt={c.titulo}
                      width={400}
                      height={400}
                      className="w-full h-40 object-cover"
                    />
                    <h3 className="p-4 bg-red-600 text-center font-bold">
                      {c.titulo}
                    </h3>
                  </div>
                )

                // 👉 Si tiene PDF
                if (c.pdf) {
                  return (
                    <a
                      key={i}
                      href={c.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Card}
                    </a>
                  )
                }

                {/* 👉 Si tiene link interno
                return (
                  <Link key={i} href={c.link!}>
                    {Card}
                  </Link>
                )*/}
              })}
            </div>

            
          </div>
        </div>
      </main>
    </div>
  )
}
