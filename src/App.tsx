import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar';

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
