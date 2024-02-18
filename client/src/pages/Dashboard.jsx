// import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

const Dashboard = () => {
  const location = useLocation();

  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* SideBar */}
        <DashSidebar />
      </div>
      {/* Profile ... */}
      {tab === 'profile' && <DashProfile />}
      {/* Dashboard Overview ...  */}
      {tab === 'dash' && <DashboardComp />}
      {/* Posts ...  */}
      {tab === 'posts' && <DashPosts />}
      {/* Users ...  */}
      {tab === 'users' && <DashUsers />}
      {/* Comments ...  */}
      {tab === 'comments' && <DashComments />}
    </div>
  );
};

export default Dashboard;
