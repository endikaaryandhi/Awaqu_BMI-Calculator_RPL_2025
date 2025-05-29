import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      setErrorMsg('Email atau kata sandi salah. Silakan coba lagi.');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-sm">
      <h2 className="text-2xl font-semibold mb-2 text-center">Selamat datang kembali!</h2>
      <p className="text-sm text-gray-600 mb-8 text-center">Masukkan email dan kata sandi untuk masuk ke akun Anda</p>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16B3AC]"
            required
          />
        </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16B3AC] pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>

        {errorMsg && (
          <div className="text-red-600 text-sm text-left bg-red-100 px-3 py-2 rounded-md border border-red-400">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:opacity-80 transition"
        >
          {loading ? 'Sedang masuk...' : 'Masuk'}
        </button>
      </form>

      <p className="text-sm text-gray-700 mt-8 text-center">
        Belum punya akun?{' '}
        <Link to="/register" className="text-[#16B3AC] font-medium hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
