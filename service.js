
const cacheName = 'Salat';
const staticAssets = [
    // './',
    './index.html',
    './PrayTimes.js',
    './orbitron-light.ttf',
    './NeoFobia-BoldItalic.ttf',
    './script.js',
    './styles.css'
];


//caching necessary files
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

//update service worker
self.addEventListener('activate', e => {
    self.clients.claim();
});

//fetch data from network
self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

//open from cache data
async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}


//get back to network
async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
  try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}
