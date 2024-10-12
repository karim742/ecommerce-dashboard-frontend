import { useEffect, useState } from 'react';
import axios from '../config/instance';

const Affiliators = () => {
  const [affiliator, setAffiliator] = useState([]);

  // handle delete vendor
  const handleDeleteAffilator = async (id) => {
    const arsure = window.confirm(
      'Are you sure you want to delete this affiliator?'
    );
    if (!arsure) return;
    try {
      const { data } = await axios.delete(`/admin/affiliator/${id}`);
      if (data.status === 204) {
        setAffiliator((prevAffiliator) =>
          prevAffiliator.filter((affiliator) => affiliator._id !== id)
        );
        alert(data.message);
      }
    } catch (error) {
      alert('Error deleting affiliator');
      console.error('Error deleting vendor: ', error);
    }
  };

  useEffect(() => {
    // fetch vendors
    const fetchAffiliator = async () => {
      try {
        const { data } = await axios.get('/admin/affiliator');
        setAffiliator(data.affiliators);
      } catch (error) {
        console.error('Error fetching vendors: ', error);
      }
    };
    fetchAffiliator();
  }, []);
  return (
    <div>
      <h2 className='font-bold text-xl'>Vendors</h2>
      <p className='text-gray-500'>This is the vendors page</p>

      <table className='min-w-full divide-y divide-gray-200 mt-5'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Role
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
          {affiliator?.map((affiliator) => (
            <tr key={affiliator?._id}>
              <td className='px-6 py-4 whitespace-nowrap'>
                {affiliator?.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {affiliator?.email}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {affiliator?.role}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    affiliator?.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {affiliator?.status}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button className='px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out'>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAffilator(affiliator._id)}
                  className='ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Affiliators;
