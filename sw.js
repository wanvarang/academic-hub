// Cache-first for the app shell, network-first for everything else (fonts) with cache fallback.
// Bump VERSION whenever index.html changes so installed apps refresh.
var VERSION = "v11";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open("shell-" + VERSION).then(function (c) { return c.addAll(SHELL); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== "shell-" + VERSION && k !== "runtime"; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin === location.origin) {
    // Stale-while-revalidate for own files so edits reach users on the next open.
    e.respondWith(caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open("shell-" + VERSION).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    }));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.host)) {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open("runtime").then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () { return caches.match(req); }));
  }
});
