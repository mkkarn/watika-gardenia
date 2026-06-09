import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, Clock } from 'lucide-react';
import { useOrder, OrderStatus } from '../context/OrderContext';

const statusSteps: OrderStatus[] = ['Confirmed', 'Being Prepared', 'Out for Delivery', 'Delivered'];

const statusIcons = {
  'Confirmed': CheckCircle,
  'Being Prepared': Package,
  'Out for Delivery': Truck,
  'Delivered': Home,
};

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder, updateOrderStatus } = useOrder();
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const order = getOrder(orderId || '');

  useEffect(() => {
    if (!order) return;

    // Simulate order status progression
    const intervals = [5000, 10000, 15000]; // Time between status changes
    const timers: NodeJS.Timeout[] = [];

    intervals.forEach((delay, index) => {
      const timer = setTimeout(() => {
        if (index + 1 < statusSteps.length) {
          const newStatus = statusSteps[index + 1];
          updateOrderStatus(order.id, newStatus);
          setCurrentStatusIndex(index + 1);
        }
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [order?.id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Order not found</h2>
          <Link to="/" className="text-yellow-500 hover:text-yellow-400">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const timeRemaining = Math.max(0, Math.ceil((order.estimatedDelivery - Date.now()) / 60000));

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white text-center mb-8">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-lg">Order ID: {order.id}</p>
        </div>

        {/* Live Tracker */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-yellow-500">Live Order Tracking</h2>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="h-5 w-5" />
              <span>ETA: {timeRemaining} mins</span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-700"></div>
            <div
              className="absolute left-8 top-0 w-1 bg-yellow-500 transition-all duration-1000 ease-out"
              style={{
                height: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
              }}
            ></div>

            <div className="space-y-8">
              {statusSteps.map((status, index) => {
                const Icon = statusIcons[status];
                const isActive = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={status} className="relative flex items-center space-x-4">
                    <div
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-yellow-500 scale-110 shadow-lg shadow-yellow-500/50'
                          : 'bg-gray-700'
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                    </div>
                    <div className={`flex-1 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                      <h3 className={`text-xl font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {status}
                      </h3>
                      {isCurrent && (
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-yellow-500 text-sm">In Progress...</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Delivery Address</h3>
            <div className="text-gray-300 space-y-1">
              <p className="font-semibold text-white">{order.delivery.name}</p>
              <p>{order.delivery.phone}</p>
              <p>{order.delivery.address}</p>
              <p>{order.delivery.city}, {order.delivery.pincode}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Order Summary</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{order.taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-600 pt-2 flex justify-between text-yellow-500 font-bold text-lg">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-8">
          <h3 className="text-xl font-bold text-yellow-500 mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-700 rounded-lg p-3">
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="text-yellow-500 font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/menu"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Order More
          </Link>
          <Link
            to="/orders"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
