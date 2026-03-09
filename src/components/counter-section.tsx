"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function Counter({ end, duration = 2, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <span
      ref={ref}
      className="font-bold text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function CounterSection() {
  return (
    <section className="relative py-20 flex justify-center overflow-hidden text-white">

      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Fondo_Inicios/fondo counter.png"
          alt="fondo"
          fill
          className="object-cover"
        />
      </div>

      {/* Oscurecer fondo */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="max-w-6xl px-10 lg:px-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nuestra Trayectoria en Números
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Décadas de experiencia respaldando a la industria del transporte argentino
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition"
          >
            <div className="mb-4">
              <Counter end={60} prefix="+" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Años en el Sector</h3>
            <p className="text-gray-300">
              Seis décadas liderando la industria del transporte
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition"
          >
            <div className="mb-4">
              <Counter end={600000} prefix="+" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Problemas solucionados</h3>
            <p className="text-gray-300">
              Trabajando con calidad y eficiencia
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition"
          >
            <div className="mb-4">
              <Counter end={5000} prefix="+" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Clientes Satisfechos</h3>
            <p className="text-gray-300">
              Empresas que confían en nuestra experiencia y calidad
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

