"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { TopBar } from "@/components/TopBar"
import { Heart, X, Phone, MessageCircle } from "lucide-react"
import { FooderConcecionaria } from "@/components/FooderConcecionaria"

type Producto = {
  id: string
  name: string
  price: number
  image?: string | null
  tipo_camion?: string[] | null
}

/* 🔧 NORMALIZADOR */
const normalizar = (v: string) =>
  v.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim()

export default function ProductosClient() {
  const [mobileView, setMobileView] = useState<"grid" | "list">("grid")

  const searchParams = useSearchParams()
  const tipoDesdeUrl = searchParams.get("tipo")

  const [products, setProducts] = useState<Producto[]>([])
  const [search, setSearch] = useState("")
  const [error, setError] = useState<string | null>(null)

  const [favoritos, setFavoritos] = useState<Producto[]>([])
  const [openFavs, setOpenFavs] = useState(false)

  /* 📦 PRODUCTOS */
  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("id, name, price, image, tipo_camion")

      if (error) {
        setError(error.message)
        return
      }

      setProducts(data || [])
    }

    fetchProductos()
  }, [])

  /* ⭐ FAVORITOS */
  useEffect(() => {
    const favs = localStorage.getItem("favoritos")
    if (favs) setFavoritos(JSON.parse(favs))
  }, [])

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  const toggleFavorito = (producto: Producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) return prev.filter((p) => p.id !== producto.id)
      return [...prev, producto]
    })
  }

  const esFavorito = (id: string) =>
    favoritos.some((p) => p.id === id)

  /* 🎯 FILTROS */
  const tiposSeleccionados = tipoDesdeUrl
    ? tipoDesdeUrl.split(",").map(normalizar)
    : []

  const productosFiltrados = products.filter((p) => {
    const coincideBusqueda = p.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const coincideTipo =
      tiposSeleccionados.length === 0 ||
      p.tipo_camion?.some((t) =>
        tiposSeleccionados.includes(normalizar(t))
      )

    return coincideBusqueda && coincideTipo
  })

  if (error) {
    return <p className="p-10 text-red-500">Error: {error}</p>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />

      {/* 🔁 CAMBIAR VISTA (MÓVIL) */}
      <div className="flex justify-end mb-4 md:hidden px-6">
        <button
          onClick={() =>
            setMobileView(mobileView === "grid" ? "list" : "grid")
          }
          className="px-4 py-2 border rounded-lg text-sm bg-white shadow"
        >
          {mobileView === "grid" ? "📋 Vista lista" : "🔲 Vista grilla"}
        </button>
      </div>

      {/* 🟢 WHATSAPP */}
      <a
        href="https://wa.me/5491112345678"
        target="_blank"
        className="fixed bottom-44 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-xl"
      >
        <MessageCircle size={22} />
      </a>

      {/* 🔵 LLAMAR */}
      <a
        href="tel:+5491112345678"
        className="fixed bottom-28 right-6 z-40 bg-blue-500 text-white p-4 rounded-full shadow-xl"
      >
        <Phone size={22} />
      </a>

      {/* ❤️ FAVORITOS */}
      <button
        onClick={() => setOpenFavs(true)}
        className="fixed bottom-6 right-6 z-40 bg-red-600 text-white p-4 rounded-full shadow-xl"
      >
        <Heart className="fill-white" size={20} />
      </button>

      {/* 🧱 CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-lg mb-6"
        />

        {productosFiltrados.length === 0 ? (
          <p className="text-gray-500">No hay productos</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosFiltrados.map((p) => (
              <div
                key={p.id}
                className="border rounded-2xl bg-white shadow hover:shadow-xl transition overflow-hidden relative"
              >
                <button
                  onClick={() => toggleFavorito(p)}
                  className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
                >
                  <Heart
                    size={18}
                    className={
                      esFavorito(p.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>

                <Link href={`/productos/${p.id}`}>
                  <div className="aspect-[4/3] bg-gray-100">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="font-semibold">{p.name}</h2>
                    <p className="font-bold">${p.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooderConcecionaria />
    </div>
  )
}
