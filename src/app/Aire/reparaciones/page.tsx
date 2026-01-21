"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/AIRE-JPG/reparacionestriler.png",
      titulo: "Reparaciones Triller",
      pdf: "/catalogos/AIRE/REPARACIÓN VALVULA TRILLER ACTUALIZADA.pdf",
    },
    {
      img: "/REPARACIONESRG/rg.png",
      titulo: "Reparaciones RG",
      link: "/Aire/reparaciones/reparacion_RG",
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
      <main className="flex-1 px-6 pt-28">
        <div className="max-w-5x1 mx-auto">
          {/* CUADROS */}
          <div className="grid grid-cols-1 mt-20 sm:grid-cols-3 gap-6 mb-16">
            {cuadros.map((c, i) => {
              const Card = (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer">
                  <Image
                    src={c.img}
                    alt={c.titulo}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover"
                  />
                  <h3 className="p-4 bg-red-600 text-center font-bold">
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

