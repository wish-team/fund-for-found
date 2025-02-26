self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated')
  event.waitUntil(clients.claim())
})

self.addEventListener('push', (event) => {
  console.log('Push event received!');
  
  try {
    const data = event.data?.text();
    console.log('Raw push data:', data);
    
    let parsedData;
    try {
      parsedData = event.data?.json() ?? {};
      console.log('Parsed notification data:', parsedData);
    } catch (e) {
      console.error('Error parsing push data:', e);
      parsedData = {
        title: 'New Notification',
        body: data
      };
    }
    
    // Create notification options without icon
    const notificationOptions = {
      body: parsedData.body ?? 'No message provided',
      tag: 'test-notification',
      requireInteraction: true,
      data: parsedData
    };
    
    event.waitUntil(
      self.registration.showNotification(parsedData.title ?? 'Notification', notificationOptions)
        .then(() => {
          console.log('Notification shown successfully');
        }).catch(error => {
          console.error('Error showing notification:', error);
        })
    );
  } catch (error) {
    console.error('Error in push event handler:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  event.notification.close()
  
  // Add custom click handling here if needed
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      if (clientList.length > 0) {
        clientList[0].focus()
      } else {
        clients.openWindow('/')
      }
    })
  )
})
