import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from '@/routes/Root';

// containers
import Login from '@/containers/login';
import Register from '@/containers/register';
import Home from '@/containers/home';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Home />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
