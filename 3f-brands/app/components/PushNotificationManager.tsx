'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '../actions'
import { urlBase64ToUint8Array } from '../utils'

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    } else {
      setError('Push notifications are not supported in this browser')
    }
  }, [])

  async function registerServiceWorker() {
    try {
      // First, unregister any existing service workers
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })

      // Wait for the service worker to be activated
      if (registration.installing) {
        console.log('Service worker installing')
        await new Promise<void>((resolve) => {
          registration.installing?.addEventListener('statechange', (e) => {
            if ((e.target as ServiceWorker).state === 'activated') {
              resolve()
            }
          })
        })
      }

      console.log('Service Worker registered and activated:', registration)

      // Check for existing subscription
      const sub = await registration.pushManager.getSubscription()
      console.log('Current subscription:', sub)
      setSubscription(sub)

      if (sub) {
        // If we have a subscription, make sure it's registered with the server
        const serializedSub = {
          endpoint: sub.endpoint,
          expirationTime: sub.expirationTime,
          keys: {
            p256dh: sub.toJSON().keys!.p256dh,
            auth: sub.toJSON().keys!.auth,
          },
        }
        await subscribeUser(serializedSub)
      }
    } catch (err) {
      console.error('Error registering service worker:', err)
      setError('Failed to register service worker')
    }
  }

  async function subscribeToPush() {
    try {
      setIsLoading(true)
      setError(null)

      if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        throw new Error('VAPID public key not found')
      }

      const registration = await navigator.serviceWorker.ready
      console.log('Subscribing to push...')

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      })

      console.log('Push subscription successful:', sub)
      setSubscription(sub)

      const serializedSub = {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        keys: {
          p256dh: sub.toJSON().keys!.p256dh,
          auth: sub.toJSON().keys!.auth,
        },
      }

      await subscribeUser(serializedSub)
      console.log('Subscription saved to server')
    } catch (err: any) {
      console.error('Error subscribing to push:', err)
      setError(`Failed to subscribe: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function unsubscribeFromPush() {
    try {
      setIsLoading(true)
      setError(null)
      if (subscription) {
        await subscription.unsubscribe()
        await unsubscribeUser(subscription.endpoint)
        setSubscription(null)
      }
    } catch (err: any) {
      console.error('Error unsubscribing from push:', err)
      setError('Failed to unsubscribe from push notifications')
    } finally {
      setIsLoading(false)
    }
  }

  async function sendTestNotification() {
    try {
      setIsLoading(true)
      setError(null)
      
      if (!subscription) {
        throw new Error('No active subscription found')
      }
      
      await sendNotification(message)
      setMessage('')
    } catch (err: any) {
      console.error('Error sending notification:', err)
      setError(`Failed to send notification: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Push Notifications</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {subscription ? (
        <>
          <p className="mb-4">You are subscribed to push notifications.</p>
          <button
            onClick={unsubscribeFromPush}
            disabled={isLoading}
            className="bg-red-500 text-white px-4 py-2 rounded mr-4 disabled:opacity-50"
          >
            {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
          </button>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 mr-2 rounded"
            />
            <button
              onClick={sendTestNotification}
              disabled={isLoading || !message}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Test'}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4">You are not subscribed to push notifications.</p>
          <button
            onClick={subscribeToPush}
            disabled={isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </>
      )}
    </div>
  )
}