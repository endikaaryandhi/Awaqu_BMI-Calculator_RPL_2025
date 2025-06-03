// src/components/BMIResult.jsx
import React from 'react';

export default function BMIResult({ bmi, category }) {
  if (!bmi) return null;

  const categoryConfig = [
    { name: 'Kurus', color: 'bg-sky-500', textColor: 'text-sky-600', range: '< 18.5', silhouetteText: '<18,5' },
    { name: 'Normal', color: 'bg-green-500', textColor: 'text-green-600', range: '18.5 - 24.9', silhouetteText: '18,5-24,9' },
    { name: 'Gemuk', color: 'bg-yellow-400', textColor: 'text-yellow-600', range: '25 - 29.9', silhouetteText: '25,0-29,9' },
    { name: 'Obesitas 1', color: 'bg-orange-500', textColor: 'text-orange-600', range: '30 - 34.9', silhouetteText: '30,0-34,9' },
    { name: 'Obesitas 2', color: 'bg-red-500', textColor: 'text-red-600', range: '≥ 35', silhouetteText: '>35,0' },
  ];

  const currentCategoryDetails = categoryConfig.find(c => c.name === category) || {};
  const bmiDisplay = bmi.toString().replace('.', ',');

  const getSaran = (bmiCategory) => {
    const allSaran = {
      'Normal': {
        saran: [
          "Pertahankan pola makan saat ini agar tetap dalam kondisi optimal.",
          "Untuk mempertahankan BMI normal, lakukan aktifitas fisik 3 kali dalam seminggu."
        ],
        referensi: [
          "UBUR-UBUR IKAN LELE TETEP DIJAGA LEE..."
        ]
      },
      'Kurus': {
        saran: [
          "Tingkatkan asupan kalori dengan makanan bergizi seimbang.",
          "Konsumsi makanan padat energi seperti alpukat, kacang-kacangan, dan produk susu penuh lemak.",
          "Pertimbangkan untuk berkonsultasi dengan ahli gizi.",
          "Lakukan latihan beban untuk membangun massa otot."
        ],
        referensi: [
          "Artikel ini dibuat dan diterbitkan oleh Siloam Hospitals, baca selengkapnya di:",
          "https://www.siloamhospitals.com/informasi-siloam/artikel/apa-itu-underweight"
        ]
      },
      'Gemuk': {
        saran: [
          "Perhatikan ukuran porsi makan Anda.",
          "Pilih makanan rendah lemak dan tinggi serat seperti buah-buahan, sayuran, dan biji-bijian utuh.",
          "Tingkatkan aktivitas fisik harian, targetkan setidaknya 150 menit aktivitas aerobik sedang per minggu.",
          "Hindari minuman manis dan makanan olahan."
        ],
        referensi: [
          "Referensi:",
          "https://primayahospital.com/gizi/berat-badan-berlebih/",
          "https://www.alodokter.com/berat-badan-berlebih"
        ]
      },
      'Obesitas 1': {
        saran: [
          "Sangat disarankan untuk berkonsultasi dengan dokter atau ahli gizi.",
          "Buat rencana penurunan berat badan yang realistis dan aman.",
          "Fokus pada perubahan gaya hidup jangka panjang, termasuk diet sehat dan olahraga teratur.",
          "Waspadai risiko penyakit terkait seperti diabetes tipe 2 dan penyakit jantung."
        ],
        referensi: [
          "Referensi:",
          "National Health Services. Diakses pada 2024. Obesity.",
          "Mayo Clinic. Diakses pada 2024. Obesity.",
          "Healthline. Diakses pada 2024. Obesity.",
          "Baca selengkapnya di:",
          "https://www.halodoc.com/kesehatan/obesitas?srsltid=AfmBOopz-4QAOGkdflKxIlq-0gdsbweqwuX9-53da-zQ1dRfBSxrPW_B"
        ]
      },
      'Obesitas 2': {
        saran: [
          "Segera cari bantuan medis profesional untuk penanganan obesitas.",
          "Program penurunan berat badan yang diawasi secara medis mungkin diperlukan.",
          "Perubahan drastis dalam pola makan dan aktivitas fisik sangat penting.",
          "Diskusikan pilihan pengobatan yang tersedia dengan dokter Anda."
        ],
        referensi: [
          "Referensi:",
          "National Health Services. Diakses pada 2024. Obesity.",
          "Mayo Clinic. Diakses pada 2024. Obesity.",
          "Healthline. Diakses pada 2024. Obesity.",
          "Baca selengkapnya di:",
          "https://www.halodoc.com/kesehatan/obesitas?srsltid=AfmBOopz-4QAOGkdflKxIlq-0gdsbweqwuX9-53da-zQ1dRfBSxrPW_B"
        ]
      }
    };

    return allSaran[bmiCategory] || {
      saran: ["Jaga pola makan seimbang dan rutin berolahraga."],
      referensi: []
    };
  };

  const { saran, referensi } = getSaran(category);

  return (
    <div className="p-5 sm:p-6 bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1 text-gray-700">
        BMI ANDA <span className={currentCategoryDetails.textColor || 'text-black'}>{bmiDisplay}</span>
      </h2>
      <p className={`text-center text-lg sm:text-xl font-semibold mb-6 ${currentCategoryDetails.textColor || 'text-black'}`}>
        ({category})
      </p>

      {/* Siluet Kategori */}
      <div className="flex justify-around items-end mb-2" style={{ minHeight: '100px' }}>
        {categoryConfig.map((cat) => (
          <div key={`silhouette-${cat.name}`} className="flex flex-col items-center text-center w-1/5 px-0.5 sm:px-1">
            <div
              className={`w-full h-16 sm:h-20 md:h-24 rounded-t-full ${cat.color} transition-all duration-300 ease-in-out
                ${cat.name === category ? 'transform scale-110 ring-2 ring-offset-2 ring-gray-500' : 'opacity-60'}`}
              title={cat.name}
            />
            <span className="text-xxs sm:text-xs mt-1 font-medium text-gray-600">{cat.silhouetteText}</span>
            <span className={`text-xxs sm:text-xs font-bold ${cat.name === category ? cat.textColor : 'text-gray-500'}`}>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Bar Kategori */}
      <div className="relative mb-1 px-1 sm:px-2">
        <div className="flex w-full h-4 sm:h-5 rounded-full overflow-hidden border-2 border-gray-200">
          {categoryConfig.map((cat) => (
            <div
              key={cat.name}
              className={`flex-1 ${cat.color} transition-all duration-300`}
              title={`${cat.name} (${cat.range})`}
            />
          ))}
        </div>
      </div>

      {/* Label Kategori */}
      <div className="relative flex w-full justify-around text-center mb-6 sm:mb-8">
        {categoryConfig.map((cat) => (
          <div key={`label-${cat.name}`} className="flex-1 px-0.5 sm:px-1 relative">
            {cat.name === category && (
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 sm:-top-4 z-10">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" className="text-gray-600 shadow-md">
                  <path d="M8 10L0 0L16 0L8 10Z" />
                </svg>
              </div>
            )}
            <span
              className={`block text-[0.6rem] sm:text-xs font-medium break-words
                ${cat.name === category ? `${currentCategoryDetails.textColor} font-extrabold` : 'text-gray-500'}`}
            >
            </span>
          </div>
        ))}
      </div>

      {/* Saran dan Referensi */}
      <div className="mt-4 p-4 sm:p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
        <h3 className={`text-lg sm:text-xl font-semibold mb-3 ${currentCategoryDetails.textColor || 'text-gray-800'}`}>
          Saran untuk Kategori: {category}
        </h3>

      <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base text-justify">
        {saran.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>

      {referensi.length > 0 && (
        <div className="mt-4 space-y-1 text-sm text-gray-600 text-justify">
          {referensi.map((ref, idx) => {
            const isUrl = ref.startsWith('http://') || ref.startsWith('https://');
            return isUrl ? (
              <p key={idx}>
                <a href={ref} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {ref}
                </a>
              </p>
            ) : (
              <p key={idx}>{ref}</p>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
