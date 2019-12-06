import React from 'react';
import { render } from 'react-dom';
import { SERVICE_WORKER_URL } from 'Constants';
import App from './App';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register(SERVICE_WORKER_URL).then(
			registration => console.log('ServiceWorker registration successful with scope: ', registration.scope),
			error => console.log('ServiceWorker registration failed: ', error),
		);
	});
}

render(<App />, document.getElementById('app'));
