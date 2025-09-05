"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function BrandsSection() {
  const clients = [
    { name: "Cliente 1", logo: "/generic-truck-logo.png" },
    { name: "Cliente 2", logo: "/automotive-parts-logo.png" },
    { name: "Cliente 3", logo: "/transport-company-logo.png" },
    { name: "Cliente 4", logo: "/generic-vehicle-logo.png" },
    { name: "Cliente 5", logo: "/truck-parts-supplier-logo.png" },
    { name: "Cliente 6", logo: "/automotive-service-logo.png" },
  ]

  return (
    <section id="marcas" className="py-20 bg-background flex justify-center">
      <div className="max-w-6xl px-10 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-work-sans mb-6">Nuestros Clientes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empresas líderes que confían en nuestra experiencia y calidad de servicio para sus operaciones de
            transporte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={200}
                height={200}
                id="image"
                className="max-w-full max-h-16 object-cover "
                priority={index < 3}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
