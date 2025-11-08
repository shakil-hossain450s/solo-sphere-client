import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import PostedJobsRow from "../components/PostedJobsRow";
import toast from "react-hot-toast";
import { Link } from "react-router";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/my-posted-jobs/${user.email}`,
        { withCredentials: true }
      )
      const { jobs: jobsData } = data;
      setJobs(jobsData);
    }
    getJobs();
  }, [user]);

  const handleDeleteJob = async (id) => {

    try {
      const result = await axios.delete(`${import.meta.env.VITE_API_URL}/job/${id}`);
      if (result.data.success) {
        const remaining = jobs.filter(job => job._id !== id);
        setJobs(remaining);
        toast.success("Deleted Successfully!");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  return (
    <section className='container px-4 mx-auto py-12 mb-10'>
      {
        jobs.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center min-h-[40vh]">
            <p className="text-2xl font-bold text-gray-400 ">No posted yet.</p>
            <Link to="/add-job">
              <button className='cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                Add Job Now
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className='flex items-center gap-x-3'>
              <h2 className='text-lg font-medium text-gray-800 '>My Posted Jobs</h2>

              <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                {
                  jobs.length > 1 ? (
                    jobs.length + " Jobs"
                  ) : (
                    jobs.length + " Job"
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
                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            <span>Deadline</span>
                          </th>

                          <th
                            scope='col'
                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                          >
                            <button className='flex items-center gap-x-2'>
                              <span>Price Range</span>
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
                            Description
                          </th>

                          <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200 '>
                        {
                          jobs.map(job => (
                            <PostedJobsRow key={job._id} job={job} handleDeleteJob={handleDeleteJob}></PostedJobsRow>
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

export default MyPostedJobs;