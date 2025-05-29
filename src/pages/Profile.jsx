import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaIdBadge } from 'react-icons/fa'; 
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import EditBio from '../components/EditBio'; 
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  // Warna-warna avatar
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

  // Fungsi ambil warna berdasar string
  const getColorByString = (str) => {
    if (!str) return avatarColors[0];
    const code = str.charCodeAt(0);
    const index = code % avatarColors.length;
    return avatarColors[index];
  };

  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();
      const currentUser = authData?.user;

      if (authError || !currentUser) {
        console.error("Auth Error:", authError?.message || 'User not found');
        toast.error('You need to be logged in to view this page.');
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
        setProfile({ id: currentUser.id, full_name: 'N/A', bio: '' });
      } else {
        setProfile(profileData);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Logout failed: ' + error.message);
    } else {
      toast.success('Logged out successfully!');
      navigate('/login');
    }
  };

  const handleBioUpdated = (newBio) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      bio: newBio,
    }));
  };

  // Inisial dan warna avatar berdasarkan email / nama lengkap
  const userInitial = (profile?.full_name || userData?.user_metadata?.full_name || 'P').charAt(0).toUpperCase();
  const avatarColor = getColorByString(userData?.email || userInitial);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-center text-sm text-gray-500 min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-3"></div>
            Memuat data profil...
          </div>
        ) : !profile || !userData ? (
          <div className="text-center text-gray-500">
            Tidak dapat memuat data profil. Silakan coba lagi.
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Informasi Pengguna</h2>

            {/* Avatar berwarna */}
            <div className={`w-40 h-40 rounded-full flex items-center justify-center mb-10 mx-auto text-white text-6xl font-semibold ${avatarColor}`}>
              {userInitial}
            </div>

            {/* Info List */}
            <div className="w-full max-w-md mx-auto space-y-6 text-sm">
              <ProfileItem icon={<FaEnvelope />} label="Email" value={userData?.email || '-'} />
              <ProfileItem icon={<FaIdBadge />} label="AWAQU ID" value={userData?.id || '-'} />
              <ProfileItem icon={<FaUserIcon />} label="Nama" value={profile?.full_name || userData?.user_metadata?.full_name || '-'} />

              <EditBio
                userId={userData.id}
                initialBio={profile?.bio || ''}
                onBioUpdateSuccess={handleBioUpdated}
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleLogout}
                className="mt-10 px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:opacity-80 transition"
              >
                Keluar
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

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="bg-lime-300 p-3 rounded-full">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-gray-600 break-all">{value}</p>
    </div>
  </div>
);

// Custom icon untuk username (simple user silhouette)
const FaUserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1117.804 5.12 9 9 0 015.12 17.805zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default ProfilePage;
