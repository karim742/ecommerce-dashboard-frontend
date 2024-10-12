import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold grid place-content-center'>
        Landing Page
      </h1>
      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default App;
