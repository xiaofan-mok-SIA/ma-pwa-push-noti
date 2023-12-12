export interface Transaction {
	_id: string;
	createdAt: string;
	pos: string;
	amount: number;
	currency: string;
}

export interface Transactions {
	createdAt: string;
	transactions: Transaction[]
}