import React from 'react';
import Register from '../Auth/RegisterForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2dd4bf] to-[#fde68a] relative px-4 font-sans">
      
      {/* Logo */}
      <div className="absolute top-7 left-4 md:left-10 text-5xl z-10 flex space-x-1 font-semibold tracking-wide cursor-default select-none drop-shadow-lg">
        <span className="text-[#064E3B] font-bold">A</span>
        <span className="text-[#0F766E]">w</span>
        <span className="text-[#DC2626]">a</span>
        <span className="text-[#F59E0B] font-bold">Q</span>
        <span className="text-[#78350F]">u</span>
      </div>

      {/* Form Register */}
      <div className="w-full max-w-md sm:max-w-lg flex justify-center items-center mt-20 mb-16">
        <Register />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray text-xs text-center w-full px-4">
        © 2025 All Rights Reserved. Kelompok 10 | AwaQu
      </footer>
    </div>
  );
};

export default Signup;
