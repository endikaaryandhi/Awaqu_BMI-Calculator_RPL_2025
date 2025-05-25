import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // keluar dari Supabase
    navigate('/'); // arahkan ke halaman login
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Home Page</h1>
      <p>You are logged in!</p>
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
