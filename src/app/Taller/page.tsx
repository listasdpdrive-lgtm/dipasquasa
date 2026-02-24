"use client"

import Image from "next/image"
import Link from "next/link"
import { Wrench, Clock, Phone, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

function AutoCarousel() {
  const images = [
    "/TALLER/taller foto aerea.jpeg",
    "/TALLER/taller frontal.jpeg",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-xl">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Taller ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  )
}

export default function TallerMecanicoClient() {
  return (
    <main className="min-h-screen bg-gray-100 pt-20">

      {/* HEADER FIJO */}
      <header className="fixed top-0 left-0 w-full bg-white text-gray-900 py-4 px-6 shadow-md z-50 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Image
              src="/TALLER/logo.png"
              alt="Logo Taller"
              width={150}
              height={150}
              className="object-contain"
            />
           
          </Link>
        </div>
      </header>

      {/* BOTÓN FLOTANTE */}
      <a
        href="https://wa.me/5492615580350?text=Hola,%20quiero%20pedir%20un%20turno"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full shadow-xl z-50 font-semibold transition-transform hover:scale-105"
      >
        WhatsApp
      </a>

      {/* HERO */}
      <section className="relative text-white py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Taller Metalúrgico en Mendoza
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8">
            • Diagnóstico preciso • Experiencia que nos avala • Servicio Confiable
          </p>

          <Button
            asChild
            className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg shadow-red-600/40"
          >
            <a
              href="https://wa.me/5492615580350?text=Hola,%20quiero%20pedir%20un%20turno"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir Turno Ahora
            </a>
          </Button>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Wrench,
                title: "Metalúrgica General",
                desc: "Diagnóstico y reparación completa del vehículo.",
              },
              {
              icon: Clock,
              title: "Service Rápido",
              desc: "Servicios en el transcurso del dia.",
            },
              {
                icon: Phone,
                title: "Atención Personalizada",
                desc: "Asesoramiento claro, honesto y profesional.",
              },
              {
                icon: Truck,
                title: "Repuestos de Calidad",
                desc: "Repuestos originales y de alta calidad.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center hover:-translate-y-2"
              >
                <service.icon className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Nuestro Taller
          </h2>
          <AutoCarousel />
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Contactanos
          </h2>

          <p className="text-gray-300 mb-2">
            📍 Concordia 51, Rodeo de la Cruz, Mendoza
          </p>

          <p className="text-gray-300 mb-4">
            📞 +54 261 491-0438
          </p>

          <p className="text-gray-300 mb-8 flex items-center justify-center gap-2">
            <FaWhatsapp className="text-green-500 text-xl" />
            <a
              href="https://wa.me/5492615580350"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              +54 9 2615 58-0350
            </a>
          </p>

          <Button asChild variant="secondary" className="text-lg px-6 py-6">
            <a
              href="https://wa.me/5492615580350"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribinos por WhatsApp
            </a>
          </Button>
        </div>
      </section>

    </main>
  )

}

