"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
const cards = [
  {
    title: "0 KILÓMETROS",
    href: "/concesionaria/KM0",
    image: "/concecionaria/acoplado.png",
    description: "Unidades nuevas con garantía oficial",
  },
  {
    title: "USADOS",
    href: "/concesionaria/usados",
    image: "/concecionaria/0km.png",
    description: "Vehículos seleccionados y listos para trabajar",
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
              className="
                group relative w-full max-w-sm md:max-w-md h-56 md:h-64
                rounded-2xl overflow-hidden
                shadow-2xl transition-transform duration-300 hover:scale-105
                border border-white/0
              "
            >
              {/* IMAGEN */}
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

              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

              {/* Contenido */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <h2 className="text-white text-2xl md:text-3xl font-semibold mb-2 drop-shadow-lg">
                  {card.title}
                </h2>

                <p className="text-gray-200 text-sm md:text-base opacity-90 drop-shadow">
                  {card.description}
                </p>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_40px_rgba(255,255,255,0.1)]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
