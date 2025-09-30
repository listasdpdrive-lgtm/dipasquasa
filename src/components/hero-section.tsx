"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative h-max flex justify-center items-center overflow-hidden pt-24  md:pt-32 pb-20">
      <div className="max-w-6xl px-10 lg:px-0">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700/30 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-work-sans leading-tight tracking-tight mb-6 lg:mb-10"
          >
            Soluciones Integrales en{" "}
            <span className="text-primary bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-black">
              Transporte
            </span>{" "}
            {" "}
            <span className="text-primary bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-black">
              Pesado
            </span>
          </motion.h1>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-4"
>
              Venta de camiones y semirremolques         Repuestos y accesorios            Reparaciones y fabricacion
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-xl lg:text-3xl mb-5 text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium md:mb-10 "
          >
            Más de <span className="text-primary">60 años </span>
             siendo el <span className="text-white font-semibold">socio estratégico</span> de las empresas de transporte
            más importantes de Argentina.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-6 justify-center mb-4 md:mb-15 lg:mb-20"
          >
            <button
              onClick={scrollToContact}
              className="bg-red-600 text-white hover:bg-white hover:text-red-600 px-10 py-3 lg:py-5 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-102 shadow-xl flex items-center justify-center gap-3 cursor-pointer border-2 border-red-600 hover:border-red-600"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              Solicitar Presupuesto
            </button>
            <a
              href="https://wa.me/5492614663077?text=Hola, me interesa conocer más sobre sus servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600  px-10 py-3 lg:py-5 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-3 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              WhatsApp Directo
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
      </div>
    </section>
  )
}
