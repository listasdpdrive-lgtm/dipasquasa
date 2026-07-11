"use client"

import Image from "next/image"
import Sidebar from "@/components/Sidebar"

export default function Accesorios() {

  const cuadros = [
    { img: "/REPARACIONESRG/aire.jpg", titulo: "REPARACIONES ACOPLES DE AIRE",
       pdf: "/catalogos/AIRE/RG/Reparación acoples de aire 18-05-26.pdf" },

    { img: "/REPARACIONESRG/compresor.png", titulo: "REPARACIONES DE COMPRESOR",
       pdf: "/catalogos/AIRE/RG/Reparación compresor 18-05-26.pdf" },

    { img: "/REPARACIONESRG/servoembrague.png", titulo: "REPARACIONES SERVOS DE EMBRAGUE", 
      pdf: "/catalogos/AIRE/RG/Reparación servos de embrague 18-05-26.pdf" },

    { img: "/REPARACIONESRG/servofreno.png", titulo: "REPARACIONES SERVOS DE FRENO",
       pdf: "/catalogos/AIRE/RG/Reparación servo de freno 18-05-26.pdf" },

    { img: "/REPARACIONESRG/comando.png", titulo: "REPARACIONES VÁLVULAS COMANDO MANUALES Y DE FRENO", 
      pdf: "/catalogos/AIRE/RG/Reparación valvulas de comando 18-05-26.pdf" },

    { img: "/REPARACIONESRG/distribuidoras.png", titulo: "REPARACIONES VÁLVULAS DISTRIBUIDORAS", 
      pdf: "/catalogos/AIRE/RG/Reparación valvulas distribuidora 18-05-26.pdf" },

    { img: "/REPARACIONESRG/gobernadoras.png", titulo: "REPARACIONES VÁLVULAS GOBERNADORAS Y SECADORAS",
       pdf: "/catalogos/AIRE/RG/Reparación valvulas gobernadoras y secadoras 18-05-26.pdf" },

    { img: "/REPARACIONESRG/niveladoras.png", titulo: "REPARACIONES VÁLVULAS NIVELADORAS", 
      pdf: "/catalogos/AIRE/RG/Reparación valvulas niveladoras 18-05-26.pdf" },

    { img: "/REPARACIONESRG/pedaleras.png", titulo: "REPARACIONES VÁLVULAS PEDALERAS",
       pdf: "/catalogos/AIRE/RG/Reparación valvula pedalera 18-05-26.pdf" },

    { img: "/REPARACIONESRG/protectoras.png", titulo: "REPARACIONES VÁLVULAS PROTECTORAS Y DE RETENCIÓN", 
      pdf: "/catalogos/AIRE/RG/Reparación valvulas protectora 18-05-26.pdf" },

    { img: "/REPARACIONESRG/relay.png", titulo: "REPARACIONES VÁLVULAS RELAY", 
      pdf: "/catalogos/AIRE/RG/Reparación valvulas relay 10-07-26.pdf" },

    { img: "/REPARACIONESRG/rcontrol.png", titulo: "REPARACIONES VÁLVULAS RELAY Y DE CONTROL", 
      pdf: "/catalogos/AIRE/RG/Reparación valvulas relay y control 15-05-26.pdf" },

    { img: "/REPARACIONESRG/sensibles.png", titulo: "REPARACIONES VÁLVULAS SENSIBLES A LA CARGA", 
      pdf: "/catalogos/AIRE/RG/Reparación valvula sensible a la carga 18-05-26.pdf" },

       { img: "/REPARACIONESRG/Descarga rapida2.png", titulo: "REPARACIONES VÁLVULAS DESCARGA RAPIDAS", 
      pdf: "/catalogos/AIRE/RG/Reparación descarga rapida 18-05-26.pdf" },
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
