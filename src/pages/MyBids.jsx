import {  useEffect, useState } from "react"
import useAuth from "../hooks/useAuth";
import axios from "axios";
import MyBidsRow from "../components/MyBidsRow";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBids = () => {
  const {user} = useAuth();
  const [bidsData, setBidsData] = useState([]);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axiosInstance(`/bids?email=${user?.email}`)
        const { bids } = data;
        setBidsData(bids);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [user?.email]);

  const handleStatusChange = async (id, previousStatus, status) => {
    console.log(id, previousStatus, status);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-bid-status/${id}`,
        { status }
      );
      const { success } = data;
      if (success) {
        toast.success(status.charAt(0).toUpperCase() + status.slice(1));
        const updated = bidsData.map(bid => bid._id === id ? {...bid, status} : bid);
        setBidsData(updated);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  return (
    <section className='container px-4 mx-auto my-12'>
      {
        bidsData.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center min-h-[40vh]">
            <p className="text-2xl font-bold text-gray-400 ">No Bids yet.</p>
            <Link to="/">
              <button className='cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                Bid Now
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className='flex items-center gap-x-3'>
              <h2 className='text-lg font-medium text-gray-800'>My Bids</h2>

              <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                {
                  bidsData.length > 1 ? (
                    bidsData.length + " Bids"
                  ) : (
                    bidsData.length + " Bid"
                  )
                }
              </span>
            </div >
            <div className='flex flex-col mt-6'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            <div className='flex items-center gap-x-3'>
                              <span>Title</span>
                            </div>
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            <span>Deadline</span>
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            <button className='flex items-center gap-x-2'>
                              <span>Price</span>
                            </button>
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            Category
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            Status
                          </th>

                          <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200 '>
                        {
                          bidsData.map(bid => (
                            <MyBidsRow key={bid._id} bid={bid} handleStatusChange={handleStatusChange} />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div >
        )
      }


    </section >
  )
}

export default MyBids