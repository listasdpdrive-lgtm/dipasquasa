"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"



const cards = [
  {
    title: "Semirremolques y Acoplados",
    href: `/productos?estado=usado&tipo=${encodeURIComponent(
      "SEMIRREMOLQUE Y ACOPLADOS"
    )}`,
    image: "/concecionaria/semirremolque.png",
  },
  {
    title: "Camiones",
    href: `/productos?estado=usado&tipo=${encodeURIComponent("CAMIONES")}`,
    image: "/concecionaria/0km.png",
  },
]

export default function HomePage() {

const router = useRouter()


  return (



    
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
      style={{ backgroundImage: "url('/fondo_web.png')" }}
    >
      <button
      onClick={() => router.back()}
      className="
        fixed top-6 left-6 z-50
        flex items-center gap-2
        rounded-full
        bg-black/60 backdrop-blur
        px-4 py-2
        text-white text-sm font-medium
        border border-white/20
        shadow-lg
        transition-all
        hover:bg-black/80 hover:scale-105
      "
    >
      <ArrowLeft size={18} />
      Volver
    </button>
      {/* OVERLAY DEL FONDO */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-6xl w-full text-center">
        {/* TEXTO */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Vehículos Usados
        </h1>

        <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 px-2">
          Camiones, semirremolques y acoplados listos para trabajar.
          Calidad verificada y atención personalizada.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 place-items-center">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative w-full max-w-sm sm:max-w-md aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 sm:hover:scale-105"
            >
              {/* Imagen */}
              <Image
                             src={card.image}
                             alt={card.title}
                             fill
                             className="
                               object-cover
                               scale-110
                               blur-[2.5px]
                               transition-all duration-500
                               group-hover:blur-[2px]
                               group-hover:scale-105
                             "
                             priority
                           />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Texto */}
              <span className="relative z-10 flex items-center justify-center h-full text-center text-white text-xl sm:text-2xl md:text-3xl font-semibold px-4">
                {card.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
