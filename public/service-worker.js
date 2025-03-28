self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
  
    // Espera hasta que la caché sea instalada
    event.waitUntil(
      caches.open("my-cache").then((cache) => {
        return cache.addAll([
          "/",
          "/manifest.json",
          "/icons/icon-192x192.png",
          "/icons/icon-512x512.png",
          // Aquí puedes agregar más rutas estáticas que quieras cachear
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Devuelve el contenido cacheado si está disponible, o realiza la solicitud
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            // Actualiza la caché con la respuesta obtenida
            if (event.request.url.startsWith(self.location.origin)) {
              caches.open("my-cache").then((cache) => {
                cache.put(event.request, response.clone());
              });
            }
            return response;
          })
        );
      })
    );
  });
  