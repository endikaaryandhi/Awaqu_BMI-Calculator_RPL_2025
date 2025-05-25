import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Calculator from '../pages/Calculator';
import History from '../pages/History';
import Profile from '../pages/Profile';
import { supabase } from '../utils/supabaseClient';

const AppRouter = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil user aktif saat ini
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    // Listener login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>; // Loading sementara

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/login" />} />

        {/* Protected routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/calculator" element={user ? <Calculator /> : <Navigate to="/" />} />
        <Route path="/history" element={user ? <History /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
