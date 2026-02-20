"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type VideosSectionProps = {
  video1: string
  video2: string
}

export default function VideosSection({ video1, video2 }: VideosSectionProps) {
  const [current, setCurrent] = useState(0)

  const videos = [video1, video2]

  // 🎬 Carrusel automático en mobile
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev === 0 ? 1 : 0))
  }, 16000) // 16 segundos
  return () => clearInterval(interval)
}, [])

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* 📱 Mobile - Carrusel */}
        <div className="md:hidden relative">
  <motion.div
    key={current}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-2xl shadow-xl p-4"
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
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
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