
import qrCode from '../../../assets/images/qr-code.svg';
import deals from '../../../assets/images/deals.svg';
import contactUs from '../../../assets/images/contact-us.svg';

export default function Shortcut() {
	const shortcutList = [
		{ name: 'QR Code', src: qrCode },
		{ name: 'Deal & Privileges', src: deals },
		{ name: 'Contact Us', src: contactUs },
	];

	return (
		<div className='md:hidden flex items-center justify-center p-4 gap-4'>
			{shortcutList.map((shortcut) => (
				<div className='flex flex-col items-center'>
					<button className='btn-shortcut rounded-full mb-2 p-[12px] w-[60px] h-[60px] flex justify-center items-center bg-white border-none shadow-[0_4px_10px_0px_rgba(0,0,0,0.2)]'>
						<img src={shortcut.src} alt={shortcut.name} />
					</button>
					<p className='mb-0 font-semibold'>{shortcut.name}</p>
				</div>
			))}
		</div>
	);
}
