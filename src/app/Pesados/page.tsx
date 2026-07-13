"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { link } from "fs"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/PESADOS-JPG/abrazaderascurva.jpg",
      titulo: "ABRAZADERAS Y TUERCAS ALTAS",
      link: "/Pesados/ABRAZADERAS-Y-TUERCAS-ALTAS",
    },
    {
      img: "/PESADOS-JPG/arandelasminiatura.png",
      titulo: "ARANDELAS",
      link: "/Pesados/arandelas",
    },
    {
      img: "/PESADOS-JPG/amortiguador.png",
      titulo: "AMORTIGUADORES Y ESTABILIZADORES",
      pdf: "catalogos/PESADOS/Amortiguadores y estabalizadores 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/balancin_y_manota.png",
      titulo: "BALANCINES Y MANOTAS",
      link: "/Pesados/BALANCINES-Y-MANOTAS",
    },
     {
      img: "/PESADOS-JPG/bajada.png",
      titulo: "BAJADA DE PARAGOLPE Y RESORTE",
      pdf: "/catalogos/PESADOS/bbbgs/Bajada paragolpe 22-05-26.pdf",
    },
     {
      img: "/PESADOS-JPG/guardabarro_y_barrero.png",
      titulo: "BARREROS,BAJO PARAGOLPE,GUARDABARROS Y BAJADA ",
      link: "/Pesados/bbbgs",
    },{
      img: "/PESADOS-JPG/bujes.png",
      titulo: "BUJES",
      link: "/Pesados/BUJES",
    },{
      img: "/buloneria/pito.png",
      titulo: "CENTRO ELASTICO",
      pdf: "catalogos/PESADOS/Centro de elastico 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/arogiratorios.png",
      titulo: "AROS GIRATORIOS",
      pdf: "/catalogos/PESADOS/aros/Aros giratorios 22-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/ejes.png",
      titulo: "EJES",
      pdf: "/catalogos/PESADOS/Ejes y tubos 03-07-26.pdf",
    },
    {
      img: "/PESADOS-JPG/enganche_y_patas.png",
      titulo: "ENGANCHES Y PATAS DE APOYO",
      link: "/Pesados/ENGANCHES",
    },{
      img: "/PESADOS-JPG/faja.png",
      titulo: "FAJAS SUSPENSIÓN NEUMATICA",
      pdf: "/catalogos/PESADOS/Fajas suspensión neumatica 21-25-26.pdf",
    },{
      img: "/PESADOS-JPG/fuelles.png",
      titulo: "FUELLES",
      link: "/Pesados/FUELLES",
    },{
      img: "/PESADOS-JPG/grampas.png",
      titulo: "GRAMPAS ARTILLERAS",
      pdf: "catalogos/PESADOS/Grampas artilleras 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/mazasycampana.png",
      titulo: "MAZAS, CAMPANAS Y GUARDA POLVOS",
      link: "/Pesados/mazas",
    },{
      img: "/PESADOS-JPG/herrajes.png",
      titulo: "HERRAJES, BARANDAS, CAJONES Y ESCALERAS",
      link: "/Pesados/herrajes",
    },{
      img: "/PESADOS-JPG/hojas.png",
      titulo: "HOJAS ELASTICO Y PAQUETES DE SUSPENSIÓN",
      link: "/Pesados/hojas",
    },{
      img: "/PESADOS-JPG/llantas.png",
      titulo: "LLANTAS Y COMPONENTES",
      link: "/Pesados/LLANTAS1",
    },
    {
      img: "/PESADOS-JPG/pernos.png",
      titulo: "PERNOS",
      link: "/Pesados/PERNOS",
    },
    {
      img: "/PESADOS-JPG/piña_portacontenedor.png",
      titulo: "PIÑAS PORTACONTENEDOR",
      pdf: "/catalogos/PESADOS/Piña y portapiña 21-05-26.pdf",
    },{
      img: "/PESADOS-JPG/chapinete.png",
      titulo: "PLAQUETAS Y CHAPINETES",
      pdf: "/catalogos/PESADOS/Chapinetes 21-05-26.pdf",
    },{
      img: "/PESADOS-JPG/repuestos batea.png",
      titulo: "REPUESTOS PARA BATEA",
      pdf: "/catalogos/PESADOS/Repuestos para batea 13-07-26.pdf",
    },
    {
      img: "/PESADOS-JPG/repuestos_carreton.png",
      titulo: "REPUESTOS PARA CARRETON",
      pdf: "/catalogos/PESADOS/Repuestos para carreton 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/portaauxilio.png",
      titulo: "PORTA AUXILIO MALACATE Y SOPORTE",
      pdf: "/catalogos/PESADOS/Porta auxilio-malacate y soporte 21-05-26.pdf",
    }
    ,{
      img: "/PESADOS-JPG/ryp.png",
      titulo: "RETENES Y PORTARETENES",
      link: "/Pesados/RETENES",
    },{
      img: "/PESADOS-JPG/rulemanes.png",
      titulo: "RULEMANES",
      pdf: "/catalogos/PESADOS/Rulemanes 11-06-26.pdf",
    },{
      img: "/PESADOS-JPG/separadores.png",
      titulo: "SEPARADORES ARTILLEROS",
      pdf: "catalogos/PESADOS/Separadores de llantas 21-05-26.pdf",
    },{
      img: "/PESADOS-JPG/taco_paragolpe.png",
      titulo: "TACOS PARAGOLPES",
      pdf: "/catalogos/PESADOS/Tacos paragolpe 21-05-26.pdf",
    },{
      img: "/PESADOS-JPG/tazas_etc.png",
      titulo: "TAZAS,JUNTAS,TAPON Y LLAVE DE RUEDA",
      link: "/Pesados/TAZAS",
    },{
      img: "/PESADOS-JPG/tensores.png",
      titulo: "TENSORES ",
      pdf: "/catalogos/PESADOS/Tensores 21-05-26.pdf",
    },{
      img: "/PESADOS-JPG/tuercas.png",
      titulo: "TUERCAS Y ARANDELAS PUNTA DE EJE",
      link: "/Pesados/puntaeje",
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
          <div className="grid grid-cols-2 md:grid-cols-4 mt-20 gap-6 md:gap-8">
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

