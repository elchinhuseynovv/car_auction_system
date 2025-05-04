import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="text-blue-400 h-6 w-6" />
              <span className="text-blue-400 font-bold text-xl">RENTLY</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premier online car auction platform connecting sellers and buyers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/auctions" className="text-gray-400 hover:text-blue-400 transition-colors">All Auctions</a></li>
              <li><a href="/how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Vehicle Categories</h3>
            <ul className="space-y-2">
              <li><a href="/category/sedan" className="text-gray-400 hover:text-blue-400 transition-colors">Sedan</a></li>
              <li><a href="/category/suv" className="text-gray-400 hover:text-blue-400 transition-colors">SUV</a></li>
              <li><a href="/category/luxury" className="text-gray-400 hover:text-blue-400 transition-colors">Luxury</a></li>
              <li><a href="/category/sports" className="text-gray-400 hover:text-blue-400 transition-colors">Sports Cars</a></li>
              <li><a href="/category/electric" className="text-gray-400 hover:text-blue-400 transition-colors">Electric</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Auction Drive, San Francisco, CA 94158</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@rently.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Rently. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="/terms" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">Terms of Service</a>
              <a href="/privacy" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a>
              <a href="/cookies" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;