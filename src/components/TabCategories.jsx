import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
      const { jobs } = data;
      setJobs(jobs);
    }
    getData();
  }, [])

  console.log(jobs);

  return (
    <Tabs>
      <div className='container mx-auto px-6 py-10'>
        <div className='max-w-2xl mx-auto text-center mb-8'>
          <h1 className='text-3xl font-bold mb-3'>Browse Jobs by Categories</h1>
          <p className='text-gray-500'>
            Three Categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below.
          </p>
        </div>
        <div className='flex justify-center items-center'>
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8'>
            {
              jobs
                .filter(j => j.category.toLowerCase() === "web development")
                .map(job => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8'>
            {
              jobs
                .filter(j => j.category.toLowerCase() === "graphics design")
                .map(job => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8'>
            {
              jobs
                .filter(j => j.category.toLowerCase() === "digital marketing")
                .map(job => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))
            }
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;