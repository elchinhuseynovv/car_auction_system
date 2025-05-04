import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Car, Settings, LogOut, User, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Bid {
  id: string;
  amount: number;
  created_at: string;
  vehicle_id: string;
  vehicle: {
    title: string;
    make: string;
    model: string;
    current_bid: number;
  };
}

const AccountPage: React.FC = () => {
  const { user, profile, signOut } = useAuthStore();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bids')
          .select(`
            id,
            amount,
            created_at,
            vehicle_id,
            vehicle:vehicles!bids_vehicle_id_fkey (
              title,
              make,
              model,
              current_bid
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBids(data || []);
      } catch (error) {
        console.error('Error fetching bids:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Account</h1>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
            
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Account Information</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2" />
                  <span>
                    {profile?.first_name} {profile?.last_name}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">My Bids</h2>
              {loading ? (
                <p className="text-gray-500">Loading bids...</p>
              ) : bids.length > 0 ? (
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div
                      key={bid.id}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Car className="h-6 w-6 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium">{bid.vehicle?.title}</p>
                          <p className="text-sm text-gray-500">
                            Your bid: ${bid.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Current highest bid: ${bid.vehicle?.current_bid.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(bid.created_at).toLocaleDateString()} {new Date(bid.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-medium ${bid.amount === bid.vehicle?.current_bid ? 'text-green-500' : 'text-gray-500'}`}>
                          {bid.amount === bid.vehicle?.current_bid ? 'Highest Bid' : 'Outbid'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You haven't placed any bids yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                <Settings className="h-5 w-5 mr-2" />
                Manage Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;