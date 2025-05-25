// src/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


    const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    setLoading(false);

    if (error) {
        setErrorMsg('Incorrect email or password. Please try again.');
    } else {
        navigate('/home');
    }
    };


  return (
    <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-sm">
      <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back!</h2>
      <p className="text-sm text-gray-600 mb-8 text-center">Enter your credentials to access your account</p>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16B3AC]"
            required
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16B3AC]"
            required
          />
        </div>

        {errorMsg && (
        <div className="text-red-600 text-sm text-left bg-red-100 px-3 py-2 rounded-md border border-red-400">
            {errorMsg}
        </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-900 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-sm text-gray-700 mt-8">
        Don’t have an account?{' '}
        <Link to="/register" className="text-[#16B3AC] font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
