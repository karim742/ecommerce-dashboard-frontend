import { useEffect, useState } from 'react';
import axios from '../config/instance';

const CreateAffiliator = () => {
  const [affiliator, setAffiliator] = useState({
    name: '',
    email: '',
    password: '',
    vendor: [],
  });
  const [vendors, setVendors] = useState([]);

  const handleAffiliatorCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/admin/affiliator', affiliator);
      if (data.status === 201) {
        alert(data.message);
      } else {
        alert(data.message);
        setAffiliator({
          name: '',
          email: '',
          password: '',
          vendor: [],
        });
      }
    } catch (error) {
      alert('Error creating affiliator');
      console.error('Error creating vendor: ', error);
    }
  };

  useEffect(() => {
    // fetch vendors
    const fetchVendors = async () => {
      try {
        const { data } = await axios.get('/admin/sellers');
        setVendors(data.sellers);
      } catch (error) {
        console.error('Error fetching vendors: ', error);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div>
      <h2 className='font-bold text-xl'>Add Affiliator</h2>
      <p className='text-gray-500'>This is the add affiliator page</p>

      {/* form  */}
      <div className='mt-5'>
        {/* <!-- Author: FormBold Team --> */}
        <div className='w-full sm:w-[560px]'>
          <form onSubmit={handleAffiliatorCreate}>
            <div className='mb-5'>
              <label
                htmlFor='name'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Full Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Full Name'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={affiliator.name}
                onChange={(e) =>
                  setAffiliator({ ...affiliator, name: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={affiliator.email}
                onChange={(e) =>
                  setAffiliator({ ...affiliator, email: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='password'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={affiliator.password}
                onChange={(e) =>
                  setAffiliator({ ...affiliator, password: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='vendors'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Vendors
              </label>
              <div>
                {vendors?.map((vendor) => (
                  <div key={vendor._id}>
                    <input
                      type='checkbox'
                      name='vendors'
                      id={vendor._id}
                      value={vendor._id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAffiliator({
                            ...affiliator,
                            vendor: [...affiliator.vendor, e.target.value],
                          });
                        } else {
                          setAffiliator({
                            ...affiliator,
                            vendor: affiliator.vendor.filter(
                              (v) => v !== e.target.value
                            ),
                          });
                        }
                      }}
                    />
                    <label htmlFor={vendor._id}>{vendor.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'>
                Add Affiliator
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAffiliator;
