// utils/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-[#16B3AC] to-[#D2DC02] px-8 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">AwaQu</h1>
        <nav className="space-x-6 text-sm font-medium">
        <Link
            to="/home"
            className={`${isActive('/home') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
        >
            Home
        </Link>
        <Link
            to="/calculator"
            className={`${isActive('/calculator') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
        >
            Kalkulator BMI
        </Link>
        <Link
            to="/history"
            className={`${isActive('/history') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
        >
            Riwayat BMI
        </Link>
        <Link
            to="/profile"
            className={`${isActive('/profile') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
        >
            Profil
        </Link>
        </nav>
    </header>
  );
};

export default Navbar;
