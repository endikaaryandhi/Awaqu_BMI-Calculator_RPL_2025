// pages/Calculator.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import BMICalculator from '../components/BMICalculator';

export default function Calculator() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow"> {/* Added flex-grow here */}
        <BMICalculator />
      </main>
      <footer className="text-center text-xs text-black py-4">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
}