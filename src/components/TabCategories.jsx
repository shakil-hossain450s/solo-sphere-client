import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';

const TabCategories = () => {
  return (
    <Tabs>
      <div className='container mx-auto px-6 py-10'>
        <div className='max-w-2xl mx-auto text-center mb-8'>
          <h1 className='text-3xl font-bold mb-3'>Browse Jobs by Categories</h1>
          <p className='text-gray-500'>
            Three Categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below.
          </p>
        </div>
        <div className='flex justify-center items-center mb-6'>
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <JobCard></JobCard>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;