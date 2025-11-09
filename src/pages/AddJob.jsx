import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AddJob = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();

    const form = e.target;

    const job_title = form.job_title.value;
    const email = form.email.value;
    const deadline = startDate;
    const category = form.category.value;
    const min_price = form.min_price.value;
    const max_price = form.max_price.value;
    const description = form.description.value;

    const jobData = {
      job_title,
      category,
      deadline,
      min_price,
      max_price,
      description,
      buyer_info: {
        buyer_email: email,
        buyer_name: user?.displayName,
        buyer_photo: user?.photoURL
      }
    }

    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/job`, jobData);
      console.log(result.data);
      navigate("/my-posted-jobs");
      toast.success("Job Added successfully!");
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className='max-w-xl mx-auto min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md'>
        <h2 className='text-2xl font-semibold text-gray-700'>
          Post a Job
        </h2>

        <form onSubmit={handleAddJob}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>

            {/* job title */}
            <div>
              <label className='text-gray-700' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                type='text'
                placeholder="Enter job title"
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            {/* email */}
            <div>
              <label className='text-gray-700' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                value={user?.email}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            {/* deadline */}
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            {/* select category */}
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                id='category'
                className='select block outline-none w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              >
                <option disabled selected value="">Select Category</option>
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>

            {/* minimum pirce */}
            <div>
              <label className='text-gray-700' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                type='number'
                placeholder='Minimum price'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            {/* maximum pirce */}
            <div>
              <label className='text-gray-700' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                type='number'
                placeholder='Maximum price'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>

          {/* description */}
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              placeholder='Description'
            ></textarea>
          </div>

          {/* save button */}
          <div className='flex justify-end mt-6'>
            <button className='cursor-pointer px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob;