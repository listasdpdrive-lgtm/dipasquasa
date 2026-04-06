self.addEventListener("install", (event) => {
  console.log("SW instalado")
})

self.addEventListener("activate", (event) => {
  console.log("SW activo")
})

self.addEventListener("fetch", (event) => {
  // básico por ahora
})