const CACHE_NAME = "label-master-v4";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./src/css/style.css",
  "./src/JS/main.js",
  // label.css e qrcode-lib.js carregados sob demanda (lazy)
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

// Interceptar requisições - strategy: Network First (busca online primeiro)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se conseguiu da rede, atualiza o cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Se falhar (offline), tenta buscar do cache
        console.log("[Service Worker] Offline - usando cache");
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback para index.html se não encontrar no cache
          return caches.match("./index.html");
        });
      }),
  );
});
