import { useEffect, useState } from 'react';
import background from '../../assets/images/background.svg';
import backgroundMobile from '../../assets/images/background-mobile.svg';
import backgroundTablet from '../../assets/images/background-tablet.svg';

import TransactionCard from '../../components/TransactionCard';
import { Transactions } from '../../interfaces/Transaction';
import Banner from '../../components/Banner';
import Shortcut from './components/Shortcut';
import { getTransactions, sendNotification } from '../../services/api';
import { getToken } from 'firebase/messaging';
import { db, messaging } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

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

	const { VITE_APP_VAPID_KEY } = import.meta.env;
	const requestNotiPermission = () => {
		return async () => {
			//requesting permission using Notification API
			if ( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
				window.Notification.requestPermission(() => {
					postPermission(window.Notification.permission);
				});
			} else {
				const permission = await window.Notification.requestPermission();
				postPermission(permission as NotificationPermission);
			}

		};
	}

	const postPermission = async (permission: NotificationPermission) => {
		if (permission === 'granted') {
			console.log('granted');
			const token = await getToken(messaging, {
				vapidKey: VITE_APP_VAPID_KEY,
			});
			console.log('Token generated : ', token);
			// add token to db
			await setDoc(doc(db, 'tokens', token), {
				token,
			});
			setSubscribed(true);
		} else if (permission === 'denied') {
			//notifications are blocked
			alert('You denied for the notification');
		}
	}

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
			{subscribed ? <div>Subscribed</div> : <button className='font-semibold p-2 lg:mx-2 bg-cyan rounded-lg text-white w-fit m-2' onClick={requestNotiPermission()}>Subscribe to Notifications</button>}
			<br/>
			<button className='font-semibold p-2 lg:mx-2 bg-cyan rounded-lg text-white w-fit my-2' onClick={sendNotifications()}>Send Notifications</button>
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
