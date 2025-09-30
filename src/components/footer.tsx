"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 flex justify-center">
      <div className="max-w-6xl px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Image
              src="/images/dipasqua-logo.png"
              alt="Di Pasqua"
              width={2000}
              height={800}
              id="image"
              className="h-12 mb-6 w-50"
            />
            <p className="text-lg mb-6 max-w-md">
              Más de 60 años liderando en el sector del transporte. Soluciones
              integrales en reparación, venta de semis y repuestos.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://facebook.com/RepuestosDiPasqua"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com/repuestos_dipasqua"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { href: "#inicio", label: "Inicio" },
                { href: "#nosotros", label: "¿Quiénes somos?" },
                { href: "#servicios", label: "Servicios" },
                { href: "#marcas", label: "Nuestros Clientes" },
                { href: "#contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+54 9 261 466-3077</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>dipasquarepuestos@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Concordia 84, Guaymallén, Mendoza</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm">Lunes-Viernes: 9:00-18:00</p>
                  <p className="text-sm">Sábados: 9:00-13:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 text-center"
        >
          <p className="mb-4">
            &copy; 2025 Di Pasqua. Todos los derechos reservados.
          </p>
          <p className="text-xl text-gray-400">
            Developed by{" "}
            <a
              href="https://bucly.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-white transition-colors duration-200 hover:text-[#3BB7FF] cursor-pointer font-poppins"
            >
              BUCLY
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
