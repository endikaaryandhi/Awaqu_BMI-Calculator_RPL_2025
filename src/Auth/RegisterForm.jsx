// src/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';


const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showAgreementError, setShowAgreementError] = useState(false);


    const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreed) {
        setShowAgreementError(true);
        return;
    }

    setLoading(true);
    setShowAgreementError(false);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        data: { full_name: fullName },
        emailRedirectTo: 'http://localhost:3000/login',
        }
    });

    if (error) {
        setLoading(false);
        toast.error(error.message);
    }

    const user = data.user;
    if (user) {
        await supabase.from('profiles').insert({
        id: user.id,
        full_name: fullName,
        });

        await supabase.auth.signOut();
    }

    setLoading(false);
    navigate('/login');
    };


  return (
    <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-sm">
      <h2 className="text-2xl font-bold mb-2 text-center">Get Started Now</h2>
      <p className="text-center mb-6 text-gray-600">Register your account now!</p>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16B3AC]"
            required
          />
        </div>

        <div>
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

        <div>
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

<div className="flex items-start flex-col">
  <label className="inline-flex items-center text-xs text-black">
    <input
      type="checkbox"
      className="mr-2"
      checked={agreed}
      onChange={() => {
        setAgreed(!agreed);
        if (showAgreementError) setShowAgreementError(false);
      }}
    />
    I agree to the <span className="font-semibold ml-1">terms & policy</span>
  </label>
  {showAgreementError && (
    <p className="text-red-500 text-xs mt-1">You must agree to the terms & policy.</p>
  )}
</div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-900 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-700">
        Have an account?{' '}
        <Link to="/login" className="text-[#16B3AC] font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
