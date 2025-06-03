import LoginForm from '../Auth/LoginForm';
import { FaLeaf } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-400 via-amber-100 to-lime-300 flex items-center justify-center relative overflow-hidden font-sans px-4">

      {/* Background Accent Shape */}
      <div className="absolute top-0 -left-20 w-[150%] h-[60vh] bg-gradient-to-r from-teal-500 to-yellow-300 transform -skew-y-6 opacity-30 z-0" />

      {/* Logo */}
    <div className="absolute top-6 left-6 flex items-center space-x-3 z-10 group">
      <FaLeaf className="text-green-700 text-4xl drop-shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      <h1 className="text-3xl md:text-4xl tracking-wide text-green-950 drop-shadow-md font-semibold transition-all duration-300 group-hover:text-green-800">
        <span className="font-bold text-gradient bg-gradient-to-r from-green-700 to-lime-500 bg-clip-text text-transparent">A</span>
        <span className="text-green-700">w</span>
        <span className="text-green-700">a</span>
        <span className="font-bold text-gradient bg-gradient-to-r from-lime-500 to-green-700 bg-clip-text text-transparent">Q</span>
        <span className="text-green-700">u</span>
      </h1>
    </div>


      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md ">
        <LoginForm />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-xs text-black z-10">
        © 2025 All Rights Reserved. Kelompok 10 | AwaQu
      </footer>
    </div>
  );
};

export default Login;
