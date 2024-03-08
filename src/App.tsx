import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar';
import { onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebase';

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

	async function main() {
		checkServiceWorker();
		const sw = await registerServiceWorker();
		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			sw.showNotification(payload.notification?.title ?? "Title", {
				body: payload.notification?.body ?? "Body",
				icon: 'https://www.singaporeair.com/saar5/images/ppsclub-krisflyer/Krisplus/logo-w-outline-3x.png',
				badge: 'https://www.singaporeair.com/saar5/images/ppsclub-krisflyer/Krisplus/logo-w-outline-3x.png'
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
