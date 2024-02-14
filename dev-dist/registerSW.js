if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' })
		.then(function () {
			console.log('Service worker registered');
		})
		.catch(function (err) {
			console.log(err);
		});
}

function displayConfirmNotification() {
	if ('serviceWorker' in navigator) {
		var options = {
			body: 'You successfully subscribed to Kris+ Push Notification service!',
			icon: '/public/logo192.png',
			badge: '/public/logo192.png',
			dir: 'ltr',
			lang: 'en-US',
		};
		navigator.serviceWorker.ready.then(function (swreg) {
			new Notification('Kris+!', options);
		});
	}
}

if (!('PushManager' in window)) {
	console.log('No Push API Support!');
} else if (Notification.permission !== 'denied') {
	Notification.requestPermission().then(function (permission) {
		if (permission == 'granted') {
			console.log('Permission granted for Notification');
			displayConfirmNotification();
		}
	});
}
