import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BMICalculator from '../components/BMICalculator';
import '../index.css';

export default function Calculator() {
  const [hasResult, setHasResult] = useState(false);

  return (
    <div className={`${hasResult ? 'min-h-screen' : 'h-screen'} flex flex-col ${hasResult ? 'bg-white' : ''}`}>
      <Navbar />

      <main className={`relative w-full flex-grow px-4 py-6 ${hasResult ? '' : 'flex items-center justify-center overflow-hidden'}`}>
        {/* Sembunyikan skewed-linear jika sudah ada hasil */}
        {!hasResult && (
          <div className="absolute inset-0 -z-10">
            <div
              className="skewed-linear w-full"
              style={{ height: 'calc(var(--vh, 1vh) * 74)' }}
            />
          </div>
        )}

        <BMICalculator setHasResult={setHasResult} />
      </main>

      <footer className="text-center text-xs text-black py-4">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
}
