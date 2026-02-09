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
        "Soluciones especializadas que garantizan la seguridad y durabilidad. Nuestro equipo técnico, con experiencia comprobada, ofrece confiabilidad y rapidez, adaptándose a tus necesidades.",
      features: [
        "Diagnóstico especializado",
        "Reparaciones integrales",
        "Mantenimiento preventivo",
        "Servicio de emergencia",
      ],
      phoneText: "+54 9 261 491-0438",
      addressText: "concordia 51 Rodeo de la cruz, M5525, Mendoza",

      image: "/images/mecanico.png",
      whatsapp: "5491112345678",
      email: "dipasqua.salto@hotmail.com",
      location: "https://www.google.com/maps/place/Carrocer%C3%ADas+Di+Pasqua/@-32.9273735,-68.7366669,18.75z/data=!4m6!3m5!1s0x967e0d94d5390cc5:0x62cee180fcfc5166!8m2!3d-32.9273496!4d-68.7362663!16s%2Fg%2F11gg747rtq?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
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
      phoneText: "+54 9 261 363-5617",
      addressText: "Carril Rodriguez Peña Km 10.5, 5513 Maipú, Mendoza",
      image: "/images/semi-1.png",
      whatsapp: "54261365617",
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
      phoneText: "+54 9 261 466-3077",
      addressText: "Concordia 84 Rodeo de la cruz, 5525, Mendoza",
      image: "/truck-parts-warehouse.png",
      whatsapp: "542614663077",
      email: "dipasquarepuestos@gmail.com",
      location: "https://www.google.com/maps/place/Di+Pasqua+Repuestos/@-32.9278523,-68.7363742,18.25z/data=!4m6!3m5!1s0x967e0d94d64fa437:0x33d79dcaae872172!8m2!3d-32.9279133!4d-68.736165!16s%2Fg%2F11gg7490c7?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Unidades de Negocio
          </h2>
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
                      <CardTitle className="text-3xl">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-lg mb-6 text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

        
                  {/* CONTACTO */}
        
                      <div className="flex flex-col gap-3">
        
                  {/* BOTONES */}
               
                     <div className="flex flex-col sm:flex-row gap-4">
                     
                   {/* WHATSAPP */}
      
                     <Button
                     asChild
                       className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
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

                     {/* UBICACIÓN */}
                         <Button
                                asChild
                                variant="outline"
                                className="flex items-center gap-2"
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

                      
                        {/* MAIL TEXTO */}

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">

                  <Mail className="h-4 w-4" />
                    <a
                    href={`mailto:${service.email}?subject=${encodeURIComponent(
                     `Consulta sobre ${service.title}`
               
                    )}`}
                  className="underline hover:text-primary transition"
          >
                    {service.email}
                  </a>
               </div>
              </div>

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
                    src={service.image}
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
