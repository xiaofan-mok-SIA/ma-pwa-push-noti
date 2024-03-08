self.addEventListener('activate', async () => {
	console.log('sw activated');
});

self.addEventListener('push', function (event) {
	if (event.data) {
		const payload = event.data?.text() ?? 'no payload';
		event.waitUntil(
			self.registration.showNotification('Kris+ MA Push Notification', {
				body: payload,
				icon: './logo192.png',
				image: './assets/image.png',
				badge: './assets/badge.png',
			}),
		);
		// console.log('Push event!! ', event.data.text());
		// showLocalNotification('Yolo', event.data.text(), self.registration);
	} else {
		console.log('Push event but no data');
	}
});

const showLocalNotification = (title, body, swRegistration) => {
	const options = {
		body,
		// here you can add more properties like icon, image, vibrate, etc.
	};
	swRegistration.showNotification(title, options);
};
