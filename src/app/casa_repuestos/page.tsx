"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import { Footer } from "@/components/footer"

export default function CatalogosPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    { img: "/imagenes/accesorios.jpg", link: "/productos/accesorios", title: "Accesorios" },
    { img: "/image/Screenshot_3.jpg", link: "/productos/filtros", title: "Filtros" },
    { img: "/imagenes/neumaticos.jpg", link: "/productos/neumaticos", title: "Neumáticos" },
  ]

  const cuadros = [
    { img: "/accesorios.png", titulo: "ACCESORIOS", pdf: "/catalogos/ACCESORIOS/Accesorios  24-07-26.pdf" },
    { img: "/aire.png", titulo: "AIRE", link: "/Aire" },
    { img: "/image-cuadros/ast-pra.png", titulo: "AST-PRA", link: "/AST-PRA" },
    { img: "/buloneriaI.png", titulo: "BULONERÍA", link: "/Buloneria" },
    { img: "/image-cuadros/carrier-logo.png", titulo: "CARRIER", link: "/carrier" },
    { img: "/ELECTRICIDAD2.png", titulo: "ELECTRICIDAD", link: "/Electricidad" },
    { img: "/amarre.png", titulo: "ELEMENTOS DE AMARRE", link: "/Elemento_amarre" },
    { img: "/seguridad.png", titulo: "ELEMENTOS DE SEGURIDAD", pdf: "/catalogos/SEGURIDAD/Elementos de seguridad 11-07-26.pdf" },
    { img: "/filtros/filtrosportada.png", titulo: "FILTROS", link: "/filtros" },
    { img: "/frenos.png", titulo: "FRENOS", link: "/Frenos" },
    { img: "/herramientas/herramientas.png", titulo: "HERRAMIENTAS", pdf: "/catalogos/herramientas/Herramientas 06-07-26.pdf" },
    { img: "/puntaeje/punta_eje.png", titulo: "TREN DELANTERO Y PUNTA DE EJE", link: "/punta_eje" },
    { img: "/PESADOS-JPG/pesadito.png", titulo: "PESADOS", link: "/Pesados" },
    { img: "/varios.png", titulo: "ACCESORIOS VARIOS", link: "/Varios" },
    { img: "/image-cuadros/eevigis.png", titulo: "VIGIA", pdf: "/catalogos/Vigia 30-07-26.pdf" },
  ]

  useEffect(() => {7
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  }

  return (
    <div className="flex min-h-screen relative">
      {/* Fondo */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/fondo_web.png')", filter: "brightness(0.45)" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 to-black/70 z-0" />

      <Sidebar />

      <main className="flex-1 mt-20 relative z-10 px-6 pt-28">

        {/* ================== CUADROS MOBILE ================== */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6 mb-24 mt-5 md:hidden"
        >
          {cuadros.map((c, i) => {
            const Card = (
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <Image
                  src={c.img}
                  alt={c.titulo}
                  width={500}
                  height={500}
                  className="w-full h-45 object-cover"
                />
                <h3 className="bg-red-600 p-3 text-center font-bold text-base">
                  {c.titulo}
                </h3>
              </motion.div>
            )

            return c.pdf ? (
              <a key={i} href={c.pdf} target="_blank" rel="noopener noreferrer">
                {Card}
              </a>
            ) : (
              <Link key={i} href={c.link}>
                {Card}
              </Link>
            )
          })}
        </motion.div>

        {/* ================== CUADROS PC ================== */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:grid grid-cols-3 gap-8 mb-32 max-w-5xl mx-auto"
        >
          {cuadros.map((c, i) => {
            const Card = (
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <Image
                  src={c.img}
                  alt={c.titulo}
                  width={500}
                  height={500}
                  className="w-full h-55 object-cover"
                />
                <h3 className="bg-red-600 p-4 text-center font-bold text-lg">
                  {c.titulo}
                </h3>
              </motion.div>
              
            )

            return c.pdf ? (
              <a key={i} href={c.pdf} target="_blank" rel="noopener noreferrer">
                {Card}
              </a>
            ) : (
              <Link key={i} href={c.link}>
                {Card}
              </Link>
            )
          })}
        </motion.div>

      </main>
      

      
    </div>

  )
}


