import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaIdBadge, FaLeaf } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);       // Supabase user
  const [profile, setProfile] = useState(null);         // Data dari tabel 'profiles'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      const currentUser = data?.user;

      if (error || !currentUser) {
        console.error("Auth Error:", error?.message || 'User not found');
        navigate('/login');
        return;
      }

      setUserData(currentUser);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (profileError) {
        console.error("Profile Error:", profileError.message);
        toast.error('Gagal mengambil data profil.');
      } else {
        setProfile(profileData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-3"></div>
            Memuat data profil...
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Profile Information</h2>

            {/* Avatar */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-green-500 to-cyan-500 flex items-center justify-center mb-10 mx-auto">
              <FaUser className="text-white text-6xl" />
            </div>

            {/* Info List */}
            <div className="w-full max-w-md mx-auto space-y-6 text-sm">
              <ProfileItem icon={<FaUser />} label="Username" value={profile?.full_name || '-'} />
              <ProfileItem icon={<FaIdBadge />} label="AWAQU ID" value={userData?.id || '-'} />
              <ProfileItem icon={<FaEnvelope />} label="Email" value={userData?.email || '-'} />
              <ProfileItem icon={<FaLeaf />} label="Bio" value="Selamat datang di AwaQu!" />
            </div>

            <div className="text-center">
              <button
                onClick={handleLogout}
                className="mt-10 px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:opacity-80 transition"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="text-center text-xs text-black py-4">
        © 2025 AWAQU-Kelompok10
      </footer>
    </div>
  );
};

// Komponen kecil reusable
const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="bg-lime-300 p-3 rounded-full">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-gray-600 break-all">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
