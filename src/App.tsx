import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import FeaturedAuctions from './components/FeaturedAuctions';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import VehicleList from './components/VehicleList';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import AccountPage from './components/AccountPage';
import AuthLayout from './components/AuthLayout';
import { mockVehicles } from './mockData';

function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        nav {
          background-color: ${scrolled ? 'rgba(17, 24, 39, 0.9)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(10px)' : 'none'};
        }
      `}</style>
      <HeroSection />
      <CategorySection />
      <FeaturedAuctions />
      <HowItWorks />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auctions" element={<VehicleList vehicles={mockVehicles} />} />
        <Route path="/category/:category" element={<VehicleList vehicles={mockVehicles} />} />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignUpForm />
            </AuthLayout>
          }
        />
        <Route
          path="/account"
          element={
            <AuthLayout requireAuth>
              <AccountPage />
            </AuthLayout>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;