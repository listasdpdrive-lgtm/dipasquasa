"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const whatsappNumbers = [
  { label: "Taller", phone: "5492614910438" },
  { label: "Concecionaria", phone: "5492613635617" },
  { label: "Casa de Repuestos", phone: "5492614663077" },
]

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  const sendWhatsApp = (phone: string) => {
    const message = encodeURIComponent("Hola, me gustaría consultar sobre ...")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* Instagram */}
      <motion.a
        href="https://www.instagram.com/repuestos_dipasqua?igsh=MWIwcjRhOHJwdWJrbA=="
        target="_blank"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg"
      >
        <Image src="/images/ig.png" width={32} height={32} alt="instagram" />
      </motion.a>

      {/* Facebook */}
      <motion.a
        href="https://www.facebook.com/profile.php?id=100087217878036"
        target="_blank"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg"
      >
        <Image src="/images/fb-icon.png" width={32} height={32} alt="facebook" />
      </motion.a>

      {/* Lista WhatsApp */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2 mb-2"
          >
            {whatsappNumbers.map((item) => (
              <motion.button
                key={item.phone}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendWhatsApp(item.phone)}
                className="bg-white text-green-600 px-4 py-2 rounded-lg shadow-md font-medium text-sm hover:bg-green-50"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón WhatsApp */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
      >
        <Image
          src="/images/wp-icon.png"
          width={24}
          height={24}
          alt="whatsapp"
        />
      </motion.button>
    </div>
  )
}
