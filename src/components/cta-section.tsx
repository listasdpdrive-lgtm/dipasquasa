"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle, CheckCircle } from "lucide-react"

export default function CTASection() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  const benefits = [
    "Presupuesto gratuito en 24 horas",
    "Asesoramiento personalizado",
    "Garantía en todos nuestros servicios",
    "Financiación disponible",
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden flex justify-center">
      <div className="max-w-6xl px-10 lg:px-0">

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="container mx-auto px-8 md:px-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">¿Listo para Optimizar tu Flota?</h2>
              <p className="text-xl md:text-2xl mb-8 text-red-100 text-center">
                Únete a más de 2000 empresas que confían en Di Pasqua para sus necesidades de transporte
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4 mb-10 max-w-md mx-auto flex-col items-center"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-lg text-left">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToContact}
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-102 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                Solicitar Presupuesto
              </button>
              <a
                href="https://wa.me/5492614663077?text=Hola, me interesa conocer más sobre sus servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                WhatsApp Directo
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
