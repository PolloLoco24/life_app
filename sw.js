// Lets the app open without internet. Bump VERSION when you change index.html.
const VERSION = 'planner-v23';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png',
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
// If GitHub takes longer than NET_WAIT_MS, open the saved copy; the network answer still
// refreshes the cache in the background so the next open is up to date.
const NET_WAIT_MS = 3000;
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const net = fetch(e.request.url, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
    return res;
  });
  const saved = () => caches.match(e.request).then(r => r || caches.match('./index.html'));
  e.respondWith(new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; clearTimeout(timer); resolve(r); } };
    const timer = setTimeout(() => saved().then(finish), NET_WAIT_MS);
    net.then(res => res.ok ? finish(res) : saved().then(r => finish(r || res)),
             () => saved().then(r => finish(r || Response.error())));
  }));
  e.waitUntil(net.catch(() => {}));
});
