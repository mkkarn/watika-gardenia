import { Link } from 'react-router-dom';
import { Clock, Package } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function OrderHistoryPage() {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">No orders yet</h2>
          <p className="text-gray-400 mb-8">Start ordering your favorite dishes!</p>
          <Link
            to="/menu"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Order {order.id}</h3>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(order.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div
                    className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      order.status === 'Delivered'
                        ? 'bg-green-500/20 text-green-500'
                        : order.status === 'Out for Delivery'
                        ? 'bg-purple-500/20 text-purple-500'
                        : order.status === 'Being Prepared'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-blue-500/20 text-blue-500'
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Items</h4>
                    <div className="space-y-1">
                      {order.items.map(item => (
                        <p key={item.id} className="text-white text-sm">
                          {item.name} x {item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Delivery Address</h4>
                    <p className="text-white text-sm">{order.delivery.name}</p>
                    <p className="text-gray-400 text-sm">{order.delivery.address}</p>
                    <p className="text-gray-400 text-sm">
                      {order.delivery.city}, {order.delivery.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="text-2xl font-bold text-yellow-500">₹{order.total.toFixed(2)}</div>
                  <Link
                    to={`/order/${order.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
