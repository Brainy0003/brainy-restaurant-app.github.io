// static cache versions

const staticCacheName = 'restaurant-reviews-v1';


self.addEventListener('install', event => {

 self.skipWaiting();

 event.waitUntil(

   caches.open(staticCacheName).then(cache => {

     return cache.addAll([
          'index.html',
          'restaurant.html',
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'img/10.jpg',
          'js/dbhelper.js',
          'js/main.js',
          'js/restaurant_info.js',
          'data/restaurant.json',
          'css/styles.css',
     ]);

   })

 );

});


self.addEventListener('activate', event => {

 event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.filter(cacheName => cacheName.startsWith('currency-converter-') && cacheName != staticCacheName).map(cacheName => caches['delete'](cacheName)))));

});



//fetch cache

self.addEventListener('fetch', event => {

  event.respondWith(caches.match(event.request)

  .then(response => response || fetch(event.request)

.then(response => caches.open('currency-converter-v1')

    .then(cache => {

      cache.put(event.request, response.clone());

      return response;

    })).catch(event => {

    console.log('Service Worker error caching and fetching');

  }))

);

});
