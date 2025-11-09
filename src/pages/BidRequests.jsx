import toast from "react-hot-toast";
import BidsRequestsRow from "../components/BidsRequestsRow";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../components/Loader";

const BidRequests = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const getData = async () => {
    try {
      const { data } = await axiosInstance.get(`/bids-requests?email=${user?.email}`);
      const { bids } = data;
      return bids;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  const {
    data: bidsRequests = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['bids'],
    queryFn: () => getData()
  });

  // const [bidsRequests, setBidsRequests] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/bids-requests?email=${user?.email}`);
  //       const { bids } = data;
  //       return bids;
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(err.message);
  //     }
  //   }
  //   getData();
  // }, [user]);

  console.log(bidsRequests);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosInstance.patch(`/update-bid-status/${id}`, { status });
      return data.result;
    },
    onMutate: async (varibales) => {
      console.log('after clicked', varibales);

      // step-1: stop any ongoing refetch for the data
      await queryClient.cancelQueries(['bids']);

      // step-2: save the current data
      const previousBids = await queryClient.getQueryData(['bids']);

      // step-3: instantly refresh the ui
      queryClient.setQueryData(['bids'], oldData => {
        return oldData.map(bid =>
          bid._id === varibales.id ? (
            { ...bid, status: varibales.status }
          ) : (
            bid
          )
        )
      });

      // step-4: return the previous data as a object
      return { previousBids };
    },
    onSuccess: (bid) => {
      console.log(bid);
      toast.success(bid.status.charAt(0).toUpperCase() + bid.status.slice(1));
    },
    onError: (error, varibales, context) => {
      queryClient.setQueryData(['bids'], context.previousBids);
      console.log("Failed to update data", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['bids']);
    }
  })



  const handleBidRequests = async (id, previousStatus, status) => {
    console.log(id, previousStatus, status);
    if (previousStatus === status) return;

    await mutateAsync({ id, status });

    // try {
    //   const { data } = await axiosInstance.patch(`/update-bid-status/${id}`, { status });
    //   const { success } = data;
    //   if (success) {
    //     toast.success(status.charAt(0).toUpperCase() + status.slice(1));

    //     refetch();

    //     // setBidsRequests(bidsRequests.map(bid => bid._id === id ? { ...bid, status } : bid));
    //     // setBidsRequests(prev => {
    //     //   return prev.map(bid => bid._id === id ? { ...bid, status } : bid)
    //     // })
    //     // const updated = bidsRequests.map(bid => bid._id === id ? { ...bid, status } : bid);
    //     // setBidsRequests(updated);
    //   }
    // } catch (err) {
    //   console.log(err.message);
    //   toast.error(err.message);
    // }
  }

  if (isError || error) {
    console.log('isError', isError, 'error', error);
  }

  if (isLoading) return <Loader />

  return (
    <section className='container px-4 mx-auto my-12'>
      {
        bidsRequests.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center min-h-[40vh]">
            <p className="text-2xl font-bold text-gray-400 ">No requests yet.</p>
            <Link to="/add-job">
              <button className='cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                Add a Job Now
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className='flex items-center gap-x-3'>
              <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

              <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                {
                  bidsRequests.length > 1 ? (
                    bidsRequests.length + " Requestes"
                  ) : (
                    bidsRequests.length + " Requeste"
                  )
                }
              </span>
            </div>

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
                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            <div className='flex items-center gap-x-3'>
                              <span>Email</span>
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
                          bidsRequests.map(bid => (
                            <BidsRequestsRow key={bid._id} bid={bid} handleBidRequests={handleBidRequests} />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </section>
  )
}

export default BidRequests;