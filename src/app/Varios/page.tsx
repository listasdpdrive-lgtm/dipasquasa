"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/varios/lubricantes.png",
      titulo: "Lubricantes y otros",
      pdf: "/catalogos/PESADOS/LUBRICANTES Y OTROS.pdf",
    },
    {
      img: "/varios/otros.png",
      titulo: "Accesorios varios",
      pdf: "/catalogos/varios/ACCESORIOS VARIOS.pdf",
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
      <main className="flex-1 px-4 md:px-10 pt-14">
        {/* CONTENEDOR CENTRADO */}
        <div className="max-w-6xl mx-auto">
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-2 mt-20 gap-6 md:gap-8">
            {cuadros.map((c, i) => {
              const Card = (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition cursor-pointer">
                  <Image
                    src={c.img}
                    alt={c.titulo}
                    width={100}
                    height={900}
                    className="w-full h-36 md:h-88 object-cover"
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
