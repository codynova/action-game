import { STORAGE_PREFIX } from 'Constants';

// Incrementing CACHE_VERSION will force install event and clear + re-cache resources
const CACHE_VERSION = 1;
const CURRENT_CACHES = {
	offline: `${STORAGE_PREFIX}-v${CACHE_VERSION}`,
};
const STYLES_URL = 'styles.css';
const OFFLINE_URL = 'offline.html';

const createCacheBustedRequest = (url: any) => {
	const request = new Request(url, { cache: 'reload' });

	if ('cache' in request) {
		return request;
	}

	const bustedUrl = new URL(url, self.location.href);
	bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();

	return new Request(bustedUrl as any);
};

self.addEventListener('install', (event: any) => {
	// Cache resources
	event.waitUntil(
		fetch(createCacheBustedRequest(OFFLINE_URL)).then(response => {
			return caches.open(CURRENT_CACHES.offline).then(cache => {
				return cache.put(OFFLINE_URL, response);
			});
		}),
		fetch(createCacheBustedRequest(STYLES_URL)).then(response => {
			return caches.open(CURRENT_CACHES.offline).then(cache => {
				return cache.put(STYLES_URL, response);
			});
		}),
	);
});

self.addEventListener('activate', (event: any) => {
	// Clear non-current caches
	const expectedCacheNames = Object.keys(CURRENT_CACHES).map(key => {
		return (CURRENT_CACHES as any)[key];
	});

	event.waitUntil(caches.keys().then((cacheNames: any) => {
		return Promise.all(cacheNames.forEach((cacheName: any) => {
			if (expectedCacheNames.indexOf(cacheName) === -1) {
				return caches.delete(cacheName);
			}
		}),);
	}));
});

self.addEventListener('fetch', (event: any) => {
	// Respond to specific fetch events with cached resources
	const request = event.request;

	if (request.mode === 'navigate'
		|| (request.method === 'GET' && request.headers.get('accept').includes('text/html'))
	) {
		event.respondWith(fetch(event.request).catch(error => {
			return caches.match(OFFLINE_URL);
		}),);
	}

	if (request.method === 'GET' && request.headers.get('accept').includes('text/css')) {
		event.respondWith(fetch(event.request).catch(error => {
			return caches.match(STYLES_URL);
		}),);
	}
});
