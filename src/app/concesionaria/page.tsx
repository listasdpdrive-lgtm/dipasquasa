"use client"

import { useRouter } from "next/navigation"

export default function ProximamentePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Próximamente
        </h1>

        <button
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition"
        >
          Volver atrás
        </button>
      </div>
    </main>
  )
}
