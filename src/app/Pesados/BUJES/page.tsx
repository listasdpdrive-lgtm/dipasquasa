"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/PESADOS-JPG/bujeb.png",
      titulo: "Bujes de balancin",
      pdf: "/catalogos/PESADOS/bujes/BUJES DE BALANCIN.pdf",
    },
     {
      img: "/PESADOS-JPG/bujelanza.png",
      titulo: "Bujes de lanza",
      pdf: "/catalogos/PESADOS/bujes/BUJES DE LANZA.pdf",
    },
     {
      img: "/PESADOS-JPG/bujesus.png",
      titulo: "Bujes de suspension neumatica",
      pdf: "/catalogos/PESADOS/bujes/BUJES DE SUSPENSION NEUMATICA (2).pdf",
    },
     {
      img: "/PESADOS-JPG/bujetr.png",
      titulo: "Bujes de tensor",
      pdf: "/catalogos/PESADOS/bujes/BUJES DE TENSOR.pdf",
    },
   {
      img: "/PESADOS-JPG/bujes elastico.png",
      titulo: "Bujes Perno de Elatico",
      pdf: "/catalogos/PESADOS/bujes/BUJES PERNOS DE ELASTICO (2) (1).pdf",
    },
     {
      img: "/PESADOS-JPG/buje_moño.png",
      titulo: "Bujes moño",
      pdf: "/catalogos/PESADOS/bujes/BUJES MOÑO.pdf",
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
      <main className="flex-1 px-4 md:px-10 pt-24">
        {/* CONTENEDOR CENTRADO */}
        <div className="max-w-6xl mx-auto">
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 mt-25 gap-6 md:gap-8">
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
                  <h3 className="p-4 bg-red-600 text-center font-bold text-sm md:text-base">
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
