import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message , setMessage] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser , {isLoading : loginLoading}] = useLoginUserMutation();
    const navigate = useNavigate();

    // HANDLE LOGIN ///////////////

    const handleLogin =async (e) => {

        e.preventDefault();
        const data = {
            email, 
            password
        }
        try {
                const response = await loginUser(data).unwrap();
                console.log(response);
                
                const {token,user}= response;
                dispatch(setUser({user}));
                alert('Login Successful');
                navigate('/');
        } catch (error) {
            setMessage("Please enter a valid email or password or verify your email first")
        }
    }


  return (
    <section className='h-screen flex items-center justify-center'>

        <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2 className='text-2xl font-semibold pt-5'>
                    Please Login
            </h2>
            <form onSubmit={handleLogin} className='space-y-5 max-w-sm ax-auto pt-8'>
                    <input onChange={(e)=> setEmail(e.target.value)} type='email' name='email' id='email' placeholder='Email Address' required className='w-full bg-gray-100 focus:outline-none px-5 py-3'></input>
                    <input onChange={(e)=> setPassword(e.target.value)} type='password' name='password' id='password' placeholder='Enter Password' required className='w-full bg-gray-100 focus:outline-none px-5 py-3'></input>
                    {
                        message && <p className='text-red-500'>{message}</p>

                    }
                    <button type='submit' className='w-full mt-5 bg-red-500  py-3 mx-auto rounded-md text-white hover:bg-blue-500'>Login</button>
            </form>

            <p className='my-5 text-sm text-center italic'>Don't have an account ? <Link to="/register" className='text-primary px-1 underline'>Register</Link> here.</p>
        </div>

    </section>
  )
}

export default Login