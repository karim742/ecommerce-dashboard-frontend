import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/instance';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    affiliator: false,
  });
  const navigate = useNavigate();

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (!email || !password) alert('Email and password are required');
    try {
      if (login.affiliator) {
        const { data } = await axios.post('/auth/affiliator/login', {
          email,
          password,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            _id: data.affiliator._id,
            email: data.affiliator.email,
            vandor: data.affiliator.vandor,
            role: data.affiliator.role,
          })
        );
        alert('Login successful');
        navigate('/dashboard');
        return;
      }
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.user._id,
          email: data.user.email,
          storeName: data.user.storeName,
          role: data.user.role,
        })
      );
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      if (error.response.status === 400) alert('Invalid email or password');
    }
  };

  return (
    <div className='grid place-content-center p-20'>
      <div className='max-w-xl py-6 px-8 mt-20 bg-white rounded shadow-xl'>
        <h1 className='text-2xl font-bold text-gray-800 text-center'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block text-gray-800 font-bold'
            >
              Email:
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email'
              className='w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600'
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-gray-800 font-bold'
            >
              Password:
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              className='w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600'
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <div className='mt-2'>
              <input
                type='checkbox'
                id='affiliator'
                name='affiliator'
                className='mr-2'
                checked={login.affiliator}
                onChange={(e) =>
                  setLogin({ ...login, affiliator: e.target.checked })
                }
              />
              <label
                htmlFor='affiliator'
                className='text-sm font-thin text-gray-800 inline-block '
              >
                I am affiliator
              </label>
            </div>
          </div>
          <button className='cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
