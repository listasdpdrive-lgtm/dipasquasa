"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

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
      className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-work-sans drop-shadow-sm break-words"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function CounterSection() {
  return (
    <section className="py-20 bg-gray-50 flex justify-center">
      <div className="max-w-6xl px-10 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-work-sans mb-4 text-gray-900">
            Nuestra Trayectoria en Números
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Décadas de experiencia respaldando a la industria del transporte argentino
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="mb-4 min-h-[60px] flex items-center justify-center">
              <Counter end={60} prefix="+" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">Años en el Sector</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Seis décadas liderando la industria del transporte
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="mb-4 min-h-[60px] flex items-center justify-center">
              <Counter end={500000} prefix="+" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">Problemas solucionados</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Todos los problemas solucionados con calidad
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-1"
          >
            <div className="mb-4 min-h-[60px] flex items-center justify-center">
              <Counter end={2000} prefix="+" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">Clientes Satisfechos</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Empresas que confían en nuestra experiencia y calidad
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
