"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wrench,
  Truck,
  Package,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react"
import Image from "next/image"

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Reparaciones",
      description:
        "Soluciones especializadas que garantizan seguridad y durabilidad con un equipo técnico experimentado.",
      features: [
        "Diagnóstico especializado",
        "Reparaciones integrales",
        "Mantenimiento preventivo",
        "Servicio de emergencia",
      ],
      image: "/images/mecanico.png",
      whatsapp: "5491112345678",
      email: "dipasquarepuestos@gmail.com",
      location:
         "https://maps.app.goo.gl/i19T2ZJYjrGBqsNs7",
    },
    {
      icon: Truck,
      title: "Venta de Semis",
      description:
        "Vehículos diseñados para optimizar tu operación con asesoramiento personalizado.",
      features: [
        "Vehículos de calidad",
        "Asesoramiento personalizado",
        "Financiación disponible",
        "Garantía extendida",
      ],
      image: "/images/semi-1.png",
      whatsapp: "54261365617",
      email: "ventas@tudominio.com",
      location: "https://maps.google.com/?q=Dipasqua+Venta+Semis",
    },
    {
      icon: Package,
      title: "Repuestos",
      description:
        "Amplio catálogo de repuestos con asesoramiento técnico especializado.",
      features: [
        "Stock disponible",
        "Repuestos originales",
        "Asesoramiento técnico",
        "Entrega rápida",
      ],
      image: "/truck-parts-warehouse.png",
      whatsapp: "542614663077",
      email: "repuestos@tudominio.com",
      location:
        "https://maps.app.goo.gl/PWMJzdhJhMcTqEWu7",
    },
  ]

  return (
    
    <section id="servicios" className="relative py-10 md:py-14 flex justify-center overflow-hidden">

  {/* Imagen de fondo */}
  <Image
    src="/Fondo_Inicios/fondo servicios.png" 
    alt="Fondo"
    fill
    className="object-cover opacity-200"
    priority
  />

  {/* Capa oscura opcional */}
  <div className="absolute inset-0 bg-background/80" />
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
            Unidades de Negocio
          </h2>

          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales para el transporte
          </p>
        </motion.div>

        <div className="space-y-10 md:space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >

              {/* TEXTO */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <Card className="shadow-md md:shadow-none">
                  <CardHeader className="pb-2 md:pb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <service.icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>

                      <CardTitle className="text-xl md:text-2xl">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-5 text-sm">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-3">

                      <div className="flex flex-col sm:flex-row gap-3">

                        <Button
                          asChild
                          size="sm"
                          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                        >
                          <a
                            href={`https://wa.me/${service.whatsapp}?text=${encodeURIComponent(
                              `Hola, quiero consultar sobre ${service.title}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>

                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <a
                            href={service.location}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ubicación
                            <MapPin className="h-4 w-4" />
                          </a>
                        </Button>

                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <a
                          href={`mailto:${service.email}`}
                          className="underline hover:text-primary transition break-all"
                        >
                          {service.email}
                        </a>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* IMAGEN */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-lg shadow-lg md:shadow-xl"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
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