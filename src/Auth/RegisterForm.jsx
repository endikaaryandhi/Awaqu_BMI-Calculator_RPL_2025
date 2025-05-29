import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <h2 className="text-2xl font-bold mb-2 text-center">Mulai Sekarang</h2>
      <p className="text-center mb-6 text-gray-600">Daftarkan akun Anda sekarang!</p>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16B3AC]"
            required
          />
        </div>

        <div>
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
            Saya menyetujui <span className="font-semibold ml-1">syarat & kebijakan</span>
          </label>
          {showAgreementError && (
            <p className="text-red-500 text-xs mt-1">Anda harus menyetujui syarat & kebijakan terlebih dahulu.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:opacity-80 transition"
        >
          {loading ? 'Mendaftarkan...' : 'Daftar'}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-700">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-[#16B3AC] font-medium hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
