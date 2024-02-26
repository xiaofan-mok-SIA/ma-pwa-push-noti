import axios from 'axios';
import { Transactions } from '../interfaces/Transaction';

export async function getTransactions(): Promise<Transactions[] | null> {
	try {
		const response = await axios.get('http://localhost:8082/transactions');
		// console.log(response);
		return response.data.data as Transactions[];
	} catch (error) {
		console.error('Error calling getTransactions:', error);
		return null;
	}
}

export async function sendNotification(): Promise<void> {
	try {
		const response = await axios.get('http://localhost:8082/send-notification');
		console.log(response);
	} catch (error) {
		console.error('Error calling sendNotification:', error);
	}
}

