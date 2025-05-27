import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient';

const History = () => {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [limit, setLimit] = useState(10); // jumlah data ditampilkan
  const [loading, setLoading] = useState(true);

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
            <FaUserCircle className="text-5xl text-gray-600" />
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
                {/* Tabel */}
                <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Tinggi</th>
                        <th className="px-4 py-2">Berat</th>
                        <th className="px-4 py-2">BMI</th>
                        <th className="px-4 py-2">Kategori</th>
                        <th className="px-4 py-2">Tanggal</th>
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
