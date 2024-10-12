import { useState } from 'react';
import axios from '../config/instance';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    imageUrl: [],
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { data } = await axios.post('/seller/products', {
        ...product,
        sellerId: user?._id,
        storeName: user?.storeName,
        stock: Number(product.stock),
        price: Number(product.price),
        discount: Number(product.discount),
        imageUrl: product.imageUrl.split(','),
      });
      if (data.status === 201) {
        alert(data.message);
      } else {
        alert(data.message);
        setProduct({
          name: '',
          description: '',
          price: 0,
          discount: 0,
          stock: 0,
          imageUrl: [],
        });
      }
    } catch (error) {
      alert('Error creating product');
      console.error('Error creating vendor: ', error);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-xl'>Add Product</h2>
      <p className='text-gray-500'>This is the add product page</p>

      {/* form  */}
      <div className='mt-5'>
        {/* <!-- Author: FormBold Team --> */}
        <div className='w-full sm:w-[560px]'>
          <form onSubmit={handleCreateProduct}>
            <div className='mb-5'>
              <label
                htmlFor='name'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Product Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Product Name'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='description'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Description
              </label>
              <textarea
                name='description'
                id='description'
                placeholder='Enter your description'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className='flex flex-col md:flex-row gap-4 items-start md:items-center'>
              <div className='mb-5 w-full'>
                <label
                  htmlFor='price'
                  className='mb-3 block text-base font-medium text-[#07074D]'
                >
                  Price
                </label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  placeholder='Enter your price'
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
              <div className='mb-5 w-full'>
                <label
                  htmlFor='discount'
                  className='mb-3 block text-base font-medium text-[#07074D]'
                >
                  Discount
                </label>
                <input
                  type='number'
                  name='discount'
                  id='discount'
                  placeholder='Enter your discount'
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                  value={product.discount}
                  onChange={(e) =>
                    setProduct({ ...product, discount: e.target.value })
                  }
                />
              </div>
              <div className='mb-5 w-full'>
                <label
                  htmlFor='stock'
                  className='mb-3 block text-base font-medium text-[#07074D]'
                >
                  Stock
                </label>
                <input
                  type='number'
                  name='stock'
                  id='stock'
                  placeholder='Enter your stock'
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='mb-5'>
              <label
                htmlFor='imageUrl'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Image URL
              </label>
              <textarea
                name='imageUrl'
                id='imageUrl'
                placeholder='Enter your imageUrl using comma separated'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                value={product.imageUrl}
                onChange={(e) =>
                  setProduct({ ...product, imageUrl: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <button className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'>
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
