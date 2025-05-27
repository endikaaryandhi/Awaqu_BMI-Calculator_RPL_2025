import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; 
import Navbar from '../components/Navbar';
import { FaCheckCircle, FaExclamationTriangle, FaHeartbeat } from 'react-icons/fa';

const heroIllustrationImage = '/assets/pana.png';
const healthAwarenessImage = '/assets/yap.png';
const bmiCategoriesChartImage = '/assets/ukuran.png';

const FullPageSection = ({ children, className = '', style = {} }) => (
  <div
    className={`w-full ${className}`}
    style={{
      minHeight: '100vh',
      scrollSnapAlign: 'start',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function Home() {
  const navigate = useNavigate();

  const handleCekBmi = () => {
    navigate('/calculator'); 
  };

  return (
    <div
      style={{
        height: '100vh', 
        overflowY: 'scroll', 
        scrollSnapType: 'y mandatory', 
      }}
      className="bg-white" 
    >
      <FullPageSection
        className="bg-green-500 text-white"
        style={{ justifyContent: 'flex-start', alignItems: 'stretch' }} 
      >
        <Navbar />
        <header className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-around w-full px-4 md:px-20 py-5 md:py-0">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
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
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img
              src={heroIllustrationImage}
              alt="Ilustrasi Dokter dan BMI"
              className="max-w-sm md:max-w-lg lg:max-w-2xl" 
            />
          </div>
        </header>
      </FullPageSection>

      {/* Bagian Introduction */}
      <FullPageSection
        className="px-4 md:px-20 text-center"
        style={{ justifyContent: 'center', alignItems: 'center' }} 
      >
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Mulai Hidup Sehat dari Sekarang!</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Saatnya mengatur gaya hidup dengan pola makan sehat & olahraga teratur untuk menjaga berat badan ideal yang membuat penampilanmu memikat, serta terhindar dari berbagai risiko penyakit.
          </p>
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-xl">
              <img src={healthAwarenessImage} alt="Kesadaran Kesehatan Menyeluruh" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </FullPageSection>

      {/* Bagian Kategori BMI */}
      <FullPageSection
        className="px-4 md:px-20 bg-gray-50 text-center"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="w-full max-w-4xl"> 
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Kategori Berat Badan Berdasarkan BMI</h2>
          <p className="text-gray-600 mx-auto mb-12">
            Menurut WHO, kategori berat badan ideal untuk pria dan wanita dewasa didasarkan pada Indeks Massa Tubuh (BMI). Berikut adalah kategori berat badan berdasarkan BMI:
          </p>
          <div className="flex justify-center">
            <img src={bmiCategoriesChartImage} alt="Bagan Kategori BMI" className="w-full md:w-3/4 rounded-lg shadow-md" />
          </div>
        </div>
      </FullPageSection>

      {/* Bagian Manfaat (termasuk Footer) */}
      <FullPageSection
        className="px-4 md:px-20" 
        style={{ justifyContent: 'space-between', alignItems: 'stretch' }} 
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 justify-center pt-10 md:pt-16"> 
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Manfaat Pakai Kalkulator BMI</h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            {/* Item 1 */}
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-3xl mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Ketahui Indeks Massa Tubuh (IMT)</h3>
                <p>
                  Body Mass Index atau Indeks Massa Tubuh dihitung berdasarkan berat dan tinggi badan. Dari nilai BMI, kamu bisa tahu apakah kondisi badanmu sudah termasuk ideal atau belum.
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-start">
              <FaHeartbeat className="text-red-500 text-3xl mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Jaga Kesehatan Badan</h3>
                <p>
                  Saat kamu tahu nilai BMI-mu, kamu bisa lebih menjaga kesehatan badanmu, lho. Ini karena berat badan adalah salah satu indikator dari kondisi kesehatanmu.
                </p>
              </div>
            </div>
            {/* Item 3 */}
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
        </div>
        {/* Footer sekarang menjadi bagian dari FullPageSection terakhir */}
        <footer className="text-center text-xs text-black py-4 mt-auto w-full"> 
          © 2025 AWAQU-Kelompok10
        </footer>
      </FullPageSection>
    </div>
  );
}