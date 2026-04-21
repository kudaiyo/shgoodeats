const CACHE_NAME = 'shgoodeats-v8';
const ASSETS = [
  '/shgoodeats/',
  '/shgoodeats/index.html',
  '/shgoodeats/style.css',
  '/shgoodeats/app.js',
  '/shgoodeats/i18n.js',
  '/shgoodeats/restaurants.js',
  '/shgoodeats/hlg.jpg',
  '/shgoodeats/hlg-photo.jpg',
  '/shgoodeats/hlg-avatar.svg',
  '/shgoodeats/dragonfruit.svg',
  '/shgoodeats/rating-icon.png',
  '/shgoodeats/lj.jpg',
  '/shgoodeats/guestbook.js',
  '/shgoodeats/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
