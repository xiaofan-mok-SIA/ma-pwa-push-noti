import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar';
import { getToken, onMessage } from 'firebase/messaging';
import { db, messaging } from './firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default function App() {
	const checkServiceWorker = () => {
		if (!('serviceWorker' in navigator)) {
			throw new Error('No Service Worker support!');
		}
		if (!('PushManager' in window)) {
			console.warn("Push messaging isn't supported.");
			return;
		}
	};

	const registerServiceWorker = async () => {
		const swRegistration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
		console.log('sw registered');
		return swRegistration;
	};

	const { VITE_APP_VAPID_KEY } = import.meta.env;
	const requestNotificationPermission = async () => {
		//requesting permission using Notification API
		const permission = await Notification.requestPermission();

		if (permission === 'granted') {
			console.log('granted');
			const token = await getToken(messaging, {
				vapidKey: VITE_APP_VAPID_KEY,
			});
			console.log('Token generated : ', token);
			// add token to db
			await setDoc(doc(db, 'tokens', token), {});
		} else if (permission === 'denied') {
			//notifications are blocked
			alert('You denied for the notification');
		}
	};

	async function main() {
		checkServiceWorker();
		const sw = await registerServiceWorker();
		await requestNotificationPermission();
		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			sw.showNotification(payload.notification?.title ?? "Title", {
				body: payload.notification?.body ?? "Body",
			});
		});
	}

	main();

	return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

function Layout() {
	return (
		<div className='text-base'>
			<Navbar />
			<Outlet />
		</div>
	);
}
