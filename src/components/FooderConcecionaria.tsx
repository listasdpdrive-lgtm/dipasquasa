"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export function FooderConcecionaria() {
  return (
    <footer className="bg-foreground text-background py-16 flex justify-center">
      <div className="max-w-6xl px-10 w-full">
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
              src="/logoconcecionaria.jpg"
              alt="Di Pasqua"
              width={2000}
              height={800}
              className="h-12 mb-6 w-50"
            />
            <p className="text-lg mb-6 max-w-md">
              Más de 60 años liderando en el sector del transporte. Soluciones
              integrales en reparación, venta de semis y repuestos.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/concesionaria_dipasqua"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/acoplados_dipasqua?igsh=aXZxaXFzeDJnZzBz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
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
                <span>+54 9 261 363 5617</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>dipasqua.ventas@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Carril Rodríguez Peña Km 10.5, Maipú, Mendoza</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm">Lunes a Viernes: 9:00 - 19:30</p>
                  <p className="text-sm">Sábados: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 🗺 MAPA GOOGLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1183.7406715874906!2d-68.72929742388955!3d-32.94772952328883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0d1c79c5ae47%3A0x3e26ff0b81ad877!2sDi%20Pasqua%20semirremolques%20y%20camiones!5e0!3m2!1ses-419!2sar!4v1770985378632!5m2!1ses-419!2sar"
            width="100%"
            height="350"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          />
        </motion.div>
      </div>
    </footer>
  );
}
