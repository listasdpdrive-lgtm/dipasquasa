"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "¿Quiénes somos?" },
    { href: "#servicios", label: "Servicios" },
    { href: "#marcas", label: "Clientes" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      
      className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-100"
    >
      <div className="mx-auto max-w-6xl px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={scrollToHome}>
            <Image
              src="/images/dipasqua-logo.png"
              alt="Di Pasqua"
              width={180}
              height={60}
              id="image"
              className="h-10 md:h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                className="text-gray-800 hover:text-primary transition-colors font-medium text-lg cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
            <Button
              onClick={() => scrollToSection("#contacto")}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 sm:py-6 text-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              Solicitar Presupuesto
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-gray-800 hover:text-primary hover:bg-gray-50 transition-colors font-medium text-lg cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <Button
                    onClick={() => scrollToSection("#contacto")}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold cursor-pointer"
                  >
                    Solicitar Presupuesto
                  </Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
