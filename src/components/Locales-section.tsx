"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LocalesSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-[1400px] mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Nuestros Locales
        </motion.h2>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Conocé nuestros locales y servicios pensados para acompañarte en cada
          etapa.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              href: "/casa_repuestos",
              img: "/CASA REPUESTOS.jpg",
              title: "Casa de Repuestos",
              text: "Amplia variedad de repuestos"
            },
            {
              href: "/Taller",
              img: "/images/mecanico.png",
              title: "Taller",
              text: "Servicio mecánico especializado"
            },
            {
              href: "/concesionaria",
              img: "/locales/concesionaria.jpeg",
              title: "Concesionaria",
              text: "Venta de vehículos"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href={item.href}>
                <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                    <p className="text-white/80 mb-4">{item.text}</p>
                    <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm">
                      Ver más <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
