"use client"




import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { TopBarID } from "@/components/TopBarID"
import { FooderConcecionaria } from "@/components/FooderConcecionaria"

export const dynamic = "force-dynamic"

type Producto = {
  id: string
  name: string
  price: number
  description?: string
  images?: string[] | null

  year?: number | null
  brand?: string | null
  model?: string | null
  

  color?: string | null
  kilometers?: number | null
  transmission?: string | null

  length?: number | null
  width?: number | null
  height?: number | null

  tabla_visible?: "general" | "medidas" | null
}

export default function ProductoPage() {



  const [imagenes, setImagenes] = useState<string[]>([])

  const [subiendo, setSubiendo] = useState(false)

  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editando, setEditando] = useState(false)

  const [tablaVisible, setTablaVisible] = useState<"general" | "medidas" | "">("")
  const [currentImage, setCurrentImage] = useState(0)

  const [editData, setEditData] = useState({
    name: "",
    price: 0,
    description: "",
  })

  const [editTabla, setEditTabla] = useState({
  year: null,
  brand: "",
  model: "",
  
  color: "",
  kilometers: null,
  transmission: "",
  length: null,
  width: null,
  height: null,
})


  useEffect(() => {
    if (!editando || !producto) return

    setEditData({
      name: producto.name,
      price: producto.price,
      description: producto.description || "",
    })

   setEditTabla({
  year: producto.year ?? null,
  brand: producto.brand || "",
  model: producto.model || "",
  color: producto.color || "",
  kilometers: producto.kilometers ?? null,
  transmission: producto.transmission || "",
  length: producto.length ?? null,
  width: producto.width ?? null,
  height: producto.height ?? null,
})


    setTablaVisible(producto.tabla_visible || "")
  }, [editando, producto])

  useEffect(() => {
    const init = async () => {
      if (!id) return

      const { data: producto, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("SUPABASE ERROR:", error)
        alert(error.message)
        return
      }
     
          setImagenes(producto.images || [])
          setProducto(producto)

      if (producto) {
        setEditData({
          name: producto.name,
          price: producto.price,
          description: producto.description || "",
        })

        setTablaVisible(producto.tabla_visible || "")
      }

      const { data } = await supabase.auth.getSession()
      if (data.session) setIsAdmin(true)

      setLoading(false)
    }

    init()
  }, [id])

  const guardarCambios = async () => {
  if (!producto) return

  const { error } = await supabase
    .from("productos")
    .update({
      name: editData.name,
      price: editData.price,
      description: editData.description || null,

      year: editTabla.year || null,
      brand: editTabla.brand || null,
      model: editTabla.model || null,
      

      color: editTabla.color || null,
      kilometers: editTabla.kilometers || null,
      transmission: editTabla.transmission || null,

      length: editTabla.length || null,
      width: editTabla.width || null,
      height: editTabla.height || null,

      tabla_visible: tablaVisible || null,
    })
    .eq("id", producto.id)

  if (error) {
    console.error("SUPABASE UPDATE ERROR:", error)
    alert(error.message)
    return
  }

  const { data } = await supabase
    .from("productos")
    .select("*")
    .eq("id", producto.id)
    .single()

  setProducto(data)
  setTablaVisible(data?.tabla_visible || "")
  setEditando(false)
}


  if (loading) return <p className="p-10 text-center">Cargando...</p>
  if (!producto) return <p className="p-10 text-red-500">No encontrado</p>
const whatsappNumber = "5491123456789" // 👉 poné tu número con código país

