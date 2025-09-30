"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSended, setIsSended] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSended(false);
    }, 3000);
  }, [isSended]);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //validate fields
    if (
      !formData.name.trim() ||
      !formData.company.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Todos los campos son requeridos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.name.length < 2 || formData.name.length > 100) {
      setErrorMessage("El nombre debe tener entre 2 y 100 caracteres.");
      return;
    }
    if (formData.company.length > 100) {
      setErrorMessage("La empresa no puede tener más de 100 caracteres.");
      return;
    }

    if (!emailRegex.test(formData.email) || formData.email.length > 200) {
      {
        setErrorMessage("El email no es válido o es demasiado largo.");
        return;
      }
    }
    if (formData.phone.length > 100) {
      setErrorMessage("El teléfono no puede tener más de 100 digitos");
      return;
    }

    if (formData.message.length < 3 || formData.message.length > 5000) {
      setErrorMessage("El mensaje debe tener entre 3 y 5000 caracteres.");
      return;
    }

    const res = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setErrorMessage("");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSended(true);
    } else {
      setErrorMessage("error al enviar mensaje");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contacto" className="py-20 bg-muted flex justify-center">
      <div className="max-w-6xl px-10 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-work-sans mb-6">
            ¿Querés más información?
          </h2>
          <p className="text-xl text-muted-foreground w-full">
            Escríbenos y te asistiremos en lo que necesites.
          </p>
        </motion.div>

        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full gap-0">
                <CardHeader className="">
                  <CardTitle className="text-3xl font-work-sans">
                    Formulario de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-center py-2 text-primary">
                    {errorMessage}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Nombre y Apellido *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium mb-2"
                        >
                          Empresa
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full  border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full  border-gray-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-2"
                        >
                          Teléfono *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full  border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Consulta *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full text-lg  border-gray-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-md cursor-pointer ${
                        isSended
                          ? "bg-green-500 hover:bg-green-600 "
                          : "bg-primary hover:bg-primary/90 "
                      }`}
                      onClick={handleSubmit}
                    >
                      {isSended ? "Gracias!" : "Enviar"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-semibold font-work-sans mb-8">
                    Datos de Contacto
                  </h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-muted-foreground">
                          +54 9 261 466-3077
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Mail className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">
                          dipasquarepuestos@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <MapPin className="h-6 w-6 min-h-6 min-w-6 text-primary" />
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-muted-foreground">
                          Concordia 84, Guaymallén, Mendoza, Argentina
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Clock className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Horarios de Atención</p>
                        <p className="text-muted-foreground">
                          Lunes a Viernes: 9:00 - 18:00
                        </p>
                        <p className="text-muted-foreground">
                          Sábados: 9:00 - 13:00
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="w-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold font-work-sans mb-8 text-center">
                  Ubicación
                </h3>
                <div className="w-full h-96 rounded-lg overflow-hidden relative">
                  {/* Placeholder mientras carga el mapa */}
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Cargando mapa...</p>
                    </div>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.8695981885044!2d-68.73897252503697!3d-32.92804337094806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0d9528747b19%3A0x385ae1522ca15396!2sConcordia%2084%2C%20M5525%20Rodeo%20de%20la%20Cruz%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1755810673072!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Di Pasqua Repuestos"
                    onLoad={(e) => {
                      // Ocultar placeholder cuando el mapa carga
                      const target = e.target as HTMLIFrameElement;
                      const parent = target.parentElement;
                      if (parent) {
                        const placeholder = parent.querySelector("div");
                        if (placeholder) {
                          placeholder.style.display = "none";
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
