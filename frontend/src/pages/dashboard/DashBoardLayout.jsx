import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DashBoardLayout = () => {
    const {user} = useSelector((state)=> state.auth);
   // console.log("User role :", user?.role)
    if(!user){
        alert("You have to login first");
        return <Navigate to="/login" replace/>
    }


    const renderDashboard = () =>{

        switch(user?.role){
            case 'admin':
                return <AdminDashboard/>
            case 'user' :
                return <UserDashboard/>

            default:
                return <Navigate to="/login" replace/>    
        }
    }





  return (
    <div className='container mx-auto flex flex-col  md:flex-row gap-4 items-start justify-start'>
        <header className='lg:w-1/5 sm:w-2/5 w-full border mt-5'>
           {
            renderDashboard()
           }
        </header>
        <main className='p-8 bg-white w-full border mt-5'>
            <Outlet/>
        </main>
    </div>
  )
}

export default DashBoardLayout