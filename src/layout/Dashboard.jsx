import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [navItems, setNavItems] = useState([]);

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
    alert('You have been logged out');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
    }
    if (user?.role === 'seller') {
      setNavItems(sellerNav);
    } else if (user?.role === 'admin') {
      setNavItems(adminNav);
    } else if (user?.role === 'affiliator') {
      setNavItems(affiliateNav);
    }
    setUser(user);
  }, []);
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* <!-- sidebar --> */}
      <div
        className={`flex-col w-64 bg-gray-800 ${
          !sidebar ? 'md:flex' : 'hidden'
        }`}
      >
        <div className='flex items-center justify-center h-16 bg-gray-900'>
          <span className='text-white font-bold uppercase'>
            {user?.role === 'seller'
              ? user?.storeName
              : user?.role === 'admin'
              ? 'Admin'
              : user?.role === 'affiliator'
              ? 'Affiliate'
              : 'User'}{' '}
            Dashboard
          </span>
        </div>
        <div className='flex flex-col flex-1 overflow-y-auto'>
          <nav className='flex-1 px-2 py-4 bg-gray-800'>
            {navItems?.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className='flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700'
              >
                {item.path}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* <!-- Main content --> */}
      <div className='flex flex-col flex-1 overflow-y-auto'>
        <div className='flex items-center justify-between min-h-16 bg-white border-b border-gray-200'>
          <div className='flex items-center px-4'>
            <button
              onClick={() => setSidebar(!sidebar)}
              className='text-gray-500 focus:outline-none focus:text-gray-700'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
          <div className='flex items-center pr-4'>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className='p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const sellerNav = [
  {
    path: 'Products',
    link: 'products',
  },
  {
    path: 'Create Product',
    link: 'create-product',
  },
  {
    path: 'Affiliates',
    link: 'affiliates',
  },
  {
    path: 'Add Affiliate',
    link: 'add-affiliate',
  },
  {
    path: 'Profile',
    link: 'profile',
  },
];

const adminNav = [
  {
    path: 'Vandors',
    link: 'vandors',
  },
  {
    path: 'Create Vandor',
    link: 'create-vandor',
  },
  {
    path: 'Affiliates',
    link: 'affiliates',
  },
  {
    path: 'Add Affiliate',
    link: 'add-affiliate',
  },
  {
    path: 'Profile',
    link: 'profile',
  },
];

const affiliateNav = [
  {
    path: 'Products',
    link: 'products',
  },
];
