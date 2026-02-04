"use client"

import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    {
      img: "/carrier/filtro.png",
      titulo: "Filtro y portafiltros",
      pdf: "/catalogos/CARRIER/s/CORREAS SUPRA ACTUALIZADO.pdf",
    },
    {
      img: "/carrier/correa.png",
      titulo: "Correa",
      pdf: "/catalogos/CARRIER/s/CORREAS SUPRA ACTUALIZADO.pdf",
    },
    {
      img: "/carrier/motors.png",
      titulo: "Motor en general",
      pdf: "/catalogos/CARRIER/s/MOTOR GENERAL SUPRA ACTUALIZADO (1).pdf",
    },
    {
      img: "/carrier/electricidaS.png",
      titulo: "Electricidad",
      pdf: "/catalogos/CARRIER/s/ELECTRICIDAD SUPRA ACTUALIZADO.pdf",
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

        {/* CUADROS */}
        <div className="min-h-screen px-4 md:px-10 py-20 flex justify-center">
          <div className="w-full max-w-6xl">

            {/* 2 columnas mobile / 4 desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {cuadros.map((c, i) => (
                <a
                  key={i}
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className="bg-white rounded-xl shadow-lg overflow-hidden
                               transition cursor-pointer md:hover:scale-105"
                  >
                    <Image
                      src={c.img}
                      alt={c.titulo}
                      width={500}
                      height={400}
                      className="w-full h-28 md:h-48 object-cover"
                    />
                    <h3 className="p-2 bg-red-600 md:p-4 text-center font-bold text-xs md:text-base">
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

