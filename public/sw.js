self.addEventListener("install", (event) => {
  console.log("SW instalado")
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (event) => {
  console.log("SW activo")
  event.waitUntil(clients.claim())
})

self.addEventListener("push", (event) => {
  let payload = {}
  try { payload = event.data ? event.data.json() : {} } catch { payload = { body: event.data?.text() || "" } }
  const title = payload.title || "Aviso de tu cuenta Di Pasqua"
  event.waitUntil(self.registration.showNotification(title, {
    body: payload.body || "Tienes una actualización en tu cuenta.",
    icon: "/logoC.png",
    badge: "/logoC.png",
    data: { url: payload.url || "/cliente/cuenta" },
  }))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const targetUrl = event.notification.data?.url || "/cliente/cuenta"
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      const accountWindow = windows.find((client) => new URL(client.url).pathname.startsWith("/cliente/cuenta"))
      if (accountWindow) return accountWindow.focus()
      return clients.openWindow(targetUrl)
    })
  )
})

self.addEventListener("fetch", (event) => {
  // básico por ahora
})
