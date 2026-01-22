"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LocalesSection() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[1400px] px-4 md:px-6 xl:px-8 py-12 mx-auto">

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-4 text-center"
        >
          Nuestros Locales
        </motion.h2>

        {/* Texto */}
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Conocé nuestros locales y servicios pensados para acompañarte en cada
          etapa, con atención personalizada y experiencia en el rubro.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CUADRO 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/casa_repuestos">
              <div className="group relative h-[320px] lg:h-[480px] rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">

                <Image
                  src="/CASA REPUESTOS.jpg"
                  alt="Casa de Repuestos"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <h3 className="text-white text-2xl font-bold">
                    Casa de Repuestos
                  </h3>
                  <p className="text-white/90 text-sm mt-1 mb-4">
                    Amplia variedad de repuestos y atención personalizada
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-red-500/40 hover:bg-red-700 transition-all"
                  >
                    Ver más <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CUADRO 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/Taller">
              <div className="group relative h-[320px] lg:h-[480px] rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">

                <Image
                  src="/images/mecanico.png"
                  alt="Taller"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <h3 className="text-white text-2xl font-bold">Taller</h3>
                  <p className="text-white/90 text-sm mt-1 mb-4">
                    Servicio mecánico especializado y mantenimiento integral
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-red-500/40 hover:bg-red-700 transition-all"
                  >
                    Ver más <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CUADRO 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/concesionaria">
              <div className="group relative h-[320px] lg:h-[480px] rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">

                <Image
                  src="/locales/concesionaria.jpeg"
                  alt="Concesionaria"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <h3 className="text-white text-2xl font-bold">
                    Concesionaria
                  </h3>
                  <p className="text-white/90 text-sm mt-1 mb-4">
                    Venta de vehículos y asesoramiento personalizado
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-red-500/40 hover:bg-red-700 transition-all"
                  >
                    Ver más <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
