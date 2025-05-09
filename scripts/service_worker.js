const CACHE_NAME = "nah-later-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/courts.html",
    "/homepage.html",
    "/marketplace.html",
    "/padel_premier.html",
    "/profile.html",
    "/signin.html",
    "/signup.html",
    "/styles/courts.css",
    "/styles/homepage.css",
    "/styles/index.css",
    "/styles/marketplace.css",
    "/styles/padel_premier.css",
    "/scripts/courts.js",
    "/scripts/marketplace.js",
    "/scripts/padel_module.js",
    "/scripts/posts_module.js",
    "/scripts/users_module.js",
    "/scripts/shared_components.js",
    "/scripts/dark_light_toggle.js",
    "/images/favicon.ico",
    "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@11",
];


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {

            return response || fetch(event.request);
        })
    );
});


self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});