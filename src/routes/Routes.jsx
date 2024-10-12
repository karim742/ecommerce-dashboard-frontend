import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../layout/Dashboard';
import Affiliator from '../pages/Affiliators';
import CreateAffiliator from '../pages/CreateAffiliator';
import CreateProduct from '../pages/CreateProduct';
import CreateVandor from '../pages/CreateVandor';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Vendors from '../pages/Vendors';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'create-product',
        element: <CreateProduct />,
      },
      {
        path: 'affiliates',
        element: <Affiliator />,
      },
      {
        path: 'add-affiliate',
        element: <CreateAffiliator />,
      },
      {
        path: 'profile',
        element: <h1>This is profile path</h1>,
      },
      {
        path: 'vandors',
        element: <Vendors />,
      },
      {
        path: 'create-vandor',
        element: <CreateVandor />,
      },
    ],
  },
]);

export default Routes;
