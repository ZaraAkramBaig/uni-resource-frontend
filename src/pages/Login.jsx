import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    
    const handleData = (e) => {
        e.preventDefault();
      const { name, value } = e.target;
      setData({...data, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        const { email, password } = data;
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (email === 'admin@gmail.com' && password === 'admin') {
            navigate("/superAdmin") // Redirect to students page
        }
    }

  return (


    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-white">EduScheduler</h1>
          <p className="text-indigo-200 mt-2">Smart Schedule Management System</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign In</h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your@email.com"
                value={data.email}
                onChange={handleData}
                required
              />
            </div>
            
            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">
                  Password
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                  Forgot password?
                </a>
              </div>
              <input
                name="password"
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                value={data.password}
                onChange={handleData}
                required
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>
          
          {/* Institution Request Link (for new institutions) */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Representing an institution?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Request access
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} EduScheduler. All rights reserved.
      </div>
    </div>
  );
};
