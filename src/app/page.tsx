"use client"
import { Suspense, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CounterSection } from "@/components/counter-section"
import { AboutSection } from "@/components/about-section"
import { HistorySection } from "@/components/history-section"
import { ServicesSection } from "@/components/services-section"
import { BrandsSection } from "@/components/brands-section"
import { ValuePropositionSection } from "@/components/value-proposition-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen relative flex justify-center">
      <Header />
      <div className="w-screen">
      <HeroSection />
      <CounterSection />
      <AboutSection />
      <HistorySection />
      <ServicesSection />
      <BrandsSection />
      <ValuePropositionSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      </div>
      
    </main>
  )
}
