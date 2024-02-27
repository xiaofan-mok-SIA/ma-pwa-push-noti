import axios from 'axios';
import { Transactions } from '../interfaces/Transaction';

const { VITE_SERVER_URL } = import.meta.env;

export async function getTransactions(): Promise<Transactions[] | null> {
	try {
		const response = await axios.get(`${VITE_SERVER_URL}/transactions`);
		// console.log(response);
		return response.data.data as Transactions[];
	} catch (error) {
		console.error('Error calling getTransactions:', error);
		return null;
	}
}

export async function sendNotification(): Promise<void> {
	try {
		const response = await axios.get(`${VITE_SERVER_URL}/send-notification`);
		console.log(response);
	} catch (error) {
		console.error('Error calling sendNotification:', error);
	}
}

