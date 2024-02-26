import { useEffect, useState } from 'react';
import { Transactions } from '../../interfaces/Transaction';
import { DateTime } from 'luxon';
import transactionTopHeaderBg from '../../assets/images/transaction-top-header-bg.svg';

type Props = {
	transaction: Transactions;
	isFirst: boolean;
};

export default function TransactionCard({ transaction, isFirst }: Props) {
	const [sum, setSum] = useState(0);

	useEffect(() => {
		if (transaction) {
			const newSum = transaction.transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
			setSum(newSum);
		}
	}, [transaction]);

	return (
		<div className='relative'>
			{isFirst && (
				<img
					src={transactionTopHeaderBg}
					className='absolute left-[-24px] top-0 w-[calc(100%+48px)] max-w-[calc(100%+48px)] h-[214px] object-cover rounded-t-lg'
					alt=''
				/>
			)}
			<div className={`flex justify-between bg-black rounded-t-lg text-white pt-4 pb-6 ${isFirst ? '' : 'px-6'}`}>
				<div className='z-10'>
					<div className={`font-semibold ${isFirst ? 'text-2xl' : 'text-xl'}`}>{DateTime.fromISO(transaction.createdAt).toFormat('dd MMM yyyy')}</div>
					<div>12:00 am - 11:59 pm</div>
				</div>
				<div className='text-right z-10'>
					<div className={`font-semibold ${isFirst ? 'text-2xl' : 'text-xl'}`}>{sum.toFixed(2)}</div>
					<p>{transaction.transactions[0].currency}</p>
				</div>
			</div>
			<div className='bg-white rounded-lg px-6 py-4 relative top-[-8px]'>
				<div className='text-lg font-semibold pb-[8px]'>{transaction.transactions.length} Transactions</div>
				<hr className='border-dashed' />
				{transaction.transactions.map((t) => (
					<div key={t.createdAt}>
						<div className='py-4'>
							<div className='flex gap-2'>
								<div className='grow text-xl font-semibold truncate'>{t._id}</div>
								{t.amount > 0 ? (
									<div className='flex-none text-green text-xl font-semibold text-right'>+ {t.amount.toFixed(2)}</div>
								) : (
									<div className='flex-none text-grey-dark text-xl font-semibold text-right'>- {(t.amount * -1).toFixed(2)}</div>
								)}
							</div>
							<div className='flex gap-2'>
								<div className='flex grow gap-2 text-grey-dark'>
									<div className='md:hidden'>{DateTime.fromISO(t.createdAt).toFormat('dd MMM, hh:mm a')}</div>
									<div className='hidden md:block'>{DateTime.fromISO(t.createdAt).toFormat('dd MMM yyyy, hh:mm a')}</div>
									<div>|</div>
									<div>{t.pos}</div>
								</div>
								
								<div className='flex-none text-right'>{t.currency}</div>
							</div>
						</div>
						<hr className='border-blue-grey-lighter'/>
					</div>
				))}
			</div>
		</div>
	);
}
