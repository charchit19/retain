import React from 'react'
import Dashboard from '@/components/dashboard'
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import './globals.css'
const Page = () => {
  return (
    <>
      <Navbar />
      <div className='header'>
        <Header />
      </div>
      <div className='dashboard'>
        <Dashboard />
      </div>
    </>
  )
}

export default Page;
