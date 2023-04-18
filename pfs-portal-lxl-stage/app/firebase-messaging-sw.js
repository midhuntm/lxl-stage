importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyBEpC1m0Q4tw1TgVFbKQrX2xv9AdDZI-w8',
  authDomain: 'ken42-1612766111380.firebaseapp.com',
  projectId: 'ken42-1612766111380',
  storageBucket: 'ken42-1612766111380.appspot.com',
  messagingSenderId: '819877897170',
  appId: '1:819877897170:web:74edb916d365fec08e5e0b',
  measurementId: 'G-EWVJZGMD1J',
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification('my notification title');
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});
