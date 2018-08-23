// static cache versions

const staticCacheName = 'restaurant-reviews-v1';


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
          '/',
      ]);
    })
  );
});


self.addEventListener('activate', event => {
event.waitUntil(clients.claim());
});


//fetch cache
self.addEventListener('fetch', function(event) {

  //avoid chrome extensions erros
  if(!event.request.url.includes("chrome-extension")){

    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        
        if(!cachedResponse){

          //fetch onlineResponse
          return fetch(event.request).then(onlineResponse => {

            const clonedOnlineResponse = onlineResponse.clone();

            //add onlineResponse to caches
            caches.open("restaurant-reviews-v1").then(cache => {  
              cache.put(event.request.url, clonedOnlineResponse);
            });

            return onlineResponse;
          }).catch(e => {
            console.log(e);
          });
          
        }

        return cachedResponse;
      })
    );
    
  }


});