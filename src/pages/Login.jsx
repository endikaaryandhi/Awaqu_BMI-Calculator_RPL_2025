import LoginForm from '../Auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-b from-[#16B3AC] to-[#D2DC02]">
        <div className="ml-10 mb-10 text-3xl text-black absolute top-5 z-5">
        <span className="font-bold">A</span>
        <span>w</span>
        <span>a</span>
        <span className="font-bold">Q</span>
        <span>u</span>
        </div>

      <div className="w-full flex justify-center items-center">
        <LoginForm />
      </div>
    
      <footer className="absolute bottom-10 text-white text-xs text-center w-full z-10">
        © 2025 All Rights Reserved. Kelompok 10 | AwaQu
      </footer>
    </div>
    
  );
};

export default Login;

