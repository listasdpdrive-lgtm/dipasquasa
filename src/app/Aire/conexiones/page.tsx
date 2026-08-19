"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/AIRE-JPG/conexiones_rapidas.png",
      titulo: "CONEXIONES RAPIDAS",
      pdf: "/catalogos/AIRE/conexiones/Conexiones rapidas 18-05-26.pdf",
    },  
    {
      img: "/AIRE-JPG/conexiones_bronce.png",
      titulo: "CONEXIONES DE BRONCE Y ACOPLES",
      pdf: "/catalogos/AIRE/conexiones/Conexiones de bronce 18-08-26.pdf",
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
      <main className="flex-1 px-4 mt-10 sm:px-6 pt-24 sm:pt-28">
        <div className="max-w-5xl mx-auto">
          {/* CUADROS */}
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              gap-5
              mt-8 sm:mt-16
              mb-16
            "
          >
            {cuadros.map((c, i) => {
              const Card = (
                <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition md:hover:scale-105">
                  <Image
                    src={c.img}
                    alt={c.titulo}
                    width={600}
                    height={400}
                    className="w-full  h-44 sm:h-48 object-cover"
                  />
                  <h3 className="p-4 bg-red-600 text-center font-bold text-sm sm:text-base">
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
                  className="block"
                >
                  {Card}
                </a>
              ) : (
                <Link key={i} href={c.link!} className="block">
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

