"use client"

import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    { img: "/REPARACIONESRG/aire.jpg", titulo: "REPARACIONES ACOPLES DE AIRE",
       pdf: "/catalogos/AIRE/RG/REPARACIÓN DE ACOPLES AIRE RG.pdf" },

    { img: "/REPARACIONESRG/compresor.png", titulo: "REPARACIONES DE COMPRESOR",
       pdf: "/catalogos/AIRE/RG/REPARACIÓN COMPRESOR RG.pdf" },

    { img: "/REPARACIONESRG/servoembrague.png", titulo: "REPARACIONES SERVOS DE EMBRAGUE", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN SERVO DE EMBRAGUE.pdf" },

    { img: "/REPARACIONESRG/servofreno.png", titulo: "REPARACIONES SERVOS DE FRENO",
       pdf: "/catalogos/AIRE/RG/REPARACIÓN DE SERVOS DE FRENO.pdf" },

    { img: "/REPARACIONESRG/comando.png", titulo: "REPARACIONES VÁLVULAS COMANDO MANUALES Y DE FRENO", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA COMANDO,MANUALES Y DE FRENO RG.pdf" },

    { img: "/REPARACIONESRG/distribuidoras.png", titulo: "REPARACIONES VÁLVULAS DISTRIBUIDORAS", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA DISTRIBUIDORA RG.pdf" },

    { img: "/REPARACIONESRG/gobernadoras.png", titulo: "REPARACIONES VÁLVULAS GOBERNADORAS",
       pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULAS GOBERNADORAS RG.pdf" },

    { img: "/REPARACIONESRG/niveladoras.png", titulo: "REPARACIONES VÁLVULAS NIVELADORAS", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA NIVELADORA RG.pdf" },

    { img: "/REPARACIONESRG/pedaleras.png", titulo: "REPARACIONES VÁLVULAS PEDALERAS",
       pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA PEDALERA RG.pdf" },

    { img: "/REPARACIONESRG/protectoras.png", titulo: "REPARACIONES VÁLVULAS PROTECTORAS Y DE RETENCIÓN", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA PROTECTORA DE PRESIÓN Y RETENCIÓN RG.pdf" },

    { img: "/REPARACIONESRG/relay.png", titulo: "REPARACIONES VÁLVULAS RELAY", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA RELAY RG.pdf" },

    { img: "/REPARACIONESRG/rcontrol.png", titulo: "REPARACIONES VÁLVULAS RELAY Y DE CONTROL", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA RELAY Y CONTROL SPRING BREAK RG.pdf" },

    { img: "/REPARACIONESRG/sensibles.png", titulo: "REPARACIONES VÁLVULAS SENSIBLES A LA CARGA", 
      pdf: "/catalogos/AIRE/RG/REPARACIÓN VALVULA A LA CARGA RG.pdf" },
  ]

  return (
    <div className="flex min-h-screen">



      <Sidebar />

      <main className="flex-1 relative">

        {/* Fondos */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/fondo_web.png')" }}
        />
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-black/80 -z-10" />
        <div className="fixed inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent -z-10" />

       <div className="min-h-screen px-10 py-20 flex justify-center">
          <div className="w-full max-w-6xl">

            {/* 👇 2 columnas en mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {cuadros.map((c, i) => (
                <a
                  key={i}
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden
                                  transition cursor-pointer
                                  md:hover:scale-105">
                    <Image
                      src={c.img}
                      alt={c.titulo}
                      width={600}
                      height={600}
                      className="w-full h-28 md:h-60 object-cover"
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
