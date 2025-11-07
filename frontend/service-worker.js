const CACHE = 'phase3-cache-v1'
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/index.html'])))
})
self.addEventListener('fetch', (event)=>{
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  )
})
