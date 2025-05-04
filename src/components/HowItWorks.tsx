import React from 'react';
import { Search, Gavel, Award, Truck } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Find Your Car',
    description: 'Browse our extensive collection of vehicles and find the one that matches your needs.',
    icon: <Search className="h-8 w-8 text-blue-500" />
  },
  {
    id: 2,
    title: 'Place Your Bid',
    description: 'Set your maximum bid and compete with other buyers in real-time auctions.',
    icon: <Gavel className="h-8 w-8 text-blue-500" />
  },
  {
    id: 3,
    title: 'Win the Auction',
    description: 'If you\'re the highest bidder when the auction ends, congratulations! The car is yours.',
    icon: <Award className="h-8 w-8 text-blue-500" />
  },
  {
    id: 4,
    title: 'Receive Your Car',
    description: 'Complete the payment and choose between pickup or delivery options for your new vehicle.',
    icon: <Truck className="h-8 w-8 text-blue-500" />
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bidding on and purchasing your dream car has never been easier with our straightforward auction process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/auctions" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
          >
            Start Bidding Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;