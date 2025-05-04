import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (category) searchParams.set('category', category);
    if (minPrice) searchParams.set('minPrice', minPrice);
    if (maxPrice) searchParams.set('maxPrice', maxPrice);
    if (endDate) searchParams.set('endDate', endDate);
    
    navigate(`/auctions?${searchParams.toString()}`);
  };

  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-lg backdrop-blur-sm p-6 shadow-xl">
      <h2 className="text-white text-xl font-semibold mb-4">FIND AUCTIONS</h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-white mb-1">CATEGORY</label>
            <div className="relative">
              <select 
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              >
                <option value="">Select category</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="luxury">Luxury</option>
                <option value="sports">Sports Car</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-white mb-1">MIN PRICE</label>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min $"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-white mb-1">MAX PRICE</label>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max $"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="endDate" className="block text-white mb-1">AUCTION END DATE</label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 transition-colors text-white font-semibold py-3 px-6 rounded-md"
        >
          FIND A VEHICLE
        </button>
      </form>
    </div>
  );
};

export default SearchForm;