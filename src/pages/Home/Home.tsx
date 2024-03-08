import { useEffect, useState } from 'react';
import background from '../../assets/images/background.svg';
import backgroundMobile from '../../assets/images/background-mobile.svg';
import backgroundTablet from '../../assets/images/background-tablet.svg';

import TransactionCard from '../../components/TransactionCard';
import { Transactions } from '../../interfaces/Transaction';
import Banner from '../../components/Banner';
import Shortcut from './components/Shortcut';
import { getTransactions, sendNotification } from '../../services/api';

export default function Home() {
	const [transactions, setTransactions] = useState<Transactions[]>([]);
	const [selectedTab, setSelectedTab] = useState('Payments');
	const [subscribed, setSubscribed] = useState(false);

	const tabs = ['Payments', 'Redemptions'];

	const sendNotifications = () => {
		return async () => {
			await sendNotification();
		};
	};

	const { VITE_APP_VAPID_PUBLIC_KEY } = import.meta.env;
	const requestNotiPermission = () => {
		return async () => {
			console.log('Registering service worker...');
			await navigator.serviceWorker.register('./service-worker.js');

			await window.Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					console.log('notifications granted');
					// get service worker
					navigator.serviceWorker.ready.then(async () => {
						subscribeToPushMessages();
					});
				}
			});
			//requesting permission using Notification API
			// if ( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
			// 	window.Notification.requestPermission(() => {
			// 		postPermission(window.Notification.permission);
			// 	});
			// } else {
			// 	const permission = await window.Notification.requestPermission();
			// 	postPermission(permission as NotificationPermission);
			// }
		};
	};

	const subscribeToPushMessages = async () => {
		const serviceWorkerRegistration = await navigator.serviceWorker.ready;

		// Check if the user has an existing subscription
		let pushSubscription = await serviceWorkerRegistration.pushManager.getSubscription();
		// if (pushSubscription) {
		// 	console.log("User is already subscribed to push notifications");
		// 	setSubscribed(true);
		// 	return;
		// }

		try {
			console.log('Subscribing user to push notifications');
			// Subscribe the user to push notifications
			pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(VITE_APP_VAPID_PUBLIC_KEY),
			});
			// Send Push Notification
			console.log('Subscription created...', JSON.stringify(pushSubscription));
			// Send subscription to server (you need to implement this part)
			console.log('Registering subscription...');
			// await fetch('http://localhost:8082/register', {
				await fetch('https://tame-plum-octopus-vest.cyclic.app/register', {
				// await fetch('https://ma-pwa-server.onrender.com/register', {
				method: 'POST',
				body: JSON.stringify(pushSubscription),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log('Subscription registered...');
			setSubscribed(true);
		} catch (err) {
			// The subscription wasn't successful.
			console.log('Error', err);
		}
	};
	// Utility function for browser interoperability
	const urlBase64ToUint8Array = (base64String: string) => {
		var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

		var rawData = window.atob(base64);
		var outputArray = new Uint8Array(rawData.length);

		for (var i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			// const response = await fetch('./transactions.json');
			// const transactions = (await response.json()).data as Transactions[];
			const transactions = (await getTransactions()) ?? [];
			setTransactions(transactions);
		};

		fetchTransactions();

		return () => {};
	}, []);

	return (
		<div>
			<Banner />
			<Shortcut />
			{subscribed ? (
				<>
					<button className='font-semibold p-2 bg-white border-2 border-cyan rounded-lg text-cyan w-fit m-2'>Subscribed</button>
					<button className='font-semibold p-2 lg:mx-2 bg-cyan rounded-lg text-white w-fit' onClick={sendNotifications()}>
						Send Notifications
					</button>
				</>
			) : (
				<button className='font-semibold p-2 bg-cyan rounded-lg text-white w-fit m-2' onClick={requestNotiPermission()}>
					Subscribe to Notifications
				</button>
			)}
			<div className='relative'>
				<img src={backgroundMobile} alt='Background' className='sm:hidden absolute top-0 w-full z-[-1]' />
				<img src={backgroundTablet} alt='Background' className='hidden sm:block lg:hidden absolute top-0 w-full' />
				<img src={background} alt='Background' className='hidden lg:block absolute top-0 w-full' />
				<div className='md:container flex flex-col items-center'>
					<div className='flex gap-11 lg:gap-24 p-6 lg:p-9 z-10'>
						{tabs.map((tab) => (
							<div
								className={`uppercase cursor-pointer pb-2 font-semibold ${
									selectedTab === tab ? 'text-white border-b-[5px] border-b-cyan' : 'text-grey-light'
								}`}
								onClick={() => setSelectedTab(tab)}
								key={tab}>
								{tab}
							</div>
						))}
					</div>

					<div className='flex flex-col w-full px-6 pb-6 gap-2 md:bg-[#00000008] rounded-t-lg z-10'>
						{transactions.map((transaction, i) => {
							let isFirst = false;
							if (i === 0) isFirst = true;
							return <TransactionCard transaction={transaction} isFirst={isFirst} key={transaction.createdAt}></TransactionCard>;
						})}
					</div>
					<div className='container flex justify-center'>
						<button className='bg-white mt-4 w-full lg:w-1/2 rounded-full border-2 border-cyan text-cyan font-semibold text-xl py-2.5'>
							View Past Transactions
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
