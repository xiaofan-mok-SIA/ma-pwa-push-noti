import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Link,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './components/NotFound/NotFound';

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
    <>
      <div className="flex gap-2 flex-row">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
      </div>
      <Outlet />
    </>
  );
}
