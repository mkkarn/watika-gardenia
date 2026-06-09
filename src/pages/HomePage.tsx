import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Truck } from 'lucide-react';
import { menuItems } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';

const banners = [
  {
    title: 'Welcome Special!',
    subtitle: 'Get 20% OFF on your first order',
    code: 'WELCOME20',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    title: 'Loyalty Rewards',
    subtitle: 'Use code WATIKA10 for 10% discount',
    code: 'WATIKA10',
    gradient: 'from-green-600 to-teal-600',
  },
  {
    title: 'Flat ₹100 OFF',
    subtitle: 'On orders above ₹500',
    code: 'FLAT100',
    gradient: 'from-orange-600 to-red-600',
  },
  {
    title: 'Seasonal Special',
    subtitle: '15% OFF with code GARDENIA15',
    code: 'GARDENIA15',
    gradient: 'from-pink-600 to-rose-600',
  },
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredItems = menuItems.filter(item => item.isSpecial || item.rating >= 4.8).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjE1LDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Watika Gardenia
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience authentic flavors delivered fresh to your doorstep. 
              Order now and savor the finest culinary delights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/menu"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Browse Menu</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/cart"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-bold px-8 py-4 rounded-lg transition-all duration-300"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Banner */}
      <div className="bg-gray-800 border-y border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`bg-gradient-to-r ${banners[currentBanner].gradient} rounded-xl p-8 text-white text-center transition-all duration-500`}>
            <h2 className="text-3xl font-bold mb-2">{banners[currentBanner].title}</h2>
            <p className="text-lg mb-4">{banners[currentBanner].subtitle}</p>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-mono font-bold text-xl">
              {banners[currentBanner].code}
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentBanner ? 'bg-yellow-500 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500/50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-4">
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Get your food delivered hot and fresh within 45 minutes</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500/50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400">Multiple payment options with SSL encryption</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-yellow-500/50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-4">
                <Truck className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Tracking</h3>
              <p className="text-gray-400">Track your order in real-time from kitchen to doorstep</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">Featured Dishes</h2>
            <p className="text-gray-400 text-lg">Handpicked favorites from our menu</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 font-semibold text-lg"
            >
              <span>View Full Menu</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
