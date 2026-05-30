// src/context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload };
    case "REMOVE_COUPON":
      return { ...state, coupon: null };
    default:
      return state;
  }
};

const COUPONS = {
  WATIKA10: { discount: 10, type: "percent", description: "10% off your order" },
  WELCOME20: { discount: 20, type: "percent", description: "20% off for new customers" },
  FLAT100: { discount: 100, type: "flat", description: "₹100 off on orders above ₹500" },
  GARDENIA: { discount: 15, type: "percent", description: "15% off — Gardenia special" },
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: JSON.parse(localStorage.getItem("wg_cart") || "[]"),
    coupon: null,
  });

  useEffect(() => {
    localStorage.setItem("wg_cart", JSON.stringify(state.items));
  }, [state.items]);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? (subtotal >= 500 ? 0 : 49) : 0;
  const taxes = Math.round(subtotal * 0.05);

  let discount = 0;
  if (state.coupon) {
    const coupon = COUPONS[state.coupon];
    if (coupon) {
      if (coupon.type === "percent") discount = Math.round(subtotal * coupon.discount / 100);
      else if (coupon.type === "flat" && subtotal >= 500) discount = coupon.discount;
    }
  }

  const total = subtotal + deliveryFee + taxes - discount;
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const applyCoupon = (code) => {
    const upper = code.toUpperCase();
    if (COUPONS[upper]) {
      dispatch({ type: "APPLY_COUPON", payload: upper });
      return { success: true, message: COUPONS[upper].description };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        coupon: state.coupon,
        subtotal,
        deliveryFee,
        taxes,
        discount,
        total,
        itemCount,
        addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
        updateQuantity: (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        applyCoupon,
        removeCoupon: () => dispatch({ type: "REMOVE_COUPON" }),
        COUPONS,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
