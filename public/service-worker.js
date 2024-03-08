self.addEventListener('activate', async () => {
	console.log('sw activated');
});

self.addEventListener('push', function (event) {
	console.log("received push notification")
	if (event.data) {
		const payload = event.data?.text() ?? 'no payload';
		event.waitUntil(
			self.registration.showNotification('Kris+ MA Push Notification', {
				body: payload,
				icon: 'https://www.singaporeair.com/saar5/images/ppsclub-krisflyer/Krisplus/logo-w-outline-3x.png',
				image: 'https://www.singaporeair.com/saar5/images/ppsclub-krisflyer/Krisplus/mainpage/multiplyrewards.jpg',
				badge: 'https://firebasestorage.googleapis.com/v0/b/ma-pwa-test.appspot.com/o/kitty%20(1).png?alt=media&token=5e5316b1-ea0c-44e5-b63e-571382b49836',
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
