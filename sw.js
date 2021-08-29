var CACHE_NAME = 'v0.2';
var urlsToCache = [
    'index.html',
    'favicon.ico',
    'manifest.json',
    'style.css',
    'android/android-launchericon-48-48.png',
    'android/android-launchericon-72-72.png',
    'android/android-launchericon-96-96.png',
    'android/android-launchericon-144-144.png',
    'android/android-launchericon-192-192.png',
    'android/android-launchericon-512-512.png', ,
    'maskable_icon_x192.png'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

self.addEventListener('activate', function (event) {

    var cacheAllowlist = ['v0.2'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