const mensajeWhatsapp = encodeURIComponent(
  `Hola, quiero más información sobre: ${producto?.name}`
)

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${mensajeWhatsapp}`
const subirImagen = async (file: File) => {
  if (!producto) return

  setSubiendo(true)

  const fileName = `${producto.id}/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("productos")
    .upload(fileName, file)

  if (error) {
    alert("Error al subir imagen")
    setSubiendo(false)
    return
  }

  const { data } = supabase.storage
    .from("productos")
    .getPublicUrl(fileName)

  const nuevasImagenes = [...imagenes, data.publicUrl]

  await supabase
    .from("productos")
    .update({ images: nuevasImagenes })
    .eq("id", producto.id)

  setImagenes(nuevasImagenes)
  setSubiendo(false)
}
const eliminarImagen = async (url: string) => {
  if (!producto) return

  const nuevasImagenes = imagenes.filter((img) => img !== url)

  await supabase
    .from("productos")
    .update({ images: nuevasImagenes })
    .eq("id", producto.id)

  setImagenes(nuevasImagenes)
  setCurrentImage(0)
}
  return (
    <>

<input
  id="upload-image"
  type="file"
  hidden
  onChange={(e) =>
    e.target.files && subirImagen(e.target.files[0])
  }
/>


      <TopBarID />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* GALERÍA */}
          {imagenes.length > 0 && (
  <div className="space-y-4">



    {/* Imagen principal */}
    <img
      src={imagenes[currentImage]}
      className="w-full h-[400px] object-cover rounded-xl border"
    />

    {/* Miniaturas */}
    <div className="flex gap-3 flex-wrap">
      {imagenes.map((img, i) => (
        <div
          key={i}
          className={`relative cursor-pointer border rounded-lg overflow-hidden
            ${currentImage === i ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => setCurrentImage(i)}
        >
          <img
            src={img}
            className="w-24 h-24 object-cover"
          />

          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                eliminarImagen(img)
              }}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>

  </div>
)}



          {/* INFO */}
          <div className="space-y-6">

            {editando ? (
              <div className="space-y-4">

                {/* DATOS PRINCIPALES */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Nombre</label>
                  <input
                    className="border p-2 w-full rounded"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />

                  <label className="text-sm font-semibold">Precio</label>
                  

                  <label className="text-sm font-semibold">Descripción</label>
                  <textarea
                    className="border p-2 w-full rounded"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>

                {/* ✅ SUBIR IMÁGENES (SOLO ADMIN) */}

                {isAdmin && (
  <label htmlFor="upload-image" className="block">
    <span className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
      {subiendo ? "Subiendo..." : "➕ Agregar imagen"}
    </span>
  </label>
)}


                  <div className="space-y-1">
                    <label className="text-sm font-semibold">
                      Tabla visible al público
                    </label>

                    <select
                      className="border p-2 w-full rounded"
                      value={tablaVisible}
                      onChange={(e) =>
                        setTablaVisible(e.target.value as "general" | "medidas" | "")
                      }
                    >
                      <option value="">No mostrar tabla</option>
                      <option value="general">Datos generales</option>
                      <option value="medidas">Medidas</option>
                    </select>
                  </div>
                

                {/* TABLAS */}
                {tablaVisible === "general" && (
                  <div className="border p-3 rounded bg-gray-50 space-y-2">
                    <input
                      placeholder="Marca"
                      className="border p-2 w-full rounded"
                      value={editTabla.brand}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, brand: e.target.value })
                      }
                    />

                    <input
                      placeholder="Año"
                      type="number"
                      className="border p-2 w-full rounded"
                      value={editTabla.year}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, year: Number(e.target.value) })
                      }
                    />

                    <input
                      placeholder="Modelo"
                      className="border p-2 w-full rounded"
                      value={editTabla.model}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, model: e.target.value })
                      }
                    />

                    <input
                      placeholder="Combustible"
                      className="border p-2 w-full rounded"
                      value={editTabla.fuel}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, fuel: e.target.value })
                      }
                    />

                    <input
                      placeholder="Color"
                      className="border p-2 w-full rounded"
                      value={editTabla.color}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, color: e.target.value })
                      }
                    />

                    <input
                      placeholder="Kilómetros"
                      type="number"
                      className="border p-2 w-full rounded"
                      value={editTabla.kilometers}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, kilometers: Number(e.target.value) })
                      }
                    />

                    <input
                      placeholder="Transmisión"
                      className="border p-2 w-full rounded"
                      value={editTabla.transmission}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, transmission: e.target.value })
                      }
                    />
                  </div>
                )}

                {tablaVisible === "medidas" && (
                  <div className="border p-3 rounded bg-gray-50 space-y-2">
                    <label>Largo</label>
                    <input
                      type="number"
                      className="border p-2 w-full rounded"
                      value={editTabla.length}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, length: Number(e.target.value) })
                      }
                    />

                    <label>Ancho</label>
                    <input
                      type="number"
                      className="border p-2 w-full rounded"
                      value={editTabla.width}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, width: Number(e.target.value) })
                      }
                    />

                    <label>Alto</label>
                    <input
                      type="number"
                      className="border p-2 w-full rounded"
                      value={editTabla.height}
                      onChange={(e) =>
                        setEditTabla({ ...editTabla, height: Number(e.target.value) })
                      }
                    />
                  </div>
                )}

              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{producto.name}</h1>
                <p className="text-2xl text-green-600">${producto.price}</p>
                <p className="whitespace-pre-line">
                 {producto.description}
                </p>


                {/* TABLAS PÚBLICAS */}
                {producto.tabla_visible === "general" && (
                  <div className="border p-4 rounded bg-gray-50 space-y-2 mt-4">
                    <p><b>Marca:</b> {producto.brand}</p>
                    <p><b>Año:</b> {producto.year}</p>
                    <p><b>Color:</b> {producto.color}</p>
                    <p><b>Kilómetros:</b> {producto.kilometers}</p>
                    <p><b>Transmisión:</b> {producto.transmission}</p>
                  </div>
                )}

                {producto.tabla_visible === "medidas" && (
                  <div className="border p-4 rounded bg-gray-50 space-y-2 mt-4">
                    <p><b>Largo:</b> {producto.length} m</p>
                    <p><b>Ancho:</b> {producto.width} m</p>
                    <p><b>Alto:</b> {producto.height} m</p>
                  </div>
                )}
              </>
            )}
<a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition"
>
  📲 Consultar por WhatsApp
</a>

            {isAdmin && (
              <div className="flex gap-2">
                {editando ? (
                  <>
                    <button
                      onClick={guardarCambios}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditando(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditando(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Editar
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      <FooderConcecionaria />
    </>
  )
}
