"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"


const cards = [
  {
    title: "",
    href: `/productos?estado=0km&tipo=${encodeURIComponent("SALTO")}`,
    image: "/concecionaria/SALTO.png",
  },
  {
    title: "",
    href: `/productos?estado=0km&tipo=${encodeURIComponent("AST PRA")}`,
    image: "/concecionaria/AST-PRA.png",
  },
  {
    title: "",
    href: `/productos?estado=0km&tipo=${encodeURIComponent("CARRIER")}`,
    image: "/concecionaria/CARRIER.png",
  },
]

export default function HomePage() {

const router = useRouter()

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
      style={{ backgroundImage: "url('/fondo_web.png')" }}
    >
   <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
        
        {/* BOTÓN VOLVER */}
        <button
          onClick={() => router.back()}
          className="
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

        {/* LOGO */}
        <Link
          href="/"
          className="
           
          "
        >
          <Image
            src="/images/fondog.jpg" 
            alt="Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </Link>
      </div>
      {/* Overlay fondo */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl w-full text-center">
        {/* TEXTO */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Vehículos 0km
        </h1>

        <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 px-2">
          Unidades nuevas listas para trabajar con garantía y respaldo oficial.
        </p>

        {/* CARDS — EXACTO AL SEGUNDO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 place-items-center lg:grid-cols-3">
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
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Texto — MISMO que el segundo */}
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
