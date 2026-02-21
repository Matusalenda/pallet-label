const CACHE_NAME = "Rostinho-v6";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./src/css/style.css",
  "./src/css/label.css",
  "./src/JS/main.js",
  "./src/JS/lib/qrcode-lib.js",
  "./src/JS/modules/keyboard.js",
  "./src/JS/modules/printData.js",
  "./src/JS/modules/state.js",
  "./src/JS/modules/utils.js",
  "./src/JS/modules/view1.js",
  "./src/JS/modules/view2.js",
  "./src/img/icon-192.svg",
  "./src/img/icon-512.svg",
  "./src/img/toyota-logo.png",
];

// Instalar o service worker e cachear os arquivos
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Cacheando arquivos");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()), // Ativa imediatamente
  );
});

// Ativar o service worker e limpar caches antigos
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Ativando...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log(
                "[Service Worker] Removendo cache antigo:",
                cacheName,
              );
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()), // Toma controle imediatamente
  );
});

// Interceptar requisições - strategy: Cache First (busca no cache primeiro)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Retorna do cache e atualiza em background
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }
      // Se não estiver no cache, busca da rede
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    }),
  );
});
