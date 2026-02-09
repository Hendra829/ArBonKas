const CACHE_NAME = 'arbonkas-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('./index.html').then(
          response =>
            response ||
            new Response('Anda sedang offline. Halaman hanya tersedia jika sudah tersimpan di cache.', {
              status: 503,
            })
        )
      )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(response =>
      response ||
      fetch(request).catch(() =>
        new Response('Resource tidak tersedia saat offline. Silakan coba lagi ketika online.', { status: 503 })
      )
    )
  );
});
