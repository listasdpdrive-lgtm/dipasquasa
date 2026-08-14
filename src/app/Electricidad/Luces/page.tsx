"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    {
      img: "/ELECTRICIDAD-JPG/cree led.png",
      titulo: "CREE LED 24 Y 12V",
      pdf: "/catalogos/ELECTRICIDAD/Cree led 24-07-26.pdf",
    },
    {
      img: "/ELECTRICIDAD-JPG/barras.png",
      titulo: "FAROS, BARRAS Y TIRAS 24 Y 12V",
      pdf: "/catalogos/ELECTRICIDAD/Barras led, tiras y tabletas led 20-06-26 .pdf",
    },
    {
      img: "/ELECTRICIDAD-JPG/leds.png",
      titulo: "FOCOS LED 24 Y 12V",
      pdf: "/catalogos/ELECTRICIDAD/Focos led 21-25-26.pdf",
    },
     {
      img: "/ELECTRICIDAD-JPG/halogenos.png",
      titulo: "HALOGENOS 24 Y 12V",
      pdf: "/catalogos/ELECTRICIDAD/Lamparas halogenas 14-08-26.pdf",
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
