"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Truck, Package, ArrowRight } from "lucide-react"
import Image from "next/image"

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Reparaciones",
      description:
        "Soluciones especializadas que garantizan la seguridad y durabilidad del transporte. Nuestro equipo técnico, con experiencia comprobada, ofrece confiabilidad y rapidez, adaptándose a tus necesidades.",
      features: [
        "Diagnóstico especializado",
        "Reparaciones integrales",
        "Mantenimiento preventivo",
        "Servicio de emergencia",
      ],
      image: "images/mecanico-1.avif",
    },
    {
      icon: Truck,
      title: "Venta de Semis",
      description:
        "Vehículos diseñados para optimizar tu operación, con atención personalizada para proyectos específicos.",
      features: [
        "Vehículos de alta calidad",
        "Asesoramiento personalizado",
        "Financiación disponible",
        "Garantía extendida",
      ],
      image: "/images/semi-1.avif",
    },
    {
      icon: Package,
      title: "Repuestos",
      description: "Catálogo amplio y asesoramiento técnico especializado para mantener tu flota en perfecto estado.",
      features: ["Amplio stock disponible", "Repuestos originales", "Asesoramiento técnico", "Entrega rápida"],
      image: "/truck-parts-warehouse.png",
    },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <section id="servicios" className="py-20 bg-muted flex justify-center">
      <div className="w-full max-w-6xl px-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-work-sans mb-6">Unidades de Negocio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones integrales para todas las necesidades del transporte
          </p>
        </motion.div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        <service.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-3xl font-work-sans">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-6 text-muted-foreground">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button onClick={scrollToContact} className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                      Más información
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-lg shadow-2xl"
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
