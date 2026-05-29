"use client"

import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { link } from "fs"

export default function Accesorios() {
  const cuadros = [
    {
      img: "/PESADOS-JPG/abrazaderascurva.jpg",
      titulo: "Abrazaderas y tuercas altas",
      link: "/Pesados/ABRAZADERAS-Y-TUERCAS-ALTAS",
    },
    {
      img: "/PESADOS-JPG/arandelas.png",
      titulo: "Arandelas",
      link: "/Pesados/arandelas",
    },
    {
      img: "/PESADOS-JPG/amortiguador.png",
      titulo: "Amortiguadores y estabilizadores",
      pdf: "catalogos/PESADOS/Amortiguadores y estabalizadores 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/balancin_y_manota.png",
      titulo: "Balancin y manotas",
      link: "/Pesados/BALANCINES-Y-MANOTAS",
    },
     {
      img: "/PESADOS-JPG/bajada.png",
      titulo: "Bajada de paragolpe y resorte",
      pdf: "/catalogos/PESADOS/bbbgs/Bajada paragolpe 22-05-26.pdf",
    },
     {
      img: "/PESADOS-JPG/guardabarro_y_barrero.png",
      titulo: "Barreros, Bajo paragolpes, guardabarros y bajadas ",
      link: "/Pesados/bbbgs",
    },{
      img: "/PESADOS-JPG/bujes.png",
      titulo: "Bujes",
      link: "/Pesados/BUJES",
    },{
      img: "/buloneria/pito.png",
      titulo: "Centro Elastico",
      pdf: "catalogos/PESADOS/Centro de elastico 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/arogiratorios.png",
      titulo: "Aros giratorios",
      pdf: "/catalogos/PESADOS/aros/Aros giratorios 22-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/enganche_y_patas.png",
      titulo: "Enganches y patas de apoyo",
      link: "/Pesados/ENGANCHES",
    },{
      img: "/PESADOS-JPG/faja.png",
      titulo: "Fajas de suspension neumatica",
      pdf: "/catalogos/PESADOS/Fajas suspensión neumatica 21-25-26.pdf",
    },{
      img: "/PESADOS-JPG/fuelles.png",
      titulo: "Fuelles",
      link: "/Pesados/FUELLES",
    },{
      img: "/PESADOS-JPG/grampas.png",
      titulo: "Grampas artilleras",
      pdf: "catalogos/PESADOS/Grampas artilleras 21-05-26.pdf",
    },
    {
      img: "/PESADOS-JPG/mazasycampana.png",
      titulo: "Mazas, Campanas y Guarda polvos",
      link: "/Pesados/mazas",
    },{
      img: "/PESADOS-JPG/herrajes.png",
      titulo: "Herrajes, barandas, cajones y escaleras",
      link: "/Pesados/herrajes",
    },{
      img: "/PESADOS-JPG/hojas.png",
      titulo: "Hojas elastico y paquetes de suspension",
      link: "/Pesados/hojas",
    },{
      img: "/PESADOS-JPG/llantas.png",
      titulo: "Llantas y componentes",
      link: "/Pesados/LLANTAS1",
    },
    {
      img: "/PESADOS-JPG/pernos.png",
      titulo: "Pernos",
      link: "/Pesados/PERNOS",
    },
    {
      img: "/PESADOS-JPG/piña_portacontenedor.png",
      titulo: "Piña portacontenedores",
      pdf: "/catalogos/PESADOS/Piña y portapiña 21-05-26.pdf",
    },{
      img: "/PESADOS-JPG/chapinete.png",
      titulo: "Plaquetas y chapínetes",
      pdf: "/catalogos/PESADOS/PLAQUETAS Y CHAPINETES ACTUALIZADO (1).pdf",
    },{
      img: "/PESADOS-JPG/repuestos batea.png",
      titulo: "Repuestos para batea",
      pdf: "/catalogos/PESADOS/REPUESTOS PARA BATEA.pdf",
    },
    {
      img: "/PESADOS-JPG/repuestos_carreton.png",
      titulo: "Repuestos para carreton",
      pdf: "/catalogos/PESADOS/REPUESTOS PARA CARRETON.pdf",
    },
    {
      img: "/PESADOS-JPG/portaauxilio.png",
      titulo: "Porta auxilio malacate y soporte",
      pdf: "/catalogos/PESADOS/PORTA AUXILIO MALACATE Y SOPORTE.pdf",
    }
    ,{
      img: "/PESADOS-JPG/ryp.png",
      titulo: "Retenes y portarretenes",
      link: "/Pesados/RETENES",
    },{
      img: "/PESADOS-JPG/rulemanes.png",
      titulo: "Rulemanes",
      pdf: "/catalogos/PESADOS/RULEMANES.pdf",
    },{
      img: "/PESADOS-JPG/separadores.png",
      titulo: "Separadores artilleros",
      pdf: "catalogos/PESADOS/SEPARADORES DE LLANTAS.pdf",
    },{
      img: "/PESADOS-JPG/taco_paragolpe.png",
      titulo: "Tacos paragolpes ",
      pdf: "/catalogos/PESADOS/TACOS PARAGOLPE.pdf",
    },{
      img: "/PESADOS-JPG/tazas_etc.png",
      titulo: "Tazas,juntas,tapon y llave de rueda",
      link: "/Pesados/TAZAS",
    },{
      img: "/PESADOS-JPG/tensores.png",
      titulo: "Tensores ",
      pdf: "/catalogos/PESADOS/TENSORES.pdf",
    },{
      img: "/PESADOS-JPG/tuercas.png",
      titulo: "Tuercas y Arandelas punta eje",
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

