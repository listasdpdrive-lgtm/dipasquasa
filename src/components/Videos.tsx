"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

type VideosSectionProps = {
  video1: string
  video2: string
}

export default function VideosSection({ video1, video2 }: VideosSectionProps) {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)

  const videos = [video1, video2]

  // 🎬 Carrusel automático en mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === 0 ? 1 : 0))
    }, 16000)
    return () => clearInterval(interval)
  }, [])

  // 🎥 Parallax fondo
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={ref} className="relative w-full py-20 px-4 overflow-hidden">
      
      {/* FONDO CON MOVIMIENTO */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src="/Fondo_Inicios/fondo videos.png"
          alt="Fondo Sección Videos"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/0" />
      </motion.div>

      <div className="max-w-6xl mx-auto">

        {/* 📱 Mobile - Carrusel */}
        <div className="md:hidden relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-4"
          >
            <video
              src={videos[current]}
              autoPlay
              muted
              playsInline
              preload="auto"
              controls
              onEnded={() =>
                setCurrent((prev) => (prev === 0 ? 1 : 0))
              }
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* 💻 Desktop - Dos cuadros */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="aspect-video">
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}