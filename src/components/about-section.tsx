"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Lightbulb, Heart, Shield, Target, Eye } from "lucide-react"

export function AboutSection() {
  const timeline = [
    { year: "1960", title: "Fundación", desc: "Inicio con visión de futuro en el sector del transporte" },
    { year: "1980", title: "Expansión", desc: "Nuevas instalaciones y crecimiento del equipo" },
    { year: "2000", title: "Tecnología", desc: "Incorporación de tecnología y servicios integrales" },
    { year: "2025", title: "Liderazgo", desc: "Consolidación como marca referente en el sector" },
  ]

  const values = [
    { icon: Shield, title: "Confianza", desc: "Respaldo sólido en cada servicio" },
    { icon: Lightbulb, title: "Innovación", desc: "Tecnología de vanguardia" },
    { icon: Award, title: "Compromiso", desc: "Dedicación total a la excelencia" },
    { icon: Heart, title: "Cercanía", desc: "Atención personalizada" },
    { icon: Users, title: "Calidad", desc: "Estándares superiores" },
  ]

  return (
    <section id="nosotros" className="py-20 bg-red-600 flex justify-center">
      <div className="w-full max-w-6xl px-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-work-sans mb-6 text-white">
            Di Pasqua, más de 60 años de historia respaldando a quienes mueven Argentina
          </h2>
          <p className="text-xl max-w-4xl mx-auto text-white">
            Desde nuestros inicios en 1961, hemos crecido y evolucionado, manteniendo nuestra esencia de ofrecer
            soluciones confiables y de calidad en la reparación y venta de vehículos para transporte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-5">
          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold font-work-sans text-primary">Misión</h3>
                </div>
                <p className="text-lg mb-8">
                  Somos una empresa argentina fundada en 1961 dedicada a brindar soluciones integrales al transporte pesado. Ofrecemos venta de camiones y semirremolques, repuestos y servicios de reparaciones metalúrgicas, con el objetivo de asegurar a nuestros clientes calidad, confianza y continuidad en el camino.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold font-work-sans text-primary">Visión</h3>
                </div>
                <p className="text-lg">
                  Ser la marca líder en soluciones integrales para el transporte en Argentina, reconocida por su
                  innovación y confianza.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-work-sans mb-8 text-center text-white">Nuestros Valores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`text-center p-4 text-white ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <value.icon className="h-12 w-12 mx-auto mb-3 text-white" />
                  <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                  <p className="text-sm text-white">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  )
}
