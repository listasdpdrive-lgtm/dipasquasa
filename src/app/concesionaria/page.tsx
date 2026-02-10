"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const cards = [
  {
    title: "0 KM",
    href: "/concesionaria/KM0",
    description: "Unidades nuevas con garantía oficial",
    bg: "from-blue-600 via-blue-700 to-blue-900",
  },
  {
    title: "USADOS",
    href: "/concesionaria/usados",
    description: "Vehículos seleccionados y listos para trabajar",
    bg:"from-blue-600 via-blue-700 to-blue-900",}
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6"
      style={{ backgroundImage: "url('/fondo_web.png')" }}
    >
      {/* BOTÓN VOLVER */}
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

      {/* Overlay fondo */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-5xl w-full text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Concesionaria
        </h1>

        <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-14 px-2">
          Elegí entre vehículos 0km y usados con respaldo, calidad y experiencia
          en el rubro.
        </p>

        {/* CARDS */}
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
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

              {/* Contenido */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                  {card.title}
                </h2>

                <p className="text-white/90 text-sm md:text-base drop-shadow">
                  {card.description}
                </p>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_50px_rgba(255,255,255,0.15)]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

