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

export default function ProductosPage() {

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
{/* 🔁 CAMBIAR VISTA (MÓVIL) */}
<div className="flex justify-end mb-4 md:hidden">
  <button
    onClick={() =>
      setMobileView(mobileView === "grid" ? "list" : "grid")
    }
    className="px-4 py-2 border rounded-lg text-sm bg-white shadow"
  >
    {mobileView === "grid"
      ? "📋 Vista lista"
      : "🔲 Vista grilla"}
  </button>
</div>

  return (

     <div className="min-h-screen bg-gray-100">
    <>
      <TopBar />

      {/* 🟢 WHATSAPP */}
      <a
        href="https://wa.me/5491112345678"
        target="_blank"
        className="fixed bottom-44 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl"
      >
        <MessageCircle size={22} />
      </a>

      {/* 🔵 LLAMAR */}
      <a
        href="tel:+5491112345678"
        className="fixed bottom-28 right-6 z-40 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl"
      >
        <Phone size={22} />
      </a>

      {/* ❤️ FAVORITOS */}
      <button
        onClick={() => setOpenFavs(true)}
        className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl flex items-center gap-2"
      >
        <Heart className="fill-white" size={20} />
        {favoritos.length > 0 && (
          <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {favoritos.length}
          </span>
        )}
      </button>

      {/* 🌫️ OVERLAY */}
      {openFavs && (
        <div
          onClick={() => setOpenFavs(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* ⭐ PANEL FAVORITOS */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-80 bg-white z-50
          transform transition-transform duration-300
          ${openFavs ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Heart className="text-red-500" size={18} />
            Favoritos
          </h3>

          <button onClick={() => setOpenFavs(false)}>
            <X />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-64px)]">
          {favoritos.length === 0 ? (
            <p className="text-sm text-gray-500">
              No hay productos en favoritos
            </p>
          ) : (
            favoritos.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 border rounded-lg p-2"
              >
                {f.image && (
                  <img
                    src={f.image}
                    className="w-14 h-14 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-1">
                    {f.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ${f.price}
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorito(f)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* 🧱 CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border rounded-lg"
          />
        </div>

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
                  className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow"
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
                  <div className="w-full aspect-[4/3] bg-gray-100">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="font-semibold text-lg line-clamp-2">
                      {p.name}
                    </h2>
                    <p className="font-bold mt-1">${p.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooderConcecionaria />
    </>
    </div>
  )
}
