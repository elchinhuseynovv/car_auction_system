import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 transition-all duration-300 px-4 md:px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Car className="text-blue-400 h-8 w-8" />
          <span className="text-blue-400 font-bold text-2xl">RENTLY</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/auctions" className="text-white hover:text-blue-400 transition-colors">Our vehicles</Link>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/account"
              className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium px-5 py-2 rounded-md"
            >
              My Account
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 hover:bg-pink-600 transition-colors text-white font-medium px-5 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;