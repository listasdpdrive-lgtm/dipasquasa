# Notificaciones push de cuenta

La app usa Web Push con VAPID. Las suscripciones se guardan en Redis bajo la cuenta autenticada y se eliminan automáticamente cuando el proveedor responde que ya vencieron.

## Variables de entorno

`.env.local` ya recibió claves VAPID y un `CRON_SECRET` generado para desarrollo local. No subas ese archivo al repositorio. En Vercel configura estas mismas variables para Production:

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY` (secreto)
- `WEB_PUSH_SUBJECT` (por ejemplo `mailto:dipasquarepuestos@gmail.com`)
- `CRON_SECRET` (secreto aleatorio largo)
- `REDIS_URL` o `DATABASE_REDIS_URL` (ya usado por las cuentas)

Para generar otra pareja VAPID ejecuta `npx web-push generate-vapid-keys`. La clave pública y privada deben pertenecer a la misma pareja; después de cambiarlas, los dispositivos deben volver a suscribirse.

## Activar y probar

Despliega la app, inicia sesión desde el dispositivo y usa **Activar notificaciones**. El botón **Enviar notificación de prueba** llama al servidor y comprueba el envío Web Push real.

El cron configurado en `vercel.json` revisa los saldos diariamente a las 12:00 UTC. Vercel Hobby permite una ejecución diaria. Si se necesita avisar dentro de la hora en que se cruza el umbral, usa un plan que admita cron más frecuente y cambia el horario, por ejemplo `0 * * * *` (cada hora) o `*/15 * * * *` (cada 15 minutos).

En iPhone/iPad, el sitio debe agregarse a la pantalla de inicio para recibir Web Push; en Android se puede instalar la PWA o habilitar el push desde un navegador compatible. El permiso del sistema y una conexión de datos siguen siendo necesarios.
