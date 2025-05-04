import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

const categories: Category[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 42
  },
  {
    id: 'suv',
    name: 'SUV',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 38
  },
  {
    id: 'luxury',
    name: 'Luxury',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 24
  },
  {
    id: 'sports',
    name: 'Sports Car',
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 16
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect vehicle for your journey from our wide range of categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div 
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-80">{category.count} vehicles available</p>
              </div>
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;