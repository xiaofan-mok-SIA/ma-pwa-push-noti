import account from '../../assets/images/account-white.svg';

export default function Banner() {
	return (
		<div className='banner bg-blue-grey-darkest w-full flex justify-center items-center gap-1 md:gap-3 p-3 text-white'>
			<img src={account} alt='Merchant' className='hidden md:block ' />
			<span className='font-semibold '>The Ballet & Music Company</span>
			<span>·</span>
			<span>United Square Shopping Mall</span>
		</div>
	);
}
