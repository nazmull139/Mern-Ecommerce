import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '../redux/features/auth/authApi';

const VerifyEmail = () => {
  const [verifyEmail] = useVerifyEmailMutation();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  const handleVerifyEmail = async () => {
    setMessage(null);
    setError(null);
    try {
      const result = await verifyEmail({ code }).unwrap();
      setMessage('Email verified successfully!');
      navigate('/login')
      console.log(result);
    } catch (err) {
      setError(err?.data?.message || 'An error occurred. Please try again.');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Verify Your Email</h1>
        <p className="text-gray-600 text-center mb-6">
          Please enter the verification code sent to your email address.
        </p>

        {message && <p className="text-green-600 bg-green-100 rounded p-2 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 bg-red-100 rounded p-2 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-700 font-medium mb-2">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleVerifyEmail}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-200"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
