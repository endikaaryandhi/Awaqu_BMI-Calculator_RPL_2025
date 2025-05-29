// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaCheckCircle, FaExclamationTriangle, FaHeartbeat } from 'react-icons/fa';

const heroIllustrationImage = '/assets/pana.png';
const healthAwarenessImage = '/assets/yap.png';
const bmiCategoriesChartImage = '/assets/ukuran.png';

export default function Home() {
  const navigate = useNavigate();

  const handleCekBmi = () => navigate('/calculator');

  return (
    <div className="bg-white min-h-screen overflow-y-auto scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-20 pt-10 md:pt-24 pb-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Body Mass Index</h1>
          <p className="mb-6 text-lg">
            Tubuh ideal merupakan dambaan setiap orang. Selain menunjang penampilan, memiliki tubuh ideal dapat menghindarkan Anda dari berbagai risiko penyakit.
          </p>
          <button
            onClick={handleCekBmi}
            className="w-full sm:w-64 bg-gradient-to-r from-[#16B3AC] to-[#D2DC02] text-white font-semibold py-3 px-6 rounded-full shadow-md hover:opacity-80 active:brightness-90 transition duration-300"
          >
            Cek BMI
          </button>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={heroIllustrationImage}
            alt="Ilustrasi Dokter dan BMI"
            className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl w-full h-auto"
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 md:px-20 text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mulai Hidup Sehat dari Sekarang!</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Saatnya mengatur gaya hidup dengan pola makan sehat & olahraga teratur untuk menjaga berat badan ideal yang membuat penampilanmu memikat, serta terhindar dari berbagai risiko penyakit.
        </p>
        <div className="flex justify-center">
          <img
            src={healthAwarenessImage}
            alt="Kesadaran Kesehatan"
            className="rounded-lg shadow-lg max-w-full sm:max-w-xl"
          />
        </div>
      </section>

      {/* Kategori BMI */}
      <section className="px-4 py-16 md:px-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Kategori Berat Badan Berdasarkan BMI</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Menurut WHO, kategori berat badan ideal untuk pria dan wanita dewasa didasarkan pada Indeks Massa Tubuh (BMI).
        </p>
        <div className="flex justify-center">
          <img
            src={bmiCategoriesChartImage}
            alt="Bagan Kategori BMI"
            className="w-full md:w-3/4 rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Manfaat */}
      <section className="px-4 py-16 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Manfaat Pakai Kalkulator BMI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            {/* Item Manfaat */}
            {[
              {
                icon: <FaCheckCircle className="text-green-500 text-3xl mr-3" />,
                title: 'Ketahui Indeks Massa Tubuh (IMT)',
                desc: 'Body Mass Index dihitung berdasarkan berat dan tinggi badan. Kamu bisa tahu apakah kondisi badanmu sudah ideal atau belum.',
              },
              {
                icon: <FaHeartbeat className="text-red-500 text-3xl mr-3" />,
                title: 'Jaga Kesehatan Badan',
                desc: 'Dengan tahu BMI-mu, kamu bisa lebih menjaga kesehatan. Berat badan adalah indikator kondisi kesehatan.',
              },
              {
                icon: <FaExclamationTriangle className="text-yellow-500 text-3xl mr-3" />,
                title: 'Lebih Waspada Sama Berat Badan',
                desc: 'Pantau BMI secara teratur untuk menjaga berat badan agar tidak terlalu tinggi atau terlalu rendah.',
              },
              {
                icon: <FaExclamationTriangle className="text-yellow-500 text-3xl mr-3" />,
                title: 'Jauhi Obesitas',
                desc: 'Sayangi tubuhmu dengan menjaga BMI agar tetap dalam batas normal.',
              },
            ].map((item, i) => (
              <div key={i} className="flex bg-white border rounded-xl p-6 shadow-md">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-justify">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-black py-6">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
}
