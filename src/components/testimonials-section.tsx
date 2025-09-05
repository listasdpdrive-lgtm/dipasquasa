"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      company: "Transportes del Norte",
      text: "Di Pasqua nos ha brindado un servicio excepcional durante más de 15 años. Su equipo técnico es altamente capacitado y siempre resuelven nuestros problemas de manera eficiente.",
      rating: 5,
      image: "/professional-man.png",
    },
    {
      name: "María González",
      company: "Logística Express",
      text: "La calidad de sus repuestos y la rapidez en la entrega nos permite mantener nuestra flota operativa. Son nuestro socio estratégico en el negocio del transporte.",
      rating: 5,
      image: "/professional-woman-diverse.png",
    },
    {
      name: "Roberto Silva",
      company: "Carga Pesada SA",
      text: "Compramos 5 semirremolques el año pasado y el servicio post-venta ha sido impecable. Recomiendo Di Pasqua sin dudarlo.",
      rating: 5,
      image: "/professional-bearded-man.png",
    },
  ]

  return (
    <section id="testimonios" className="py-20 bg-gray-50 flex justify-center">
      <div className="w-full max-w-6xl px-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestros <span className="text-red-600">Clientes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">La confianza de más de 500 empresas nos respalda</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl shadow-lg p-8 relative hover:shadow-xl transition-shadow duration-300 flex flex-col h-full ${testimonials.length - 1 === index ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-red-200" />

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic leading-relaxed flex-grow">"{testimonial.text}"</p>

              <div className="flex items-center mt-auto">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  id="image"
                  className="w-12 h-12 rounded-full mr-4"
                  priority={index === 0}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-red-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
