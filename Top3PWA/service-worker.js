﻿var cacheName = 'Top3-v1.0';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/scripts.js',
    '/css/inline.css',
    '/css/bootstrap-reboot.css',
    '/css/bootstrap-reboot.css.map',
    '/css/bootstrap-reboot.min.css',
    '/css/bootstrap-reboot.min.css.map',
    '/css/DailyTableFormat.css',
    '/css/DisplayTop3.css',
    '/css/inline.css',
    '/css/AddTop3.css',
    '/css/bootstrap.css',
    '/css/bootstrap.css.map',
    '/css/bootstrap.min.css',
    '/css/bootstrap.min.css.map',
    '/css/bootstrap-grid.css',
    '/css/bootstrap-grid.css.map',
    '/css/bootstrap-grid.min.css',
    '/css/bootstrap-grid.min.css.map',
    '/fonts/glyphicons-halflings-regular.woff',
    '/fonts/glyphicons-halflings-regular.woff2',
    '/fonts/glyphicons-halflings-regular.eot',
    '/fonts/glyphicons-halflings-regular.svg',
    '/fonts/glyphicons-halflings-regular.ttf',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
