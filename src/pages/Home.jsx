import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import { FaCheckCircle, FaExclamationTriangle, FaHeartbeat } from 'react-icons/fa';

const heroIllustrationImage = '/assets/pana.png';
const healthAwarenessImage = '/assets/yap.png';
const bmiCategoriesChartImage = '/assets/ukuran.png';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleCekBmi = () => {
    navigate('/calculator'); // Arahkan ke halaman kalkulator BMI
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-green-500 text-white py-5 px-4 md:px-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Body Mass Index</h1>
          <p className="mb-6 text-lg">
            Tubuh ideal merupakan dambaan setiap orang. Selain menunjang penampilan, memiliki tubuh ideal dapat menghindarkan Anda dari berbagai risiko penyakit.
          </p>
          <button
            onClick={handleCekBmi}
            className="bg-white text-green-500 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Cek BMI
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={heroIllustrationImage} alt="Ilustrasi Dokter dan BMI" className="max-w-xs md:max-w-md" />
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mulai Hidup Sehat dari Sekarang!</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Saatnya mengatur gaya hidup dengan pola makan sehat & olahraga teratur untuk menjaga berat badan ideal yang membuat penampilanmu memikat, serta terhindar dari berbagai risiko penyakit.
        </p>
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg max-w-xl"> {/* Menyesuaikan lebar maksimum gambar */}
            <img src={healthAwarenessImage} alt="Kesadaran Kesehatan Menyeluruh" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* BMI Categories Section */}
      <section className="py-16 px-4 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Kategori Berat Badan Berdasarkan BMI</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-center">
          Menurut WHO, kategori berat badan ideal untuk pria dan wanita dewasa didasarkan pada Indeks Massa Tubuh (BMI). Berikut adalah kategori berat badan berdasarkan BMI:
        </p>
        <div className="max-w-4xl mx-auto flex justify-center">
          <img src={bmiCategoriesChartImage} alt="Bagan Kategori BMI" className="w-full md:w-3/4 rounded-lg shadow-md" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Manfaat Pakai Kalkulator BMI</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <div className="flex items-start">
            <FaCheckCircle className="text-green-500 text-3xl mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-xl mb-2">Ketahui Indeks Massa Tubuh (IMT)</h3>
              <p>
                Body Mass Index atau Indeks Massa Tubuh dihitung berdasarkan berat dan tinggi badan. Dari nilai BMI, kamu bisa tahu apakah kondisi badanmu sudah termasuk ideal atau belum.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaHeartbeat className="text-red-500 text-3xl mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-xl mb-2">Jaga Kesehatan Badan</h3>
              <p>
                Saat kamu tahu nilai BMI-mu, kamu bisa lebih menjaga kesehatan badanmu, lho. Ini karena berat badan adalah salah satu indikator dari kondisi kesehatanmu.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaExclamationTriangle className="text-yellow-500 text-3xl mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-xl mb-2">Lebih Waspada Sama Berat Badan</h3>
              <p>
                Dari nilai BMI yang dipantau secara teratur, kamu bisa lebih waspada untuk menjaga berat badan supaya nggak terlalu tinggi atau terlalu rendah.
              </p>
              <h3 className="font-semibold text-xl mb-2 mt-4">Jauhi Obesitas</h3>
              <p>
                Sayangi badanmu dengan cara menjaga indeks massa tubuh (IMT) supaya nggak melewati batas normal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-xs text-black py-4">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
}