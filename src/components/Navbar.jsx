// components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-[#16B3AC] to-[#D2DC02] px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
          <FaLeaf className="text-green-700 text-4xl drop-shadow-lg transition-transform duration-300 hover:rotate-12 hover:scale-110" />
          <h1 className="text-2xl md:text-3xl tracking-wide flex space-x-0.5">
            <span className="font-bold text-gradient bg-gradient-to-r from-green-700 to-lime-500 bg-clip-text text-transparent">A</span>
            <span className="text-green-700">w</span>
            <span className="text-green-700">a</span>
            <span className="font-bold text-gradient bg-gradient-to-r from-lime-500 to-green-700 bg-clip-text text-transparent">Q</span>
            <span className="text-green-700">u</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
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

        {/* Mobile Toggle */}
        <button className="md:hidden text-black text-2xl" onClick={toggleMenu}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-3 text-sm font-medium">
          <Link
            to="/home"
            onClick={toggleMenu}
            className={`${isActive('/home') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
          >
            Home
          </Link>
          <Link
            to="/calculator"
            onClick={toggleMenu}
            className={`${isActive('/calculator') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
          >
            Kalkulator BMI
          </Link>
          <Link
            to="/history"
            onClick={toggleMenu}
            className={`${isActive('/history') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
          >
            Riwayat BMI
          </Link>
          <Link
            to="/profile"
            onClick={toggleMenu}
            className={`${isActive('/profile') ? 'text-white font-bold underline' : 'text-black hover:underline'}`}
          >
            Profil
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
