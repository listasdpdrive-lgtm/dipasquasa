"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    { img: "/buloneria/alemites.png", titulo: "Alemites", pdf: "/catalogos/BULONERIA/Alemites 20-05-26.pdf" },
    { img: "/buloneria/chavetas.png", titulo: "Chavetas", pdf:"/catalogos/BULONERIA/Chavetas 20-05-26.pdf" },
    
    { img: "/buloneria/buloneria general.png", titulo: "Buloneria general", link: "/Buloneria/buloneria_general" },
 
    { img: "/buloneria/buloneria ruedas.png", titulo: "Bulones y Tuercas de Rueda", link: "/Buloneria/bulones_tuercas" },
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
