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
  Phone,
} from "lucide-react"
import Image from "next/image"

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Reparaciones",
      description:
        "Soluciones especializadas que garantizan la seguridad y durabilidad. Nuestro equipo técnico ofrece confiabilidad y rapidez.",
      features: [
        "Diagnóstico especializado",
        "Reparaciones integrales",
        "Mantenimiento preventivo",
        "Servicio de emergencia",
      ],
      phoneFijo: "+54 261 491-0438",
      phoneWhatsapp: "+54 9 2615 58-0350",
      whatsapp: "5492615580350",
      addressText: "Concordia 51, Rodeo de la Cruz, Mendoza",
      image: "/images/mecanico.png",
      email: "dipasqua.salto@hotmail.com",
      location:
        "https://www.google.com/maps/place/Carrocer%C3%ADas+Di+Pasqua",
    },
    {
      icon: Truck,
      title: "Venta de Semis",
      description:
        "Vehículos diseñados para optimizar tu operación, con atención personalizada.",
      features: [
        "Vehículos de alta calidad",
        "Asesoramiento personalizado",
        "Financiación disponible",
        "Garantía extendida",
      ],
      phoneWhatsapp: "+54 9 261 363-5617",
      whatsapp: "5492613635617",
      addressText: "Carril Rodríguez Peña Km 10.5, Maipú, Mendoza",
      image: "/images/semi-1.png",
      email: "dipasqua.ventas@gmail.com",
      location: "https://maps.google.com/?q=Dipasqua+Venta+Semis",
    },
    {
      icon: Package,
      title: "Repuestos",
      description:
        "Catálogo amplio y asesoramiento técnico especializado para mantener tu flota en perfecto estado.",
      features: [
        "Amplio stock disponible",
        "Repuestos originales",
        "Asesoramiento técnico",
        "Entrega rápida",
      ],
      phoneWhatsapp: "+54 9 261 466-3077",
      whatsapp: "5492614663077",
      addressText: "Concordia 84, Rodeo de la Cruz, Mendoza",
      image: "/truck-parts-warehouse.png",
      email: "dipasquarepuestos@gmail.com",
      location:
        "https://www.google.com/maps/place/Di+Pasqua+Repuestos",
    },
  ]

  return (
    <section id="servicios" className="py-20 bg-muted flex justify-center">
      <div className="w-full max-w-6xl px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Unidades de Negocio</h2>
          <p className="text-muted-foreground text-lg">
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
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* TELÉFONOS */}
                  <div className="space-y-2">
                    {service.phoneFijo && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">Fijo:</span>
                        <a
                          href={`tel:${service.phoneFijo.replace(/\s|-/g, "")}`}
                          className="underline hover:text-primary"
                        >
                          {service.phoneFijo}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                      <Phone className="h-4 w-4" />
                      <span>WhatsApp:</span>
                      <a
                        href={`https://wa.me/${service.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-green-800"
                      >
                        {service.phoneWhatsapp}
                      </a>
                    </div>
                  </div>

                  {/* DIRECCIÓN */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {service.addressText}
                  </div>

                  {/* BOTONES */}
                  <div className="flex flex-wrap gap-4">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a
                        href={`https://wa.me/${service.whatsapp}?text=${encodeURIComponent(
                          `Hola, quiero consultar sobre ${service.title}`
                        )}`}
                        target="_blank"
                      >
                        WhatsApp
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>

                    <Button asChild variant="outline">
                      <a
                        href={service.location}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ubicación
                        <MapPin className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                  {/* MAIL */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${service.email}`}
                      className="underline hover:text-primary"
                    >
                      {service.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`overflow-hidden rounded-lg shadow-xl ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
