"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle, ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

const normalizar = (v: string) =>
  v.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim()

export function TopBar() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tiposActivos =
    searchParams
      .get("tipo")
      ?.split(",")
      .map(normalizar) || []

  const cuadros = [
        { img: "/concecionaria/SALTO.png", title: "SALTO", tipo: "SALTO" },
    { img: "/concecionaria/AST-PRA.png", title: "AST-PRA", tipo: "AST PRA" },
    { img: "/concecionaria/CARRIER.png", title: "CARRIER", tipo: "CARRIER" },

    { img: "/concecionaria/CAMIONES.png", title: "CAMIONES USADOS", tipo: "CAMIONES" },
    {
      img: "/concecionaria/camion5.jpg",
      title: "SEMIRREMOLQUE Y ACOPLADOS USADOS  ",
      tipo: "SEMIRREMOLQUE Y ACOPLADOS",
    },
  ]

  const whatsappUrl =
    "https://wa.me/5491112345678?text=Hola%20quiero%20más%20información"

  const mapsUrl =
    "https://www.google.com/maps/place/Di+Pasqua+semirremolques+y+camiones"

  return (
    <>
      {/* 🔝 BARRA SUPERIOR */}
      <div className="relative w-full h-28 sm:h-36">
        <Image
          src="/TALLER/fondo_web.png"
          alt="Fondo barra superior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid grid-cols-3 items-center text-white text-xs sm:text-sm">
          
         {/* ⬅️ BOTÓN VOLVER AL INICIO */}
<div className="flex items-center">
  <button
    onClick={() => router.push("/concesionaria")}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full
               bg-white/90 text-gray-800 hover:bg-white transition"
  >
    <ArrowLeft size={16} />
    <span className="hidden sm:inline">VOLVER</span>
  </button>
</div>


          {/* 🖼 LOGO CENTRADO 
          <div className="flex justify-center h-40">
            <Image
              src="/logo-1.png"   // 👈 cambia por tu logo real
              alt="Logo"
              width={620}
              height={400}
              className="object-contain"
            />
          </div>
*/}
       
          
        </div>
      </div>

      {/* 🟥 CUADROS FILTRO */}
      <div className="max-w-7xl mx-auto px-2 -mt-8 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-5 gap-2 sm:gap-6">
          {cuadros.map((c, i) => {
            const tipoNormalizado = normalizar(c.tipo)
            const activo = tiposActivos.includes(tipoNormalizado)

            const esUsado =
              tipoNormalizado === "camiones" ||
              tipoNormalizado === "semirremolque y acoplados"

            const params = new URLSearchParams()
            params.set("estado", esUsado ? "usado" : "0km")
            params.set("tipo", tipoNormalizado)

            return (
              <Link
                key={i}
                href={`/productos?${params.toString()}`}
                className={`
                  relative rounded-lg overflow-hidden transition-all
                  ${
                    activo
                      ? "border-2 border-red-600 scale-105 shadow-xl"
                      : "bg-white shadow-md hover:scale-105"
                  }
                `}
              >
                {/* imagen compacta en móvil */}
                <div className="relative h-16 sm:h-28 md:h-32">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* texto compacto */}
                <div className="p-1 sm:p-3 text-center font-semibold text-gray-800 text-[10px] sm:text-sm leading-tight line-clamp-2">
                  {c.title}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      
    </>
  )
}
