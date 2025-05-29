// src/components/BMICalculator.jsx
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; 
import BMIResult from './BMIResult'; 
import { FaMale, FaFemale } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

export default function BMICalculator({ setHasResult }) {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateBMI = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setBmiResult(null);

    if (!gender) {
      toast.error('Silakan pilih jenis kelamin.');
      setIsLoading(false);
      return;
    }
    if (height <= 0 || weight <= 0 || age <= 0 || isNaN(parseFloat(height)) || isNaN(parseFloat(weight)) || isNaN(parseInt(age))) {
      toast.error('Usia, tinggi badan, dan berat badan harus diisi dengan angka yang valid dan lebih dari 0.');
      setIsLoading(false);
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const calculatedBmi = parseFloat((parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(1));

    let bmiCategory = '';
    if (calculatedBmi < 18.5) {
      bmiCategory = 'Kurus';
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      bmiCategory = 'Normal';
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      bmiCategory = 'Gemuk';
    } else if (calculatedBmi >= 30 && calculatedBmi <= 34.9) {
      bmiCategory = 'Obesitas 1';
    } else {
      bmiCategory = 'Obesitas 2';
    }

    setBmiResult(calculatedBmi);
    setCategory(bmiCategory);
    if (setHasResult) setHasResult(true); // ← Notifikasi ke parent

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.warn('Gagal mengambil data user:', userError.message);
    }
    
    if (user) {
      const { error: dbError } = await supabase.from('bmi_records').insert([{
        user_id: user.id,
        gender,
        age: parseInt(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
        bmi: calculatedBmi,
        category: bmiCategory,
        created_at: new Date().toISOString(),
      }]);

      if (dbError) {
        console.error('Gagal menyimpan data BMI:', dbError.message);
        toast.error('Hasil BMI berhasil dihitung, tetapi gagal menyimpan data ke riwayat.');
      }
    } else {
      console.log('User tidak login, BMI tidak disimpan ke riwayat.');
    }

    setIsLoading(false);
  };

  const resetCalculator = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setBmiResult(null);
    setCategory('');
    setIsLoading(false);
    if (setHasResult) setHasResult(false); // ← Kembalikan skewed-linear
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <Toaster position="top-center" />
      
      {!bmiResult && !isLoading && (
        <div className="max-w-md w-full">
          <form onSubmit={calculateBMI} className="space-y-6">
            {/* Gender */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  gender === 'male'
                    ? 'border-green-500 bg-green-50 shadow-lg scale-105 ring-2 ring-green-500 ring-offset-1'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FaMale size={30} className={`mb-2 ${gender === 'male' ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`font-semibold ${gender === 'male' ? 'text-green-700' : 'text-gray-600'}`}>Laki-laki</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  gender === 'female'
                    ? 'border-pink-500 bg-pink-50 shadow-lg scale-105 ring-2 ring-pink-500 ring-offset-1'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FaFemale size={30} className={`mb-2 ${gender === 'female' ? 'text-pink-600' : 'text-gray-400'}`} />
                <span className={`font-semibold ${gender === 'female' ? 'text-pink-700' : 'text-gray-600'}`}>Perempuan</span>
              </button>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block mb-1.5 text-sm font-medium text-gray-700 mt-12">Berapa Usia Anda</label>
              <div className="flex items-center border border-gray-300 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition bg-white">
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 appearance-none rounded-3xl"
                  min="1"
                  placeholder="Masukan Usia Anda"
                />
                <span className="px-3 text-sm text-gray-500">Thn</span>
              </div>
            </div>

            {/* Height */}
            <div>
              <label htmlFor="height" className="block mb-1.5 text-sm font-medium text-gray-700">Berapa Tinggi Anda</label>
              <div className="flex items-center border border-gray-300 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition bg-white">
                <input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 appearance-none rounded-3xl"
                  min="1"
                  placeholder="Masukan Tinggi Anda"
                />
                <span className="px-3 text-sm text-gray-500">Cm</span>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className="block mb-1.5 text-sm font-medium text-gray-700">Berapa Berat Badan Anda</label>
              <div className="flex items-center border border-gray-300 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition bg-white">
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 appearance-none rounded-3xl"
                  min="1"
                  placeholder="Masukan Berat Badan Anda"
                />
                <span className="px-3 text-sm text-gray-500">Kg</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3.5 rounded-full hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-150 font-semibold text-lg shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Menghitung...' : 'Hitung BMI'}
            </button>
          </form>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-20 flex flex-col items-center justify-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-semibold text-green-700 mt-4">Menghitung BMI Anda...</p>
        </div>
      )}

      {bmiResult && !isLoading && (
        <div className="w-full max-w-lg flex flex-col items-center"> 
          <BMIResult bmi={bmiResult} category={category} />
          <button
            onClick={resetCalculator}
            className="mt-8 mb-4 bg-gray-600 text-white py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-150 font-medium text-base shadow hover:shadow-md"
          >
            Hitung Ulang
          </button>
        </div>
      )}
    </div>
  );
}
