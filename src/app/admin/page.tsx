"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Producto = {
  id: string
  name: string
  price: number
  description?: string
  image?: string | null
  tipo_camion?: string[] | null
}

const TIPOS_CAMION = [
  "AST PRA",
  "CARRIER",
  "SALTO",
  "SEMIRREMOLQUE Y ACOPLADOS",
  "CAMIONES",
  "0km",
  "Usados",
]

export default function AdminPage() {
  const router = useRouter()

  const [loadingAuth, setLoadingAuth] = useState(true)
  const [productos, setProductos] = useState<Producto[]>([])
  const [editando, setEditando] = useState<Producto | null>(null)
  const [viendoImagen, setViendoImagen] = useState<string | null>(null)

  const [editImage, setEditImage] = useState<File | null>(null)
  const [previewEditImage, setPreviewEditImage] = useState<string | null>(null)

  const [nuevo, setNuevo] = useState({
    name: "",
    price: "",
    description: "",
    tipo_camion: [] as string[],
    image: null as File | null,
    preview: null as string | null,
  })

  /* 🔐 AUTH */
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/admin/login")
        return
      }
      setLoadingAuth(false)
    }
    checkAuth()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  /* 📦 CARGAR */
  const cargarProductos = async () => {
    const { data } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false })

    setProductos(data || [])
  }

  useEffect(() => {
    if (!loadingAuth) cargarProductos()
  }, [loadingAuth])

  /* 🗜️ COMPRESIÓN */
  const comprimirImagen = (file: File): Promise<File> =>
    new Promise((resolve) => {
      const img = new Image()
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      img.onload = () => {
        const max = 1200
        let { width, height } = img

        if (width > height && width > max) {
          height = (height * max) / width
          width = max
        } else if (height > max) {
          width = (width * max) / height
          height = max
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) =>
            resolve(
              new File([blob!], file.name.replace(/\.\w+$/, ".jpg"), {
                type: "image/jpeg",
              })
            ),
          "image/jpeg",
          0.75
        )
      }

      img.src = URL.createObjectURL(file)
    })

  /* 📤 SUBIR */
  const subirImagen = async (file: File) => {
    const img = await comprimirImagen(file)
    const fileName = `${Date.now()}-${file.name}`
    await supabase.storage.from("productos").upload(fileName, img)
    const { data } = supabase.storage.from("productos").getPublicUrl(fileName)
    return data.publicUrl
  }

  /* 🧹 BORRAR IMAGEN */
  const borrarImagenVieja = async (url?: string | null) => {
    if (!url) return
    const path = url.split("/storage/v1/object/public/productos/")[1]
    if (path) await supabase.storage.from("productos").remove([path])
  }

  /* ➕ AGREGAR */
  const agregarProducto = async () => {
    if (!nuevo.name || !nuevo.price || !nuevo.image) {
      alert("Completá nombre, precio e imagen")
      return
    }

    const imageUrl = await subirImagen(nuevo.image)

    await supabase.from("productos").insert({
      name: nuevo.name,
      price: Number(nuevo.price),
      description: nuevo.description,
      image: imageUrl,
      tipo_camion: nuevo.tipo_camion.length ? nuevo.tipo_camion : null,
    })

    setNuevo({
      name: "",
      price: "",
      description: "",
      tipo_camion: [],
      image: null,
      preview: null,
    })

    cargarProductos()
  }

  /* 🗑 ELIMINAR */
  const eliminarProducto = async (p: Producto) => {
    if (!confirm("¿Eliminar producto?")) return
    await borrarImagenVieja(p.image)
    await supabase.from("productos").delete().eq("id", p.id)
    cargarProductos()
  }

  /* ✏️ GUARDAR */
  const guardarEdicion = async () => {
    if (!editando) return

    let imageUrl = editando.image

    if (editImage) {
      await borrarImagenVieja(editando.image)
      imageUrl = await subirImagen(editImage)
    }

    await supabase
      .from("productos")
      .update({
        name: editando.name,
        price: editando.price,
        description: editando.description,
        image: imageUrl,
        tipo_camion:
          editando.tipo_camion && editando.tipo_camion.length
            ? editando.tipo_camion
            : null,
      })
      .eq("id", editando.id)

    setEditando(null)
    setEditImage(null)
    setPreviewEditImage(null)
    cargarProductos()
  }

  if (loadingAuth) return <p className="p-10">Cargando...</p>

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Panel Admin</h1>
        <button onClick={logout} className="text-red-600 underline">
          Cerrar sesión
        </button>
      </div>

      {/* ➕ NUEVO PRODUCTO */}
      <div className="border p-4 mb-10 space-y-3 rounded">
        <h2 className="text-xl font-semibold">Nuevo producto</h2>

        <input
          className="border p-2 w-full"
          placeholder="Nombre"
          value={nuevo.name}
          onChange={(e) => setNuevo({ ...nuevo, name: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Precio"
          value={nuevo.price}
          onChange={(e) => setNuevo({ ...nuevo, price: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Descripción"
          value={nuevo.description}
          onChange={(e) =>
            setNuevo({ ...nuevo, description: e.target.value })
          }
        />

        <div className="border p-3 rounded space-y-2">
          {TIPOS_CAMION.map((tipo) => (
            <label key={tipo} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={nuevo.tipo_camion.includes(tipo)}
                onChange={(e) =>
                  setNuevo({
                    ...nuevo,
                    tipo_camion: e.target.checked
                      ? [...nuevo.tipo_camion, tipo]
                      : nuevo.tipo_camion.filter((t) => t !== tipo),
                  })
                }
              />
              {tipo}
            </label>
          ))}
        </div>

        <div
          className="border-2 border-dashed rounded h-40 flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("newImage")?.click()}
        >
          {nuevo.preview ? (
            <img src={nuevo.preview} className="h-full object-cover rounded" />
          ) : (
            <span className="text-gray-400">Click para subir imagen</span>
          )}
        </div>

        <input
          id="newImage"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            setNuevo({
              ...nuevo,
              image: file,
              preview: URL.createObjectURL(file),
            })
          }}
        />

        <button
          onClick={agregarProducto}
          className="bg-black text-white px-4 py-2"
        >
          Agregar producto
        </button>
      </div>

      {/* 📦 LISTA */}
      {productos.map((p) => (
        <div key={p.id} className="border p-4 flex justify-between mb-2">
          <strong>{p.name}</strong>
          <div className="space-x-2">
            <button
              className="bg-gray-600 text-white px-2"
              onClick={() => setViendoImagen(p.image || null)}
            >
              Ver foto
            </button>
            <button
              className="bg-blue-600 text-white px-2"
              onClick={() =>
                setEditando({
                  ...p,
                  tipo_camion: p.tipo_camion || [],
                })
              }
            >
              Editar
            </button>
            <button
              className="bg-red-600 text-white px-2"
              onClick={() => eliminarProducto(p)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {/* 🖼 VER IMAGEN */}
      {viendoImagen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center"
          onClick={() => setViendoImagen(null)}
        >
          <img
            src={viendoImagen}
            className="max-h-[90vh] max-w-[90vw] rounded"
          />
        </div>
      )}

      {/* ✏️ EDITAR */}
      {editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-96 space-y-3 rounded">
            <h2 className="font-bold text-xl">Editar producto</h2>

            <input
              className="border p-2 w-full"
              value={editando.name}
              onChange={(e) =>
                setEditando({ ...editando, name: e.target.value })
              }
            />

            <input
              type="number"
              className="border p-2 w-full"
              value={editando.price}
              onChange={(e) =>
                setEditando({ ...editando, price: Number(e.target.value) })
              }
            />

            <textarea
              className="border p-2 w-full"
              value={editando.description || ""}
              onChange={(e) =>
                setEditando({ ...editando, description: e.target.value })
              }
            />

            <div className="border p-3 rounded space-y-2">
              {TIPOS_CAMION.map((tipo) => (
                <label key={tipo} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editando.tipo_camion?.includes(tipo)}
                    onChange={(e) =>
                      setEditando({
                        ...editando,
                        tipo_camion: e.target.checked
                          ? [...(editando.tipo_camion || []), tipo]
                          : (editando.tipo_camion || []).filter(
                              (t) => t !== tipo
                            ),
                      })
                    }
                  />
                  {tipo}
                </label>
              ))}
            </div>

            <div
              className="border-2 border-dashed rounded h-40 flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("editImage")?.click()}
            >
              <img
                src={previewEditImage || editando.image || ""}
                className="h-full object-cover rounded"
              />
            </div>

            <input
              id="editImage"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setEditImage(file)
                setPreviewEditImage(URL.createObjectURL(file))
              }}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditando(null)}>Cancelar</button>
              <button
                onClick={guardarEdicion}
                className="bg-green-600 text-white px-3"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
