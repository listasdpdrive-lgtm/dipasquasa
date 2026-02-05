export const dynamic = "force-dynamic"

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const login = async () => {
    setError("")

    if (!supabase) {
      setError("Supabase no está configurado")
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      setError("No se pudo crear la sesión")
      return
    }

    router.replace("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-6 space-y-3 w-80 rounded">
        <h1 className="text-xl font-bold">Admin Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={login}
          className="bg-black text-white w-full py-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
