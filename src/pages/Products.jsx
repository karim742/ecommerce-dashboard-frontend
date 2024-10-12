import { useEffect, useState } from 'react';
import axios from '../config/instance';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // fetch products
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/seller/products/${user?.storeName}`);
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h2 className='font-bold text-xl'>Products</h2>
      <p className='text-gray-500'>This is the Product page</p>
      <div className='overflow-auto w-full'>
        <table className='min-w-full divide-y divide-gray-200 mt-5'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Image
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {products?.map((product) => (
              <tr key={product?._id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <img
                    src={product?.imageUrl[0]}
                    alt=''
                    className='w-10 h-10 object-cover rounded-lg'
                  />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{product?.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.price}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {product?.stock}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product?.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product?.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <button className='px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out'>
                    Edit
                  </button>
                  <button className='ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
