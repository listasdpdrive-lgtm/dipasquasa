"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const cards = [
  {
    title: "0 KM",
    href: "/concesionaria/KM0",
    description: "Unidades nuevas con garantía oficial",
    bg: "from-white via-blue-989 to-white",
    titleClass:
      "text-gray-900 font-extrabold tracking-wide text-3xl md:text-4xl drop-shadow-md",
    descClass:
      "text-gray-800 font-medium text-sm md:text-base drop-shadow-sm",
  },
  {
    title: "USADOS",
    href: "/concesionaria/usados",
    description: "Vehículos seleccionados y listos para trabajar",
    bg: "from-white via-blue-989 to-white",
    titleClass:
      "text-gray-900 font-extrabold tracking-wide text-3xl md:text-4xl drop-shadow-md",
    descClass:
      "text-gray-800 font-medium text-sm md:text-base drop-shadow-sm",
  },
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
      style={{ backgroundImage: "url('/fondo_web.png')" }}
    >
      {/* CONTENEDOR BOTÓN + LOGO */}
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

      <div className="relative z-10 max-w-5xl w-full text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Concesionaria
        </h1>

        <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          Elegí entre vehículos 0km y usados con respaldo, calidad y experiencia
          en el rubro.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`
                group relative w-full max-w-sm md:max-w-md h-56 md:h-64
                rounded-2xl overflow-hidden
                shadow-2xl transition-all duration-300
                hover:scale-105
                bg-gradient-to-br ${card.bg}
              `}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <h2 className={card.titleClass}>{card.title}</h2>
                <p className={`mt-2 ${card.descClass}`}>
                  {card.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_50px_rgba(255,255,255,0.15)]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
