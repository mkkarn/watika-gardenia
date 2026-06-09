import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DeliveryInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface PaymentInfo {
  method: 'card' | 'upi' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
  upiId?: string;
}

export type OrderStatus = 'Confirmed' | 'Being Prepared' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  timestamp: number;
  estimatedDelivery: number;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status' | 'estimatedDelivery'>) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('wg_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('wg_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData: Omit<Order, 'id' | 'timestamp' | 'status' | 'estimatedDelivery'>): string => {
    const timestamp = Date.now();
    const id = `WG-${timestamp}`;
    const estimatedDelivery = timestamp + 45 * 60 * 1000; // 45 minutes

    const newOrder: Order = {
      ...orderData,
      id,
      timestamp,
      status: 'Confirmed',
      estimatedDelivery,
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    return id;
  };

  const getOrder = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status } : order))
    );
    if (currentOrder?.id === id) {
      setCurrentOrder({ ...currentOrder, status });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        placeOrder,
        getOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
