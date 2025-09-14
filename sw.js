// sw.js
const STATIC_CACHE = 'static-v11';
const APP_SHELL = [
  './',
  './index.html',
  './contact.html',
  './style/output.css',
  './script.js',
  './images/logo.png',
  './images/icons/icon-192.png',
  './images/icons/icon-512.png',
  './images/Gemini_Generated_Image_200n05200n05200n.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .filter(k => k !== STATIC_CACHE)
      .map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1) درخواست‌های خارجی (مثل dummyjson) را اصلاً هندل نکن
  if (url.origin !== self.location.origin) return;

  // 2) HTML: network-first + fallback
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(req, net.clone());
        return net;
      } catch {
        const cache = await caches.open(STATIC_CACHE);
        return (await cache.match(req)) || (await cache.match('./index.html'));
      }
    })());
    return;
  }

  // 3) استاتیک‌ها: cache-first با catch
  if (['style','script','image','font'].includes(req.destination)) {
    event.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        if (res.ok && res.type === 'basic') {
          caches.open(STATIC_CACHE).then(c => c.put(req, res.clone()));
        }
        return res;
      })).catch(() => Response.error())
    );
  }
});
