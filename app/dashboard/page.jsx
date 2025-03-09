import React from 'react';
import AddCourse from './_components/AddCourse';
import AllCourse from '../AllCourse/page';

const Dashboard = () => {
  return (
    <div>
      <div className="relative mt-20">
        <AddCourse />
      </div>
      <div className="pb-[100px] -mt-[450px]">
  <AllCourse />
</div>

    </div>
  );
};

export default Dashboard;
