"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Cpu, Award, Heart, Shield, Clock } from "lucide-react"

export function ValuePropositionSection() {
  const values = [
    {
      icon: Users,
      title: "Atención Personalizada",
      description:
        "Cada cliente recibe un servicio adaptado a sus necesidades específicas, con un equipo dedicado que comprende su negocio.",
    },
    {
      icon: Cpu,
      title: "Tecnología de Vanguardia",
      description:
        "Utilizamos las últimas tecnologías en diagnóstico y reparación para garantizar resultados precisos y eficientes.",
    },
    {
      icon: Award,
      title: "Calidad y Compromiso",
      description:
        "Nuestro compromiso con la excelencia se refleja en cada servicio, manteniendo los más altos estándares de calidad.",
    },
    {
      icon: Heart,
      title: "Cercanía y Confianza",
      description: "Te acompañamos en cada paso, construyendo relaciones duraderas basadas en la confianza mutua.",
    },
    {
      icon: Shield,
      title: "Garantía Total",
      description:
        "Respaldamos todos nuestros servicios con garantías sólidas que te brindan tranquilidad y seguridad.",
    },
    {
      icon: Clock,
      title: "Respuesta Rápida",
      description:
        "Entendemos la urgencia de tu negocio. Ofrecemos tiempos de respuesta ágiles para minimizar el tiempo de inactividad.",
    },
  ]

  return (
    <section className="py-20 text-white bg-slate-900 flex justify-center">
      <div className="w-full max-w-6xl px-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-work-sans mb-6">Soluciones Integradas</h2>
          <p className="text-xl max-w-4xl mx-auto opacity-90">
            En Di Pasqua, no solo vendemos y reparamos vehículos: creamos soluciones a medida, cercanas y orientadas a
            potenciar tu negocio y tu ciudad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <value.icon className="h-16 w-16 mx-auto mb-6 text-white" />
                  <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
