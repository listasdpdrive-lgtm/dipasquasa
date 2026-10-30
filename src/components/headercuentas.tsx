"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LogOut, Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export type HeaderCuentasItem = {
  id: string
  label: string
}

type HeaderCuentasProps = {
  items?: HeaderCuentasItem[]
  activeSection?: string
  accountName?: string
  onSelectSection?: (section: string) => void
  onLogout?: () => void
  isLoggingOut?: boolean
}

const defaultItems: HeaderCuentasItem[] = [
  { id: "resumen", label: "Resumen" },
  { id: "datos", label: "Datos de la cuenta" },
  { id: "remitos", label: "Facturas" },
]

export function Headercuentas({
  items = defaultItems,
  activeSection,
  accountName,
  onSelectSection,
  onLogout,
  isLoggingOut = false,
}: HeaderCuentasProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSelect = (section: string) => {
    onSelectSection?.(section)
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleSelect("resumen")}
          className="flex items-center gap-3 text-left"
          aria-label="Volver al resumen"
        >
          <div className="relative h-10 w-28 overflow-hidden rounded-lg bg-white sm:h-12 sm:w-36">
            <Image
              src="/images/dipascualogo2.png"
              alt="Di Pasqua"
              width={360}
              height={620}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Portal
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {accountName || "Mi cuenta"}
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {items.map((item) => {
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        {onLogout && (
          <div className="hidden items-center lg:flex">
            <Button
              type="button"
              variant="outline"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="border-slate-200 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
            </Button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
              {items.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={[
                      "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                )
              })}

              {onLogout && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onLogout()
                    setIsMenuOpen(false)
                  }}
                  disabled={isLoggingOut}
                  className="mt-2 w-full border-slate-200 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                </Button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
