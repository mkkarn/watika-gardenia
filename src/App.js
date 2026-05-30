// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import "./index.css";

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f1f1a",
                color: "#f5f0e8",
                border: "1px solid rgba(201,168,76,0.3)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
              },
              success: { iconTheme: { primary: "#c9a84c", secondary: "#0d0d0b" } },
            }}
          />
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}
