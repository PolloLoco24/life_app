// Lets the app open without internet. Bump VERSION when you change index.html.
const VERSION = 'planner-v19';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './logos/dbacks.svg', './logos/brewers.svg', './logos/wwe.svg', './logos/aew.svg', './logos/nintendo.svg', './logos/playstation.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first for the app itself (so updates show up), cache as backup when offline.
// 'no-cache' makes the phone ask GitHub every time instead of reusing its 10-minute copy.
// (Fetching by URL because a navigation Request can't be re-created with new options.)
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request.url, { cache: 'no-cache' })
      .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
