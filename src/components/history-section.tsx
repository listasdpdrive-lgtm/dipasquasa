"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export function HistorySection() {
  const milestones = [
    {
      year: "1961",
      title: "Fundación",
      description: "Inicio de operaciones como taller de reparación ",
    },
    {
      year: "1980",
      title: "Expansión",
      description: "Ampliación del taller",
    },
     {
      year: "1994",
      title: "Expansión",
      description: "Nos extendimos en el rubro con una consecion de Salto",
    },
    {
      year: "1995",
      title: "Modernización",
      description: "Implementación de tecnología avanzada en diagnóstico",
    },
      {
      year: "2001",
      title: "conseccion ATS-PRA",
      description: " nos ampliamos a la venta de furgones termicos con una marca de primera calidad ",
    },
     {
      year: "2007",
      title: "Crecimiento",
      description: "nos incorporamos en la venta de carriers",
    },
    {
      year: "2010",
      title: "Crecimiento",
      description: "Apertura de nueva sede y venta de vehículos comerciales",
    },
    {
      year: "2018",
      title: "Crecimiento",
      description: " Se incorpora como una nueva actividad la venta de repuestos para camiones y semirremolques",
    },
    {
      year: "2025",
      title: "Liderazgo",
      description: "60 años siendo referentes en soluciones de transporte",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br flex justify-center from-gray-50 to-white">
      <div className="w-full max-w-6xl px-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-work-sans mb-6">
            Nuestra Historia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un recorrido de seis décadas construyendo confianza y excelencia en el sector del transporte
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-600 md:transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center relative ${index % 2 === 0 ? "md:flex-row flex-row" : "md:flex-row-reverse flex-row"
                  }`}
              >
                {/* Content Card - Mobile: always right, Desktop: alternating */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-102">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-6 w-6 text-red-600" />
                      <span className="text-3xl font-black text-red-600 font-work-sans">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-work-sans">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg z-10 md:transform md:-translate-x-1/2 transform -translate-x-1/2">
                  <div className="w-full h-full bg-red-600 rounded-full animate-pulse"></div>
                </div>

                {/* Spacer for desktop alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Timeline End Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-8 md:left-1/2 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg md:transform md:-translate-x-1/2 transform -translate-x-1/2"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
