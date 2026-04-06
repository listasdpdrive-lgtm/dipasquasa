"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export const dynamic = "force-dynamic"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const login = async () => {
    setError("")
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // 🔥 refresca sesión y evita bugs de cache
    router.refresh()
    router.replace("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="border p-6 space-y-4 w-80 rounded-xl shadow bg-white">
        <h1 className="text-xl font-bold text-center">Admin Login</h1>

        <input
          placeholder="Email"
          type="email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          onClick={login}
          disabled={loading}
          className="bg-black text-white w-full py-2 rounded hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  )
}