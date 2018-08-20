// static cache versions

const staticCacheName = 'restaurant-reviews-v1';


self.addEventListener('install', event => {

self.skipWaiting();

event.waitUntil(

  caches.open(staticCacheName).then(cache => {

    return cache.addAll([

       './index.html',
       './restaurant.html',
       './img/1.jpg',
       './img/2.jpg',
       './img/3.jpg',
       './img/4.jpg',
       './img/5.jpg',
       './img/6.jpg',
       './img/7.jpg',
       './img/8.jpg',
       './img/9.jpg',
       './img/10.jpg',
       './js/dbhelper.js',
       './js/main.js',
       './js/restaurant_info.js',
       './data/restaurants.json',
       './css/styles.css'


    ]);
  })
);
});


self.addEventListener('activate', event => {
event.waitUntil(clients.claim());
});


//fetch cache

self.addEventListener('fetch', event => {

 event.respondWith(caches.match(event.request)

 .then(response => {
  return response || fetch(event.request);
 })
.catch(event => {

   console.log('Service Worker error caching and fetching');

 }))



});