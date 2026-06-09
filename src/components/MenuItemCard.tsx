import { Star, Plus, Minus, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { state, addItem, updateQuantity } = useCart();
  const cartItem = state.items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 group">
      {/* Badge */}
      {item.isSpecial && (
        <div className="absolute top-3 right-3 z-10 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Sparkles className="h-3 w-3" />
          <span>Special</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-500/20 to-gray-700 flex items-center justify-center">
        <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
          {item.image}
        </span>
        {item.isVeg && (
          <div className="absolute top-3 left-3 border-2 border-green-500 p-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-yellow-500 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{item.rating}</span>
          <span className="text-gray-500 text-xs">/5</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-bold text-yellow-500">₹{item.price}</div>
          
          {quantity === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-gray-700 rounded-lg px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="text-yellow-500 hover:text-yellow-400 p-1"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-white font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="text-yellow-500 hover:text-yellow-400 p-1"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
