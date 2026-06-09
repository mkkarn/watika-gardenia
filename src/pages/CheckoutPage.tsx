import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, Lock, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder, DeliveryInfo, PaymentInfo } from '../context/OrderContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, clearCart, getCartTotal, getDiscount, getFinalTotal } = useCart();
  const { placeOrder } = useOrder();

  const [step, setStep] = useState<'delivery' | 'payment' | 'review'>('delivery');
  
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    method: 'card',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const validateDelivery = () => {
    const newErrors: Record<string, string> = {};
    if (!delivery.name.trim()) newErrors.name = 'Name is required';
    if (!delivery.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter valid 10-digit phone';
    if (!delivery.address.trim()) newErrors.address = 'Address is required';
    if (!delivery.city.trim()) newErrors.city = 'City is required';
    if (!delivery.pincode.match(/^\d{6}$/)) newErrors.pincode = 'Enter valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    if (payment.method === 'card') {
      if (!payment.cardNumber?.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Enter valid 16-digit card number';
      }
      if (!payment.cardExpiry?.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.cardExpiry = 'Enter valid expiry (MM/YY)';
      }
      if (!payment.cardCVV?.match(/^\d{3}$/)) {
        newErrors.cardCVV = 'Enter valid 3-digit CVV';
      }
    } else if (payment.method === 'upi') {
      if (!payment.upiId?.match(/^[\w.-]+@[\w.-]+$/)) {
        newErrors.upiId = 'Enter valid UPI ID';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 'delivery') {
      if (validateDelivery()) {
        setStep('payment');
      }
    } else if (step === 'payment') {
      if (validatePayment()) {
        setStep('review');
      }
    }
  };

  const handlePlaceOrder = () => {
    const orderId = placeOrder({
      items: state.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      delivery,
      payment,
      subtotal: getCartTotal(),
      discount: getDiscount(),
      taxes: (getCartTotal() - getDiscount()) * 0.05,
      total: getFinalTotal(),
      couponCode: state.coupon?.code,
    });
    clearCart();
    navigate(`/order/${orderId}`);
  };

  const subtotal = getCartTotal();
  const discount = getDiscount();
  const taxes = (subtotal - discount) * 0.05;
  const total = getFinalTotal();

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => {
              if (step === 'payment') setStep('delivery');
              else if (step === 'review') setStep('payment');
              else navigate('/cart');
            }}
            className="text-gray-400 hover:text-yellow-500"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-4xl font-bold text-yellow-500">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          {['delivery', 'payment', 'review'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s
                    ? 'bg-yellow-500 text-gray-900'
                    : i < ['delivery', 'payment', 'review'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && <div className="w-16 h-1 bg-gray-700 mx-2"></div>}
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          {/* Delivery Info */}
          {step === 'delivery' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={delivery.name}
                    onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={delivery.phone}
                    onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Delivery Address *</label>
                <textarea
                  value={delivery.address}
                  onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">City *</label>
                  <input
                    type="text"
                    value={delivery.city}
                    onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Pincode *</label>
                  <input
                    type="text"
                    value={delivery.pincode}
                    onChange={(e) => setDelivery({ ...delivery, pincode: e.target.value })}
                    placeholder="6-digit pincode"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { method: 'card', icon: CreditCard, label: 'Card' },
                  { method: 'upi', icon: Smartphone, label: 'UPI' },
                  { method: 'cod', icon: Banknote, label: 'COD' },
                ].map(({ method, icon: Icon, label }) => (
                  <button
                    key={method}
                    onClick={() => setPayment({ method: method as any })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      payment.method === method
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-white font-medium">{label}</p>
                  </button>
                ))}
              </div>

              {payment.method === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={payment.cardNumber || ''}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={payment.cardExpiry || ''}
                        onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                        placeholder="12/25"
                        maxLength={5}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">CVV</label>
                      <input
                        type="text"
                        value={payment.cardCVV || ''}
                        onChange={(e) => setPayment({ ...payment, cardCVV: e.target.value })}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                      {errors.cardCVV && <p className="text-red-500 text-sm mt-1">{errors.cardCVV}</p>}
                    </div>
                  </div>
                </div>
              )}

              {payment.method === 'upi' && (
                <div>
                  <label className="block text-gray-300 mb-2">UPI ID</label>
                  <input
                    type="text"
                    value={payment.upiId || ''}
                    onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                  {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                </div>
              )}

              {payment.method === 'cod' && (
                <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4">
                  <p className="text-blue-400">
                    Please keep exact change ready. Our delivery partner will collect ₹{total.toFixed(2)} at your doorstep.
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          )}

          {/* Review */}
          {step === 'review' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Review Order</h2>
              
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">Delivery To:</h3>
                <div className="bg-gray-700 rounded-lg p-4 text-gray-300">
                  <p className="font-semibold text-white">{delivery.name}</p>
                  <p>{delivery.phone}</p>
                  <p>{delivery.address}</p>
                  <p>{delivery.city}, {delivery.pincode}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">Order Items:</h3>
                <div className="space-y-2">
                  {state.items.map(item => (
                    <div key={item.id} className="flex justify-between bg-gray-700 rounded-lg p-3 text-gray-300">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="text-white font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount {state.coupon && `(${state.coupon.code})`}</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Taxes</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-2 flex justify-between text-yellow-500 text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            {step !== 'review' && (
              <button
                onClick={handleContinue}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all"
              >
                Continue
              </button>
            )}
            {step === 'review' && (
              <button
                onClick={handlePlaceOrder}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
