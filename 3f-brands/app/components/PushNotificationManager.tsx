import { useState, useEffect } from "react"
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'

// Utility function for converting VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSupport = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsSupported(true)
        try {
          await registerServiceWorker()
        } catch (err) {
          setError('Failed to register service worker')
          console.error(err)
        }
      }
    }
    checkSupport()
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (err) {
      throw new Error('Service Worker registration failed')
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      setSubscription(sub)
      await subscribeUser(sub)
      setError(null)
    } catch (err) {
      setError('Failed to subscribe to push notifications')
      console.error(err)
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
      setError(null)
    } catch (err) {
      setError('Failed to unsubscribe from push notifications')
      console.error(err)
    }
  }

  async function sendTestNotification() {
    if (!subscription) {
      setError('No active subscription')
      return
    }
    try {
      await sendNotification(message)
      setMessage('')
      setError(null)
    } catch (err) {
      setError('Failed to send notification')
      console.error(err)
    }
  }

  if (!isSupported) {
    return <div className="p-4 bg-yellow-100 rounded">
      <p>Push notifications are not supported in this browser.</p>
    </div>
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-xl font-bold">Push Notifications</h3>
      {error && (
        <div className="p-2 text-red-600 bg-red-100 rounded">
          {error}
        </div>
      )}
      {subscription ? (
        <div className="space-y-4">
          <p className="text-green-600">You are subscribed to push notifications.</p>
          <button 
            onClick={unsubscribeFromPush}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Unsubscribe
          </button>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button 
              onClick={sendTestNotification}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Test
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not subscribed to push notifications.</p>
          <button 
            onClick={subscribeToPush}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  )
}