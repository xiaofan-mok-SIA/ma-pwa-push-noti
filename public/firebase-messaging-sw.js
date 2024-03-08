// Service Worker
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// importScripts('./service-worker.js');

const firebaseConfig = {
	apiKey: 'AIzaSyAsXCV7E_ggOpC_LwyZrYsKRTopTSCSoFk',
	authDomain: 'ma-pwa-test.firebaseapp.com',
	projectId: 'ma-pwa-test',
	storageBucket: 'ma-pwa-test.appspot.com',
	messagingSenderId: '128529938177',
	appId: '1:128529938177:web:4f239b7c7fc6a3eedfcd00',
};
console.log('firebase sw');
// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.',
		icon: 'https://www.singaporeair.com/saar5/images/ppsclub-krisflyer/Krisplus/logo-w-outline-3x.png',
		badge: 'https://www.singaporeair.com/saar5/images/ppsclub-krisflyer/Krisplus/logo-w-outline-3x.png'
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
