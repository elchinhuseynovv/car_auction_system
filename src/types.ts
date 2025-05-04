export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  description: string;
  images: string[];
  startingBid: number;
  currentBid: number;
  bidIncrement: number;
  endTime: string;
  sellerId: string;
  bidCount: number;
  category: string;
  features: string[];
  condition: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  role: 'user' | 'admin';
}

export interface Bid {
  id: string;
  vehicleId: string;
  userId: string;
  amount: number;
  timestamp: string;
  username: string;
}

export interface Filter {
  make?: string;
  model?: string;
  category?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  fuelType?: string;
}