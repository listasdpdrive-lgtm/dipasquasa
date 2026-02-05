import { Suspense } from "react"
import ProductosClient from "./ProductosClient"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="p-10">Cargando productos...</div>}>
      <ProductosClient />
    </Suspense>
  )
}
