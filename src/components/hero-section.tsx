"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

export function HeroSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative overflow-hidden pt-20 pb-20"
    >
     
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/Fondo_Inicios/Fondo hero.png"
          alt="Fondo Transporte"
          fill
          priority
          className="object-cover"
        />

      
        <div className="absolute inset-0 bg-black/5" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
       
        <div className="text-center text-white mb-20">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
         className="text-4xl lg:text-6xl font-extrabold mb-6 
         drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] 
         leading-tight"
  >
    Soluciones Integrales para{" "}
    <span className="text-red-600 drop-shadow-[0_0_2px_rgba(122,28,28,0.8)]">
      Transporte Pesado
    </span>
  </motion.h1>
</div>

        
        <div id="locales">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-4"
          >
            Nuestros Locales
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                href: "/casa_repuestos",
                img: "/CASA REPUESTOS.jpg",
                title: "Casa de Repuestos",
                text: "Amplia variedad de repuestos",
              },
              {
                href: "/Taller",
                img: "/images/mecanico samir.jpeg",
                title: "Taller",
                text: "Servicio mecánico especializado",
              },
              {
                href: "/concesionaria",
                img: "/locales/concesionaria.jpeg",
                title: "Concesionaria",
                text: "Venta de vehículos",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link href={item.href}>
                  <div className="relative h-[360px] rounded-xl overflow-hidden border border-white/10 group">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-white text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4">
                        {item.text}
                      </p>
                      <span className="inline-flex items-center gap-2 text-red-500 font-medium">
                        Ver más <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}