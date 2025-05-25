// src/pages/Signup.jsx
import React from 'react';
import Register from '../Auth/RegisterForm';

const Signup = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-start justify-center bg-gradient-to-b from-[#16B3AC] to-[#D2DC02]">
      {/* Logo */}
      <div className="ml-10 mb-10 text-3xl text-black absolute top-5 z-5">
        <span className="font-bold">A</span>
        <span>w</span>
        <span>a</span>
        <span className="font-bold">Q</span>
        <span>u</span>
        </div>


      {/* Form Register */}
      <div className="w-full flex justify-center items-center">
        <Register />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-10 text-white text-xs text-center w-full z-10">
        © 2025 All Rights Reserved. Kelompok 10 | AwaQu
      </footer>
    </div>
  );
};

export default Signup;
