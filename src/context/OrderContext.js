// src/context/OrderContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("wg_orders") || "[]"));
  const [currentOrder, setCurrentOrder] = useState(null);

  const placeOrder = useCallback((orderData) => {
    const order = {
      id: `WG-${Date.now()}`,
      ...orderData,
      status: "confirmed",
      placedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      timeline: [
        { status: "Order Placed", time: new Date().toISOString(), done: true },
        { status: "Being Prepared", time: null, done: false },
        { status: "Out for Delivery", time: null, done: false },
        { status: "Delivered", time: null, done: false },
      ],
    };
    const updated = [order, ...orders];
    setOrders(updated);
    setCurrentOrder(order);
    localStorage.setItem("wg_orders", JSON.stringify(updated));
    return order;
  }, [orders]);

  const getOrder = useCallback((id) => orders.find((o) => o.id === id), [orders]);

  return (
    <OrderContext.Provider value={{ orders, currentOrder, placeOrder, getOrder, setCurrentOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
