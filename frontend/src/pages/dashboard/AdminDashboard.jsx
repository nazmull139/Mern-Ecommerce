import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logout } from '../../redux/features/auth/authSlice';



  const navItems = [
        {path: "/dashboard/admin", label: "Dashboard"},
        {path: "/dashboard/add-product", label: "Add Product"},
        {path: "/dashboard/manage-products", label: "Manage Products"},
        {path: "/dashboard/users", label: "Users"},
        {path: "/dashboard/manage-orders", label: "Manage Orders"},
        {path: "/dashboard/create-coupon", label: "Create Coupon"},
        //{path: "/dashboard/admin", label: "Dashboard"}
    ]

    

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
                await logoutUser().unwrap();
           
            dispatch(logout());
            navigate('/');

        } catch (error) {
                console.error("Error to logout ",error)
        }
    }

  


  return (
    <div className='space-y-5 p-8 md:h-screen flex flex-col justify-between'>
            <div>
                <div className='nav__logo'>
                    <Link to="/">Lebaba<span>.</span></Link>
                    <p className='text-xs italic'>Admin Dashboard</p>
                </div>
                <hr className='mt-5'></hr>

                <ul className='space-y-5 pt-5'>
                    {
                        navItems.map((item , index) => (
                            <li key={index}>
                                <NavLink to={item.path} className={({isActive}) => isActive? "active font-semibold": ""}>
                                    {item.label}
                                </NavLink>
                                 
                            </li>
                        ))
                    }
                </ul>

            </div>
                    

             <div className='mb-3'>
                <hr className='mb-3'/>
                <button
                onClick={handleLogout}
                className='text-white bg-red-500 font-medium px-5 py-1 rounded-sm'>Logout</button>
                
                </div>       
        
    </div>
  )
}

export default AdminDashboard