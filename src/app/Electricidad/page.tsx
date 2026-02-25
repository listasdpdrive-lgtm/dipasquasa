"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import { link } from "fs"

export default function Accesorios() {

  const cuadros = [
    {
      img: "/ELECTRICIDAD-JPG/cables.png",
      titulo: "Cables",
      pdf: "/catalogos/ELECTRICIDAD/CABLES.pdf",
    },
    {
      img: "/ELECTRICIDAD-JPG/varios.png",
      titulo: "Electricidad Variado",
      pdf: "/catalogos/ELECTRICIDAD/ELECTRICIDAD Y ACCESORIOS.pdf",
    },
     {
      img: "/ELECTRICIDAD-JPG/enchufe.png",
      titulo: "Enchufe de Luz",
      pdf: "/catalogos/ELECTRICIDAD/ENCHUFES DE LUZ.pdf",
    },
    {
      img: "/ELECTRICIDAD-JPG/faros.png",
      titulo: "Faros",
      link: "/Electricidad/Faros",
    },
    {
      img: "/ELECTRICIDAD-JPG/luces.png",
      titulo: "Focos",
      link: "/Electricidad/Luces",
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
              {cuadros.map((c, i) => {
                const Wrapper = c.link ? Link : "a"
                const props = c.link
                  ? { href: c.link }
                  : { href: c.pdf, target: "_blank" }

                return (
                  <Wrapper key={i} {...props}>
                    <div
                      className="
                        bg-white
                        rounded-xl
                        shadow-lg
                        overflow-hidden
                        transition
                        hover:scale-105
                        active:scale-95
                        cursor-pointer
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
                      <h3 className="p-4 bg-red-600 text-center font-bold text-base sm:text-lg">
                        {c.titulo}
                      </h3>
                    </div>
                  </Wrapper>
                )
              })}
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
