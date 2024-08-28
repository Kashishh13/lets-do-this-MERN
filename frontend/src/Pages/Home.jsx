import React from 'react';
import Sidebar from '../Components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-row gap-4 h-[90vh]">
      <div className="bg-white w-1/5 text-black border rounded-xl p-4">
        <Sidebar/>
      </div>
      <div className="bg-purple-300 border rounded-xl p-4 w-4/5  ">
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;