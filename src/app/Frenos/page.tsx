"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { link } from "fs"

export default function Accesorios() {

  const cuadros = [
    {
      img: "/frenos/levas.png",
      titulo: "Levas y Componentes",
      link: "/Frenos/levas" ,
    },
    {
      img: "/frenos/pulmones.png",
      titulo: "Pulmones de freno, reparaciones y accesorios",
      link: "/Frenos/Pulmones",
    },
    {
      img: "/frenos/remaches.png",
      titulo: "Remaches",
      pdf: "/catalogos/FRENOS/REMACHES.pdf",
    },
     {
      img: "/frenos/rodillos.png",
      titulo: "Rodillos",
      pdf: "/catalogos/FRENOS/RODILLOS.pdf",
    },
      {
      img: "/frenos/cintas.png",
      titulo: "Patines de freno y crucetas",
      link: "/Frenos/patines_freno",
    },
      {
      img: "/frenos/repuesto.png",
      titulo: "Repuestos para patin de freno",
      pdf: "/catalogos/FRENOS/REPUESTO PATIN DE FRENO.pdf",
    },
      {
      img: "/frenos/registro.png",
      titulo: "Registros de freno y reparaciones",
      link: "/Frenos/registros",
    },
    {
      img: "/frenos/pernopatin.png",
      titulo: "Pernos de patin de freno",
      pdf: "/catalogos/FRENOS/PERNO PATIN DE FRENO.pdf",
    },
    {
      img: "/frenos/cintass.png",
      titulo: "Cintas de freno",
      link: "/Frenos/cintas-de-frenos",
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
          <div className="w-full max-w-6xl">

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {cuadros.map((c, i) => {

                const Wrapper = c.link ? Link : "a"
                const wrapperProps = c.link
                  ? { href: c.link }
                  : { href: c.pdf, target: "_blank", rel: "noopener noreferrer" }

                return (
                  <Wrapper key={i} {...wrapperProps}>
                    <div
                      className="bg-white rounded-xl shadow-lg overflow-hidden
                                 transition hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Image
                        src={c.img}
                        alt={c.titulo}
                        width={600}
                        height={600}
                        className="w-full h-44 sm:h-52 md:h-69 object-cover"
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
