import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Recommendations from '../components/Recommendations';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    state,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    getCartTotal,
    getDiscount,
    getFinalTotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = getCartTotal();
  const discount = getDiscount();
  const taxes = (subtotal - discount) * 0.05;
  const total = getFinalTotal();

  const handleApplyCoupon = () => {
    setCouponError('');
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    } else {
      const coupon = state.coupon;
      if (coupon?.minOrder && subtotal < coupon.minOrder) {
        setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
      } else {
        setCouponError('Invalid coupon code');
      }
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some delicious items to get started!</p>
            <Link
              to="/menu"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Browse Menu
            </Link>
          </div>
          <div className="mt-16">
            <Recommendations title="Popular Dishes" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map(item => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 border border-gray-700"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-gray-700 rounded-lg flex items-center justify-center text-4xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  <p className="text-yellow-500 font-bold mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-3 bg-gray-700 rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-yellow-500 hover:text-yellow-400 p-1"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-yellow-500 hover:text-yellow-400 p-1"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-white font-bold">₹{item.price * item.quantity}</div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-400 p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-24">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">Apply Coupon</label>
                {state.coupon ? (
                  <div className="bg-green-500/10 border border-green-500 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-mono font-bold">{state.coupon.code}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-4 py-2 rounded-lg"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
                  </>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Taxes (5%)</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between text-yellow-500 text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <Recommendations
            title="You Might Also Like"
            excludeIds={state.items.map(item => item.id)}
          />
        </div>
      </div>
    </div>
  );
}
