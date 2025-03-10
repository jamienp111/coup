import { SignInOrUpForm } from "app";
import { HeartIcon } from "components/HeartIcon";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartIcon className="h-8 w-8 text-pink-500" filled />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">
            HeartSync
          </h1>
        </div>
        <button 
          onClick={() => navigate("/")}
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Back to Home
        </button>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <HeartIcon className="h-12 w-12 text-pink-500 mb-3" filled />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-center mb-6">
              Sign in to connect with your partner and continue your relationship journey
            </p>
          </div>
          
          <SignInOrUpForm signInOptions={{ google: true, emailAndPassword: true }} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} HeartSync. All rights reserved.</p>
      </footer>
    </div>
  );
};