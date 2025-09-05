"use client"

import { useEffect, useRef, useState } from "react"

interface PerformanceOptimizerProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

export function PerformanceOptimizer({
  children,
  threshold = 0.1,
  rootMargin = "50px",
  className = ""
}: PerformanceOptimizerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Simular un pequeño delay para evitar cargas simultáneas
          setTimeout(() => setHasLoaded(true), 100)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={className}>
      {isVisible && hasLoaded ? (
        children
      ) : (
        <div className="animate-pulse bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <div className="text-gray-400">Cargando...</div>
        </div>
      )}
    </div>
  )
}

// Hook para optimizar imágenes
export function useImageOptimization() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return { isLoaded, handleImageLoad }
}

// Hook para optimizar animaciones
export function useAnimationOptimization() {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { shouldAnimate, ref }
}
