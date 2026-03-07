"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Cpu, Award, Heart, Shield, Clock } from "lucide-react"
import { useMemo } from "react"

export function ValuePropositionSection() {
  const values = [
    {
      icon: Users,
      title: "Atención Personalizada",
      description:
        "Cada cliente recibe un servicio adaptado a sus necesidades específicas.",
    },
    {
      icon: Cpu,
      title: "Tecnología de Vanguardia",
      description:
        "Utilizamos las últimas tecnologías para garantizar resultados eficientes.",
    },
    {
      icon: Award,
      title: "Calidad y Compromiso",
      description:
        "Mantenemos los más altos estándares en cada servicio.",
    },
    {
      icon: Heart,
      title: "Cercanía y Confianza",
      description:
        "Construimos relaciones duraderas basadas en confianza.",
    },
    {
      icon: Shield,
      title: "Garantía Total",
      description:
        "Respaldamos nuestros servicios con garantías sólidas.",
    },
    {
      icon: Clock,
      title: "Respuesta Rápida",
      description:
        "Ofrecemos tiempos ágiles para minimizar el tiempo de inactividad.",
    },
  ]

  // Genera MUCHAS estrellas
  const stars = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  }, [])

  return (
    <section className="relative py-20 text-white flex justify-center overflow-hidden bg-slate-950">

      {/* Fondo estrellas */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (

          
          <span
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            Soluciones Integradas
          </h2>
          <p className="text-xl opacity-90">
            Creamos soluciones a medida, cercanas y orientadas a potenciar tu negocio.
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
                  <h3 className="text-xl font-semibold mb-4">
                    {value.title}
                  </h3>
                  <p className="text-white/80">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle infinite ease-in-out;
        }

        @keyframes twinkle {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </section>
  )
}