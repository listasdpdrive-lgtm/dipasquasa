"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const whatsappNumbers = [
  { label: "Taller", phone: "5492615580350" },
  { label: "Concecionaria", phone: "5492613635617" },
  { label: "Casa de Repuestos", phone: "5492614663077" },
]

const instagramLinks = [
  { label: "Repuestos", url: "https://www.instagram.com/repuestos_dipasqua" },
  { label: "Concesionaria", url: "https://www.instagram.com/acoplados_dipasqua" },
]

const facebookLinks = [
  { label: "Repuestos", url: "https://www.facebook.com/profile.php?id=100087217878036" },
  { label: "Concesionaria", url: "https://www.facebook.com/concesionaria_dipasqua" },
]

const tiktokLinks = [
  { label: "Repuestos", url: "https://www.tiktok.com/@repuestos.di.pasq" },
  { label: "Concesionaria", url: "https://www.tiktok.com/@di.pasqua" },
]

export function WhatsAppButton() {
  const [openWp, setOpenWp] = useState(false)
  const [openIg, setOpenIg] = useState(false)
  const [openFb, setOpenFb] = useState(false)
  const [openTt, setOpenTt] = useState(false)

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    if (isStandalone) {
      setDeferredPrompt(null)
    }
  }, [])

  const instalar = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
    } else {
      alert("Para instalar la app: menú del navegador → 'Agregar a pantalla de inicio'")
    }
  }

  const sendWhatsApp = (phone: string) => {
    const message = encodeURIComponent("Hola, me gustaría consultar sobre ...")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3">
      
      {deferredPrompt && (
        <motion.button
          onClick={instalar}
          whileTap={{ scale: 0.9 }}
          className="bg-white p-4 rounded-full shadow-lg cursor-pointer"
        >
          <Image src="/logoH.png" width={38} height={38} alt="instalar" />
        </motion.button>
      )}

      {/* INSTAGRAM */}
      <AnimatePresence>
        {openIg && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
            {instagramLinks.map((item) => (
              <a key={item.url} href={item.url} target="_blank" className="bg-white text-pink-600 px-4 py-2 rounded-lg shadow-md text-sm">
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpenIg(!openIg)} className="bg-pink-500 p-3 rounded-full shadow-lg cursor-pointer">
        <Image src="/images/ig.png" width={28} height={28} alt="instagram" />
      </button>

      {/* FACEBOOK */}
      <AnimatePresence>
        {openFb && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
            {facebookLinks.map((item) => (
              <a key={item.url} href={item.url} target="_blank" className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md text-sm">
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpenFb(!openFb)} className="bg-blue-600 p-3 rounded-full shadow-lg cursor-pointer">
        <Image src="/images/fb-icon.png" width={28} height={28} alt="facebook" />
      </button>

      {/* TIKTOK */}
      <AnimatePresence>
        {openTt && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
            {tiktokLinks.map((item) => (
              <a key={item.url} href={item.url} target="_blank" className="bg-white text-black px-4 py-2 rounded-lg shadow-md text-sm">
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpenTt(!openTt)} className="bg-black p-3 rounded-full shadow-lg cursor-pointer">
        <Image src="/images/tik.png" width={28} height={28} alt="tiktok" />
      </button>

      {/* WHATSAPP MODIFICADO */}
      <AnimatePresence>
        {openWp && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            className="flex flex-row items-center gap-4 basic-full"
          >
            

            {/* Lista de botones al lado DERECHO */}
            <div className="flex flex-col gap-2">
              {whatsappNumbers.map((item) => (
                <button 
                  key={item.phone} 
                  onClick={() => sendWhatsApp(item.phone)} 
                  className="bg-white text-green-600 px-4 py-2 rounded-lg shadow-md text-sm whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpenWp(!openWp)} className="bg-green-500 p-4 rounded-full shadow-lg cursor-pointer">
        <Image src="/images/wp-icon.png" width={36} height={36} alt="whatsapp" />
      </button>

    </div>
  )
}
