import { STORAGE_PREFIX } from 'Constants';

export class StorageService {

	private static instance: StorageService;

	private constructor () {}

	static getInstance () {
		if (!StorageService.instance) {
			StorageService.instance = new StorageService();
		}

		return StorageService.instance;
	}

	getSessionItem (key: string): any {
		const storedValue = sessionStorage.getItem(STORAGE_PREFIX + key);

		return storedValue ? JSON.parse(storedValue) : null;
	}

	setSessionItem (key: string, value: any) {
		sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
	}

	deleteSessionItem (key: string) {
		sessionStorage.removeItem(STORAGE_PREFIX + key);
	}

	getLocalItem (key: string): any {
		const storedValue = localStorage.getItem(STORAGE_PREFIX + key);

		return storedValue ? JSON.parse(storedValue) : null;
	}

	setLocalItem (key: string, value: any) {
		localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
	}

	deleteLocalItem (key: string) {
		localStorage.removeItem(STORAGE_PREFIX + key);
	}

	setCookie (key: string, value: any, maxAgeSeconds?: number, expirationGMTString?: string) {
		document.cookie = `${encodeURIComponent(STORAGE_PREFIX + key)}=${encodeURIComponent(JSON.stringify(value))}${maxAgeSeconds ? `;max-age=${maxAgeSeconds}` : ''}${expirationGMTString ? `;expires=${expirationGMTString}` : ''}`;
	}

	getCookie (key: string): any {
		const cookie = document.cookie.split(';').find(cookieString => decodeURIComponent(cookieString).includes(STORAGE_PREFIX + key));
		const cookieValue = cookie ? cookie.replace(STORAGE_PREFIX + key + '=', '').trimStart() : undefined;

		return cookieValue ? JSON.parse(cookieValue) : null;
	}

	deleteCookie (key: string) {
		this.setCookie(key, '');
	}

}

export default StorageService.getInstance();
