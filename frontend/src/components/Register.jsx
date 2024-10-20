import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
    const [message , setMessage] = useState('');
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const [registerUser , {isLoading}] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleRegister =async (e) => {

        e.preventDefault();
        /*
        if (!username || !email || !password) {
            setMessage('All fields are required.');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }*/

        const data = {
            username,
            email, 
            password
        }
       try {
            await registerUser(data).unwrap();
            alert("Registration Successful");
            navigate('/login')    
       } catch (error) {
        setMessage("registration failed");
       }
    }

  return (
    <section className='h-screen flex items-center justify-center'>

    <div className='max-w-sm border shadow bg-white mx-auto p-8'>
        <h2 className='text-2xl font-semibold pt-5'>
                Please Register
        </h2>
        <form onSubmit={handleRegister} className='space-y-5 max-w-sm ax-auto pt-8'>
                <input onChange={(e)=> setUsername(e.target.value)} type='text' name='username' id='username' placeholder='Username' required className='w-full bg-gray-100 focus:outline-none px-5 py-3'></input>
                <input onChange={(e)=> setEmail(e.target.value)} type='email' name='email' id='email' placeholder='Email Address' required className='w-full bg-gray-100 focus:outline-none px-5 py-3'></input>
                <input onChange={(e)=> setPassword(e.target.value)} type='password' name='password' id='password' placeholder='Enter Password' required className='w-full bg-gray-100 focus:outline-none px-5 py-3'></input>
                {
                    message && <p className='text-red-500'>{message}</p>

                }
                <button type='submit' className='w-full mt-5 bg-red-500  py-3 mx-auto rounded-md text-white hover:bg-blue-500'>Register</button>
        </form>

        <p className='my-5 text-sm text-center italic'>Already have an account ? please <Link to="/login" className='text-primary px-1 underline'>Login.</Link></p>
    </div>

</section>
  )
}

export default Register;