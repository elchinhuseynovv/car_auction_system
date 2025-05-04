import { Vehicle, User, Bid } from './types';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    title: '2023 Mercedes-Benz S-Class',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2023,
    mileage: 5000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    color: 'Black',
    description: 'Luxury sedan with premium features and excellent condition. Low mileage and well maintained.',
    images: [
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    startingBid: 65000,
    currentBid: 75000,
    bidIncrement: 500,
    endTime: '2025-06-24T18:00:00',
    sellerId: 'user1',
    bidCount: 18,
    category: 'Luxury',
    features: ['Heated Seats', 'Navigation', 'Sunroof', 'Premium Sound System', 'Driver Assistance Package'],
    condition: 'Excellent',
    location: 'New York, NY'
  },
  {
    id: '2',
    title: '2022 BMW M4 Competition',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2022,
    mileage: 8500,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    color: 'Alpine White',
    description: 'High-performance luxury coupe with M Sport package. One owner, garage kept.',
    images: [
      'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    startingBid: 62000,
    currentBid: 68500,
    bidIncrement: 500,
    endTime: '2025-06-23T15:30:00',
    sellerId: 'user2',
    bidCount: 24,
    category: 'Sports',
    features: ['M Sport Package', 'Carbon Fiber Trim', 'Harman Kardon Audio', 'Adaptive Suspension'],
    condition: 'Excellent',
    location: 'Miami, FL'
  },
  {
    id: '3',
    title: '2024 Audi e-tron GT',
    make: 'Audi',
    model: 'e-tron GT',
    year: 2024,
    mileage: 3200,
    fuelType: 'Electric',
    transmission: 'Automatic',
    color: 'Daytona Gray',
    description: 'All-electric performance sedan with cutting-edge technology and premium interior.',
    images: [
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    startingBid: 82000,
    currentBid: 89200,
    bidIncrement: 1000,
    endTime: '2025-06-25T12:00:00',
    sellerId: 'user3',
    bidCount: 15,
    category: 'Electric',
    features: ['Virtual Cockpit', 'Bang & Olufsen Sound System', 'Adaptive Air Suspension', 'Matrix LED Headlights'],
    condition: 'Like New',
    location: 'Los Angeles, CA'
  },
  {
    id: '4',
    title: '2021 Tesla Model S Plaid',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2021,
    mileage: 12000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    color: 'Red Multi-Coat',
    description: 'High-performance electric vehicle with incredible acceleration and range.',
    images: [
      'https://greencarscompare.com/upload/resize_cache/iblock/af8/1100_618_2/683f5zoi0e5wpubzns7nxn1ic7rsxp1o.png',
      'https://greencarscompare.com/upload/resize_cache/iblock/af8/1100_618_2/683f5zoi0e5wpubzns7nxn1ic7rsxp1o.png',
    ],
    startingBid: 78000,
    currentBid: 85500,
    bidIncrement: 500,
    endTime: '2025-06-26T10:00:00',
    sellerId: 'user4',
    bidCount: 22,
    category: 'Electric',
    features: ['Autopilot', 'Full Self-Driving Hardware', 'Premium Interior', 'Ultra High Fidelity Sound System'],
    condition: 'Excellent',
    location: 'San Francisco, CA'
  },
  {
    id: '5',
    title: '2020 Porsche 911 Carrera S',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2020,
    mileage: 18500,
    fuelType: 'Gasoline',
    transmission: 'PDK',
    color: 'GT Silver Metallic',
    description: 'Iconic sports car with exceptional handling and performance. Well maintained with full service history.',
    images: [
      'https://bringatrailer.com/wp-content/uploads/2023/10/Porsche-911-Carrera-S_20231020-009-20354-scaled.jpg',
      'https://bringatrailer.com/wp-content/uploads/2023/10/Porsche-911-Carrera-S_20231020-009-20354-scaled.jpg',
    ],
    startingBid: 88000,
    currentBid: 94500,
    bidIncrement: 1000,
    endTime: '2025-06-22T14:00:00',
    sellerId: 'user5',
    bidCount: 19,
    category: 'Sports',
    features: ['Sport Chrono Package', 'PASM Sport Suspension', 'Premium Package', 'Bose Surround Sound'],
    condition: 'Very Good',
    location: 'Chicago, IL'
  },
  {
    id: '6',
    title: '2022 Range Rover Sport HSE',
    make: 'Land Rover',
    model: 'Range Rover Sport HSE',
    year: 2022,
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    color: 'Santorini Black',
    description: 'Luxury SUV with off-road capability and premium interior. Dealer maintained.',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    startingBid: 72000,
    currentBid: 78500,
    bidIncrement: 500,
    endTime: '2025-06-27T16:00:00',
    sellerId: 'user6',
    bidCount: 12,
    category: 'SUV',
    features: ['Panoramic Roof', 'Meridian Sound System', 'Adaptive Dynamics', 'Terrain Response 2'],
    condition: 'Excellent',
    location: 'Dallas, TX'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedDate: '2023-01-15T00:00:00',
    role: 'user'
  },
  {
    id: 'user2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    joinedDate: '2023-02-20T00:00:00',
    role: 'user'
  },
  {
    id: 'user3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    joinedDate: '2023-03-10T00:00:00',
    role: 'admin'
  }
];

export const mockBids: Bid[] = [
  {
    id: 'bid1',
    vehicleId: '1',
    userId: 'user2',
    amount: 75000,
    timestamp: '2025-06-18T14:30:00',
    username: 'Emily Johnson'
  },
  {
    id: 'bid2',
    vehicleId: '1',
    userId: 'user1',
    amount: 74500,
    timestamp: '2025-06-18T13:45:00',
    username: 'John Smith'
  },
  {
    id: 'bid3',
    vehicleId: '2',
    userId: 'user1',
    amount: 68500,
    timestamp: '2025-06-17T16:20:00',
    username: 'John Smith'
  },
  {
    id: 'bid4',
    vehicleId: '2',
    userId: 'user3',
    amount: 68000,
    timestamp: '2025-06-17T15:30:00',
    username: 'Michael Brown'
  },
  {
    id: 'bid5',
    vehicleId: '3',
    userId: 'user2',
    amount: 89200,
    timestamp: '2025-06-19T10:15:00',
    username: 'Emily Johnson'
  }
];