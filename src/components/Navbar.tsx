import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, History } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const location = useLocation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-yellow-600/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Leaf className="h-8 w-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            <div>
              <h1 className="text-xl font-bold text-yellow-500 group-hover:text-yellow-400 transition-colors">
                Watika Gardenia
              </h1>
              <p className="text-xs text-gray-400">Fine Dining Experience</p>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/menu')
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/5'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/orders"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/orders')
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/5'
              }`}
            >
              <History className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/cart')
                  ? 'text-yellow-500 bg-yellow-500/10'
                  : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/5'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
