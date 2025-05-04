import React from 'react';
import SearchForm from './SearchForm';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          filter: 'brightness(0.5)'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 text-white mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            GREAT CAR<br />AUCTION DEALS
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl">
            Find the perfect car for your next journey at an affordable price through our trusted auction platform.
          </p>
        </div>
        
        <div className="w-full md:w-2/5">
          <SearchForm />
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-24" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#42B5E8" 
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;