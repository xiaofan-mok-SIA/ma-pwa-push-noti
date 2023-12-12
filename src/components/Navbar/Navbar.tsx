import { useState } from 'react';
import logo from '../../assets/images/logo-no-padding.svg';
import menu from '../../assets/images/menu.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
	const links = [
		{ name: 'QR Code', link: '/qr-code' },
		{ name: 'Past Transactions', link: '/past-transactions' },
		{ name: 'Deals & Privileges', link: '/deals-privileges' },
		{ name: 'Resource guide', link: '/resource-guide' },
		{ name: 'Contact Us', link: '/contact-us' },
		{ name: 'Referral', link: '/referral' },
	];

	const location = useLocation();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='shadow-md w-full bg-white'>
			<div className='py-4 sm:pt-12 sm:pb-5 lg:flex justify-between items-center container z-20'>
				<div className='flex justify-between'>
					<div className='flex cursor-pointer items-center'>
						<Link to='/'>
							<img src={logo} alt='Kris+ Merchant App' className='w-12 md:w-20' />
						</Link>
					</div>

					<div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer lg:hidden'>
						<img src={menu} alt='Menu' />
					</div>
				</div>

				<ul
					className={`flex flex-col py-4 lg:py-0 lg:flex-row gap-3 lg:gap-6 lg:items-center 
						absolute lg:static bg-white z-10 lg:z-auto w-full left-0 pl-14 lg:pl-0 lg:justify-end 
						transition-all duration-500 ease-in ${isOpen ? 'top-24' : 'top-[-80%]'}`}>
					{links.map((link, index) => (
						<li key={index} className={`font-semibold lg:p-2 ${location.pathname === link.link ? 'bg-cyan-lightest rounded-lg' : ''}`}>
							<Link to={link.link}>{link.name}</Link>
						</li>
					))}
					<button className='font-semibold p-2 lg:mx-2 bg-cyan rounded-lg text-white w-fit'>Log out</button>
				</ul>
			</div>
		</div>
	);
}
