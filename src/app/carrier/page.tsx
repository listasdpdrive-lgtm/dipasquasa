"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/carrier/home-frio.jpg",
      titulo: "Serie X",
      link: "/carrier/Serie_X",
    },
    {
      img: "/carrier/carrier-supra.png",
      titulo: "Supra",
      link: "/carrier/Supra",
    },
    {
      img: "/carrier/carrier_varios.png",
      titulo: "Carrier varios",
      pdf: "/catalogos/CARRIER/Carrier varios 20-05-26.pdf",
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
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-10">
              {cuadros.map((c, i) => {
                const Wrapper = c.link ? Link : "a"
                const href = c.link ?? c.pdf

                return (
                  <Wrapper
                    key={i}
                    href={href}
                    {...(!c.link && { target: "_blank", rel: "noopener noreferrer" })}
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
                        className="w-full h-40 md:h-56 object-cover"
                      />
                      <h3 className="p-2 md:p-4 bg-red-600 text-center font-bold text-sm md:text-lg text-white">
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
