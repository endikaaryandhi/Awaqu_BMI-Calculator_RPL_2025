import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // keluar dari Supabase
    navigate('/'); // arahkan ke halaman login
  };

  return (
        <div className="min-h-screen bg-white">
      <Navbar />

      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}
