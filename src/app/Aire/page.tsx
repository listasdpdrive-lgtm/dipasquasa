"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { link } from "fs"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/AIRE-JPG/tubo-tecalan-poliamida.jpg",
      titulo: "Mangueras y Poliamidas",
      link: "/Aire/Mangueras_poliamidas",
    },
    {
      img: "/AIRE-JPG/rulos_a.png",
      titulo: "Acoples espirales",
      pdf:"catalogos/AIRE/acoples_espirales/ACOPLES Y ESPIRALES CONECTORES DE AIRE.pdf",
    },
    {
      img: "/AIRE-JPG/conexiones.png",
      titulo: "Conexiones",
      link: "/Aire/conexiones",
    },
    {
      img: "/AIRE-JPG/valvulas.png",
      titulo: "Válvulas",
      link: "/Aire/valvulas",
    },
    {
      img: "/AIRE-JPG/reparaciones.png",
      titulo: "Reparación de válvulas",
      link: "/Aire/reparaciones",
    },
  ]

  return (
    <div className="flex min-h-screen relative">
    

      {/* FONDO */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/fondo_web.png')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90 -z-10" />

      <Sidebar />

      {/* CONTENIDO */}
      <main className="flex-1 px-4 mt-20 md:px-10 pt-24">
        {/* CONTENEDOR CENTRADO */}
        <div className="max-w-6xl mx-auto">
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {cuadros.map((c, i) => {
              const Card = (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition cursor-pointer">
                  <Image
                    src={c.img}
                    alt={c.titulo}
                    width={600}
                    height={600}
                    className="w-full h-36 md:h-48 object-cover"
                  />
                  <h3 className="p-4  bg-red-600 text-center font-bold text-sm md:text-base">
                    {c.titulo}
                  </h3>
                </div>
              )

              return c.pdf ? (
                <a
                  key={i}
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Card}
                </a>
              ) : (
                <Link key={i} href={c.link!}>
                  {Card}
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}