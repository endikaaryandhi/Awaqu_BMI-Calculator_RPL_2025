import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient';

const History = () => {
  // Warna-warna lingkaran avatar
  const avatarColors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
  ];

  // Fungsi untuk menentukan warna berdasarkan string
  const getColorByString = (str) => {
    if (!str) return avatarColors[0];
    const code = str.charCodeAt(0);
    const index = code % avatarColors.length;
    return avatarColors[index];
  };

  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  // Inisialisasi inisial dan warna avatar setelah data user tersedia
  const userInitial = user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'P';
  const avatarColor = getColorByString(user?.email || userInitial);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('User not authenticated:', error?.message);
        return;
      }

      setUser(user);

      const { data: bmiData, error: bmiError } = await supabase
        .from('bmi_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (bmiError) {
        console.error('Error fetching BMI records:', bmiError.message);
      } else {
        setRecords(bmiData);
      }

      setLoading(false);
    };

    fetchData();
  }, [limit]);

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto mt-8 px-6">
          {/* Profile User */}
          <div className="flex items-center space-x-4 mb-6">
            {user?.user_metadata?.full_name ? (
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-semibold ${avatarColor}`}>
                {userInitial}
              </div>
            ) : (
              <FaUserCircle className="text-5xl text-gray-600" />
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.user_metadata?.full_name || 'Pengguna'}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-center mb-6">RIWAYAT HASIL BMI</h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center text-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-3"></div>
              Loading data...
            </div>
          ) : (
            <>
              {/* Tabel dengan scroll vertikal jika data lebih dari 10 */}
              <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded">
                  <table className="w-full border-collapse text-sm text-left min-w-full">
                    <thead className="bg-gray-200 text-gray-700 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 border-b border-gray-300">Gender</th>
                        <th className="px-4 py-2 border-b border-gray-300">Tinggi</th>
                        <th className="px-4 py-2 border-b border-gray-300">Berat</th>
                        <th className="px-4 py-2 border-b border-gray-300">BMI</th>
                        <th className="px-4 py-2 border-b border-gray-300">Kategori</th>
                        <th className="px-4 py-2 border-b border-gray-300">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center text-gray-500 py-4">
                            Belum ada data riwayat.
                          </td>
                        </tr>
                      ) : (
                        records.map((item, index) => (
                          <tr key={index} className="border-t border-gray-300">
                            <td className="px-4 py-2">{item.gender}</td>
                            <td className="px-4 py-2">{item.height} cm</td>
                            <td className="px-4 py-2">{item.weight} kg</td>
                            <td className="px-4 py-2">{item.bmi.toFixed(1)}</td>
                            <td className="px-4 py-2">{item.category}</td>
                            <td className="px-4 py-2">
                              {new Date(item.created_at).toLocaleDateString('id-ID')}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dropdown Footer */}
              <div className="mt-4 flex items-center space-x-2">
                <label htmlFor="lihat" className="text-sm">Lihat</label>
                <select
                  id="lihat"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={limit}
                  onChange={handleLimitChange}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="text-center text-xs text-black py-4">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
};

export default History;
