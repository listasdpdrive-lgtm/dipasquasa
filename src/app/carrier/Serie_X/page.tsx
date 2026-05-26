"use client"

import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    {
      img: "/carrier/correas.avif",
      titulo: "Correas y mangueras",
      pdf: "/catalogos/CARRIER/x/Correas y mangueras x2100 20-05-26.pdf",
    },
    {
      img: "/carrier/electricidadx.png",
      titulo: "Electricidad",
      pdf: "/catalogos/CARRIER/x/Electricidad X2100 20-05-26.pdf",
    },
    {
      img: "/carrier/motor.png",
      titulo: "Motor",
      pdf: "/catalogos/CARRIER/x/Motor general x2100 20-05-26.pdf",
    },
    {
      img: "/carrier/filtroX.jpg",
      titulo: "Filtros y tanques",
      pdf: "/catalogos/CARRIER/x/Filtros y tanque x2100.pdf",
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

            {/* 2 en mobile / 4 en desktop */}
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
                      className="w-full h-28 md:h-58 object-cover"
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

