import React from 'react';
import { Clock, DollarSign, Users } from 'lucide-react';

interface Auction {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  endTime: string;
  bidCount: number;
  year: number;
  make: string;
  model: string;
}

const auctions: Auction[] = [
  {
    id: '1',
    title: '2023 Mercedes-Benz S-Class',
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600',
    currentBid: 75000,
    endTime: '2025-06-24T18:00:00',
    bidCount: 18,
    year: 2023,
    make: 'Mercedes-Benz',
    model: 'S-Class'
  },
  {
    id: '2',
    title: '2022 BMW M4 Competition',
    image: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=600',
    currentBid: 68500,
    endTime: '2025-06-23T15:30:00',
    bidCount: 24,
    year: 2022,
    make: 'BMW',
    model: 'M4 Competition'
  },
  {
    id: '3',
    title: '2024 Audi e-tron GT',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-audi-rs-e-tron-gt-101-649dc205d9a24.jpg?crop=0.586xw:0.496xh;0.207xw,0.315xh&resize=2048:*',
    currentBid: 89200,
    endTime: '2025-06-25T12:00:00',
    bidCount: 15,
    year: 2024,
    make: 'Audi',
    model: 'e-tron GT'
  }
];

const FeaturedAuctions: React.FC = () => {
  // Function to calculate time remaining
  const getTimeRemaining = (endTime: string): string => {
    const total = Date.parse(endTime) - Date.now();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Auctions</h2>
            <p className="text-gray-600">Bid on these premium vehicles before they're gone</p>
          </div>
          <a 
            href="/auctions" 
            className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
          >
            View all
            <svg className="ml-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <div 
              key={auction.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div 
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${auction.image})` }}
              />
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{auction.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {auction.year}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <span>{auction.make}</span>
                  <span className="mx-2">•</span>
                  <span>{auction.model}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <DollarSign size={18} className="text-gray-500 mr-1" />
                    <div>
                      <p className="text-xs text-gray-500">Current Bid</p>
                      <p className="font-semibold">${auction.currentBid.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users size={18} className="text-gray-500 mr-1" />
                    <div>
                      <p className="text-xs text-gray-500">Bids</p>
                      <p className="font-semibold">{auction.bidCount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={18} className="text-gray-500 mr-1" />
                    <div>
                      <p className="text-xs text-gray-500">Ends in</p>
                      <p className="font-semibold">{getTimeRemaining(auction.endTime)}</p>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition-colors">
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuctions;