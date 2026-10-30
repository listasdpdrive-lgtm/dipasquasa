import webpush from "web-push"

export type PushPayload = { title: string; body: string; url?: string }
export type PushSubscriptionJson = {
  endpoint: string
  expirationTime?: number | null
  keys: { p256dh: string; auth: string }
}

export function configureWebPush() {
  const subject = process.env.WEB_PUSH_SUBJECT
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY
  if (!subject || !publicKey || !privateKey) {
    throw new Error("Falta configurar WEB_PUSH_SUBJECT, NEXT_PUBLIC_VAPID_PUBLIC_KEY o VAPID_PRIVATE_KEY.")
  }
  webpush.setVapidDetails(subject, publicKey, privateKey)
  return { publicKey }
}

export async function sendPush(subscription: PushSubscriptionJson, payload: PushPayload) {
  configureWebPush()
  await webpush.sendNotification(subscription, JSON.stringify(payload), { TTL: 60 * 60 })
}

export function isAllowedPushEndpoint(endpoint: string) {
  try {
    const url = new URL(endpoint)
    return url.protocol === "https:" && [
      "fcm.googleapis.com",
      "updates.push.services.mozilla.com",
      "web.push.apple.com",
    ].some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))
  } catch {
    return false
  }
}
