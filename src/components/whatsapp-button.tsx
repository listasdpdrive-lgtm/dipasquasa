"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const whatsappNumbers = [
  { label: "Taller", phone: "5492614910438" },
  { label: "Concecionaria", phone: "5492613635617" },
  { label: "Casa de Repuestos", phone: "5492614663077" },
]

const instagramLinks = [
  { label: "Repuestos", url: "https://www.instagram.com/repuestos_dipasqua" },
  { label: "Concesionaria", url: "https://www.instagram.com/acoplados_dipasqua?igsh=aXZxaXFzeDJnZzBz&utm_source=qr" },
]

const facebookLinks = [
  { label: "Repuestos", url: "https://www.facebook.com/profile.php?id=100087217878036" },
  { label: "Concesionaria", url: "https://www.facebook.com/concesionaria_dipasqua" },
]

const tiktokLinks = [
  { label: "Repuestos", url: "https://www.tiktok.com/@repuestos.di.pasq" },
  { label: "Concesionaria", url: "https://www.tiktok.com/@repuestos.di.pasq" },
]

export function WhatsAppButton() {
  const [openWp, setOpenWp] = useState(false)
  const [openIg, setOpenIg] = useState(false)
  const [openFb, setOpenFb] = useState(false)
  const [openTt, setOpenTt] = useState(false)

  const sendWhatsApp = (phone: string) => {
    const message = encodeURIComponent("Hola, me gustaría consultar sobre ...")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* Instagram */}
      <AnimatePresence>
        {openIg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2 mb-2"
          >
            {instagramLinks.map((item) => (
              <motion.a
                key={item.url}
                href={item.url}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-4 py-2 rounded-lg shadow-md text-sm font-medium hover:bg-pink-50"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpenIg(!openIg)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg"
      >
        <Image src="/images/ig.png" width={32} height={32} alt="instagram" />
      </motion.button>

      {/* Facebook */}
      <AnimatePresence>
        {openFb && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2 mb-2"
          >
            {facebookLinks.map((item) => (
              <motion.a
                key={item.url}
                href={item.url}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md text-sm font-medium hover:bg-blue-50"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpenFb(!openFb)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg"
      >
        <Image src="/images/fb-icon.png" width={32} height={32} alt="facebook" />
      </motion.button>

      {/* TikTok */}
      <AnimatePresence>
        {openTt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2 mb-2"
          >
            {tiktokLinks.map((item) => (
              <motion.a
                key={item.url}
                href={item.url}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-4 py-2 rounded-lg shadow-md text-sm font-medium hover:bg-gray-100"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpenTt(!openTt)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-black hover:bg-neutral-800 p-3 rounded-full shadow-lg"
      >
        <Image src="/images/tik.png" width={32} height={32} alt="tiktok" />
      </motion.button>

      {/* WhatsApp */}
      <AnimatePresence>
        {openWp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2 mb-2"
          >
            {whatsappNumbers.map((item) => (
              <motion.button
                key={item.phone}
                onClick={() => sendWhatsApp(item.phone)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-4 py-2 rounded-lg shadow-md text-sm font-medium hover:bg-green-50"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpenWp(!openWp)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg"
      >
        <Image src="/images/wp-icon.png" width={24} height={24} alt="whatsapp" />
      </motion.button>
    </div>
  )
}
