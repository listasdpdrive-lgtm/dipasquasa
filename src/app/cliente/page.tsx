"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { clearClientAccountCache } from "@/lib/cliente/cuenta-cache"

export default function ClientePage() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch("/api/cliente/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cuit: formData.get("cuit"),
          username: formData.get("usuario"),
          password: formData.get("contrasena"),
        }),
      })
      if (!response.ok) {
        const result = await response.json()
        setMessage(result.error || "No se pudo iniciar sesión.")
        return
      }

      clearClientAccountCache()
      router.replace("/cliente/cuenta")
    } catch {
      setMessage("No se pudo conectar. Intentá nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Acceso de clientes
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Ingresá tu CUIT, usuario y contraseña.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="cuit"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              CUIT
            </label>
            <input
              id="cuit"
              name="cuit"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="30123456789"
              pattern="[0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9]"
              maxLength={13}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label
              htmlFor="usuario"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              autoComplete="username"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label
              htmlFor="contrasena"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          {message && (
            <p
              role="status"
              className="text-center text-sm text-gray-600"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-red-600 py-2.5 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  )
}
