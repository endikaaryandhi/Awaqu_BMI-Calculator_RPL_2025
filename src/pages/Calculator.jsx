// pages/Calculator.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import BMICalculator from '../components/BMICalculator';

export default function Calculator() {
  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 sm:py-12 bg-transparent">
        <BMICalculator />
      </main>
      <footer className="text-center text-xs text-black py-4">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
}