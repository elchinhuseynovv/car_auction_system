import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Vehicle } from '../types';
import { DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [bidAmount, setBidAmount] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [success, setSuccess] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [localVehicles, setLocalVehicles] = useState<Vehicle[]>(vehicles);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    setLocalVehicles(vehicles);
  }, [vehicles]);

  // Subscribe to real-time bid updates
  useEffect(() => {
    const subscription = supabase
      .channel('bid-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bids'
        },
        (payload) => {
          const { vehicle_id, amount } = payload.new;
          setLocalVehicles(prevVehicles =>
            prevVehicles.map(vehicle => {
              if (vehicle.id === vehicle_id) {
                return {
                  ...vehicle,
                  currentBid: amount,
                  bidCount: vehicle.bidCount + 1
                };
              }
              return vehicle;
            })
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  let filteredVehicles = localVehicles;

  // Filter by URL category
  if (category) {
    filteredVehicles = filteredVehicles.filter(
      vehicle => vehicle.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search params
  const searchCategory = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const endDate = searchParams.get('endDate');

  if (searchCategory) {
    filteredVehicles = filteredVehicles.filter(
      vehicle => vehicle.category.toLowerCase() === searchCategory.toLowerCase()
    );
  }

  if (minPrice) {
    filteredVehicles = filteredVehicles.filter(
      vehicle => vehicle.currentBid >= parseInt(minPrice)
    );
  }

  if (maxPrice) {
    filteredVehicles = filteredVehicles.filter(
      vehicle => vehicle.currentBid <= parseInt(maxPrice)
    );
  }

  if (endDate) {
    filteredVehicles = filteredVehicles.filter(
      vehicle => new Date(vehicle.endTime) <= new Date(endDate)
    );
  }

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

  const handleBid = async (vehicleId: string) => {
    setError(null);
    setSuccess({ ...success, [vehicleId]: false });
    
    if (!user) {
      navigate('/login');
      return;
    }

    const amount = bidAmount[vehicleId];
    if (!amount) {
      setError('Please enter a bid amount');
      return;
    }

    const vehicle = localVehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    if (amount <= vehicle.currentBid) {
      setError('Bid must be higher than current bid');
      return;
    }

    if (amount < vehicle.currentBid + vehicle.bidIncrement) {
      setError(`Minimum bid increment is $${vehicle.bidIncrement}`);
      return;
    }

    setLoading({ ...loading, [vehicleId]: true });

    try {
      const { data: bid, error: bidError } = await supabase
        .from('bids')
        .insert({
          vehicle_id: vehicleId,
          amount: amount,
          user_id: user.id
        })
        .select()
        .single();

      if (bidError) throw bidError;

      // Update local state
      setBidAmount({ ...bidAmount, [vehicleId]: 0 });
      setSuccess({ ...success, [vehicleId]: true });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess({ ...success, [vehicleId]: false });
      }, 3000);

    } catch (error: any) {
      console.error('Error placing bid:', error);
      setError(error.message || 'Failed to place bid. Please try again.');
    } finally {
      setLoading({ ...loading, [vehicleId]: false });
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {category ? `${category} Vehicles` : 'All Vehicles'}
        </h1>
        <p className="text-gray-600">
          {filteredVehicles.length} vehicles available
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle) => (
          <div 
            key={vehicle.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div 
              className="h-56 bg-cover bg-center"
              style={{ backgroundImage: `url(${vehicle.images[0]})` }}
            />
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{vehicle.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {vehicle.year}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <span>{vehicle.make}</span>
                <span className="mx-2">•</span>
                <span>{vehicle.model}</span>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <DollarSign size={18} className="text-gray-500 mr-1" />
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="font-semibold">${vehicle.currentBid.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users size={18} className="text-gray-500 mr-1" />
                  <div>
                    <p className="text-xs text-gray-500">Bids</p>
                    <p className="font-semibold">{vehicle.bidCount}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-500 mr-1" />
                  <div>
                    <p className="text-xs text-gray-500">Ends in</p>
                    <p className="font-semibold">{getTimeRemaining(vehicle.endTime)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {success[vehicle.id] && (
                  <div className="flex items-center text-green-600 mb-2">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-sm">Bid placed successfully!</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bidAmount[vehicle.id] || ''}
                    onChange={(e) => setBidAmount({
                      ...bidAmount,
                      [vehicle.id]: parseInt(e.target.value)
                    })}
                    placeholder={`Min bid: $${(vehicle.currentBid + vehicle.bidIncrement).toLocaleString()}`}
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    disabled={loading[vehicle.id]}
                  />
                  <button 
                    onClick={() => handleBid(vehicle.id)}
                    disabled={loading[vehicle.id]}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading[vehicle.id] ? 'Placing Bid...' : 'Place Bid'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;