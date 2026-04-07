"use client"

import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    {
      img: "/ELECTRICIDAD-JPG/faroslt.png",
      titulo: "Faros traseros y faroleras",
      pdf: "/catalogos/ELECTRICIDAD/FAROS TRASEROS Y FAROLERAS1.pdf",
    },
    {
      img: "/ELECTRICIDAD-JPG/farosL.png",
      titulo: "Faros Laterales, Posición, Patente y Portalampara",
      pdf: "/catalogos/ELECTRICIDAD/FAROS LATERALES.pdf",
    },
     {
      img: "/ELECTRICIDAD-JPG/esquineros.png",
      titulo: "Faros, micas y esquineros",
      pdf: "/catalogos/ELECTRICIDAD/FAROS, MICAS Y ESQUINEROS.pdf",
    },
  
    {
      img: "/ELECTRICIDAD-JPG/MICAS.png",
      titulo: "Micas",
      pdf: "/catalogos/ELECTRICIDAD/LENTES - MICAS (1).pdf",
    },
  ]

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO */}
      <main className="flex-1 relative">

        

        {/* FONDOS */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/fondo_web.png')" }}
        />
        <div className="fixed inset-0 bg-black/70 -z-10" />


        {/* CUADROS */}
        <div className="min-h-screen px-4 py-24 md:p-20 flex justify-center">
          <div className="w-full max-w-5xl">

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                gap-6
                md:gap-8
              "
            >
              {cuadros.map((c, i) => (
                <a
                  key={i}
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <div
                    className="
                      bg-white
                      rounded-xl
                      shadow-lg
                      overflow-hidden
                      transition
                      hover:scale-105
                      active:scale-95
                    "
                  >
                    <Image
                      src={c.img}
                      alt={c.titulo}
                      width={400}
                      height={400}
                      className="
                        w-full
                        h-40
                        sm:h-44
                        md:h-48
                        object-cover
                      "
                    />
                    <h3 className="p-4 bg-red-600 text-center font-bold text-sm sm:text-base">
                      {c.titulo}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
