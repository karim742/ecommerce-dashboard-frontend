import { useState } from 'react';
import axios from '../config/instance';

const CreateVandor = () => {
  const [vendors, setVendors] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
    storeDescription: '',
    storeImage: '',
  });

  const handleVendorCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/admin/sellers', vendors);
      if (data.status === 201) {
        alert(data.message);
      } else {
        alert(data.message);
        setVendors({
          name: '',
          email: '',
          password: '',
          storeName: '',
          storeDescription: '',
          storeImage: '',
        });
      }
    } catch (error) {
      alert('Error creating vendor');
      console.error('Error creating vendor: ', error);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-xl'>Add Vendors</h2>
      <p className='text-gray-500'>This is the create vendor page</p>

      {/* form  */}
      <div className='mt-5'>
        {/* <!-- Author: FormBold Team --> */}
        <div className='w-full sm:w-[560px]'>
          <form onSubmit={handleVendorCreate}>
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
                value={vendors.name}
                onChange={(e) =>
                  setVendors({ ...vendors, name: e.target.value })
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
                value={vendors.email}
                onChange={(e) =>
                  setVendors({ ...vendors, email: e.target.value })
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
                value={vendors.password}
                onChange={(e) =>
                  setVendors({ ...vendors, password: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='storeName'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Store Name
              </label>
              <input
                type='text'
                name='storeName'
                id='storeName'
                placeholder='Enter your store name'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={vendors.storeName}
                onChange={(e) =>
                  setVendors({ ...vendors, storeName: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='storeImage'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Store Image
              </label>
              <input
                type='link'
                name='storeImage'
                id='storeImage'
                placeholder='Enter your store name'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={vendors.storeImage}
                onChange={(e) =>
                  setVendors({ ...vendors, storeImage: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='storeDescription'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Store Description
              </label>
              <textarea
                name='storeDescription'
                id='storeDescription'
                placeholder='Enter your store description'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={vendors.storeDescription}
                onChange={(e) =>
                  setVendors({ ...vendors, storeDescription: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <button className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'>
                Add Vendor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVandor;
