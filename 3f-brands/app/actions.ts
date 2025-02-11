'use server'

import webpush from 'web-push'
import fs from 'fs'
import path from 'path'

type SerializedPushSubscription = {
  endpoint: string
  expirationTime: number | null
  keys: {
    p256dh: string
    auth: string
  }
}

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  throw new Error('VAPID keys must be set')
}

webpush.setVapidDetails(
  'mailto:sghavamzadeh46@gmail.com',  // Replace with your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'subscriptions.json')

function readSubscriptions(): SerializedPushSubscription[] {
  try {
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const data = fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading subscriptions:', error)
  }
  return []
}

function writeSubscriptions(subscriptions: SerializedPushSubscription[]) {
  try {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions))
  } catch (error) {
    console.error('Error writing subscriptions:', error)
  }
}

export async function subscribeUser(subscription: SerializedPushSubscription) {
  try {
    const subscriptions = readSubscriptions()
    const exists = subscriptions.find(
      (s) => s.endpoint === subscription.endpoint
    )
    
    if (!exists) {
      subscriptions.push(subscription)
      writeSubscriptions(subscriptions)
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error in subscribeUser:', error)
    throw error
  }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    const subscriptions = readSubscriptions()
    const filteredSubs = subscriptions.filter(
      (sub) => sub.endpoint !== endpoint
    )
    writeSubscriptions(filteredSubs)
    return { success: true }
  } catch (error) {
    console.error('Error in unsubscribeUser:', error)
    throw error
  }
}

export async function sendNotification(message: string) {
  const subscriptions = readSubscriptions()
  
  if (subscriptions.length === 0) {
    throw new Error('No subscriptions available')
  }

  console.log('Sending notification to subscriptions:', subscriptions.length)

  const results = await Promise.allSettled(
    subscriptions.map(async (subscription) => {
      try {
        const payload = JSON.stringify({
          title: 'Test Notification',
          body: message,
          // icon: '/icon.png',
        })
        
        console.log('Sending to endpoint:', subscription.endpoint)
        const result = await webpush.sendNotification(subscription, payload)
        console.log('Push service response:', result)
        
        return { success: true, endpoint: subscription.endpoint }
      } catch (error: any) {
        console.error('Error sending push notification:', {
          endpoint: subscription.endpoint,
          error: error.message,
          statusCode: error.statusCode,
          body: error.body,
          headers: error.headers
        })
        return { success: false, endpoint: subscription.endpoint, error }
      }
    })
  )

  // Log results
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Result ${index}:`, result.value)
    } else {
      console.error(`Failed result ${index}:`, result.reason)
    }
  })

  // Clean up failed subscriptions
  const failedEndpoints = results
    .filter((result) => 
      result.status === 'fulfilled' && !result.value.success
    )
    .map((result) => 
      (result.status === 'fulfilled' ? result.value.endpoint : null)
    )
    .filter((endpoint): endpoint is string => endpoint !== null)

  if (failedEndpoints.length > 0) {
    console.log('Cleaning up failed endpoints:', failedEndpoints)
    const subscriptions = readSubscriptions()
    const validSubs = subscriptions.filter(
      (sub) => !failedEndpoints.includes(sub.endpoint)
    )
    writeSubscriptions(validSubs)
  }

  return { success: true }
}
