// src/pages/OrderConfirmationPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, Clock, Package, Bike, Home, ArrowRight } from "lucide-react";

const TRACKING_STAGES = [
  { label: "Order Confirmed", icon: CheckCircle, detail: "We've received your order", delay: 0 },
  { label: "Being Prepared", icon: Package, detail: "Chef is cooking your meal", delay: 8000 },
  { label: "Out for Delivery", icon: Bike, detail: "On the way to you", delay: 16000 },
  { label: "Delivered", icon: Home, detail: "Enjoy your meal!", delay: 24000 },
];

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const [activeStage, setActiveStage] = useState(0);
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimatedIn(true), 100);
  }, []);

  useEffect(() => {
    if (!order) return;
    TRACKING_STAGES.forEach((stage, i) => {
      if (i === 0) return;
      setTimeout(() => setActiveStage(i), stage.delay);
    });
  }, [order]);

  if (!order) {
    return (
      <div style={{ paddingTop: "var(--nav-height)", textAlign: "center", padding: "120px 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "16px" }}>No order found</h2>
        <Link to="/menu" className="btn btn-primary">Go to Menu</Link>
      </div>
    );
  }

  const eta = new Date(order.estimatedDelivery);
  const etaStr = eta.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px", maxWidth: 700 }}>
        {/* Success header */}
        <div style={{
          textAlign: "center",
          marginBottom: "48px",
          opacity: animatedIn ? 1 : 0,
          transform: animatedIn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{
            width: 80, height: 80,
            background: "rgba(76,175,125,0.1)",
            border: "2px solid var(--green)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            animation: "pulse 2s ease-in-out 3",
          }}>
            <CheckCircle size={36} color="var(--green)" />
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "8px",
          }}>
            Order Confirmed! 🎉
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Your order <strong style={{ color: "var(--gold)" }}>{order.id}</strong> is placed successfully.
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginTop: "12px",
          }}>
            <Clock size={14} color="var(--gold)" />
            <span style={{ fontSize: "0.875rem", color: "var(--gold)", fontWeight: 600 }}>
              Estimated delivery by {etaStr}
            </span>
          </div>
        </div>

        {/* Live Tracking */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "32px",
          marginBottom: "24px",
        }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: "28px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            Live Order Tracking
          </h2>

          <div style={{ position: "relative" }}>
            {/* Progress line */}
            <div style={{
              position: "absolute",
              left: 19,
              top: 24,
              bottom: 24,
              width: 2,
              background: "var(--border)",
              zIndex: 0,
            }}>
              <div style={{
                height: `${(activeStage / (TRACKING_STAGES.length - 1)) * 100}%`,
                background: "var(--gold)",
                transition: "height 1s ease",
                borderRadius: "2px",
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {TRACKING_STAGES.map((stage, i) => {
                const done = i <= activeStage;
                const active = i === activeStage;
                const Icon = stage.icon;
                return (
                  <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                    <div style={{
                      width: 40, height: 40,
                      borderRadius: "50%",
                      background: done ? (active ? "var(--gold)" : "rgba(201,168,76,0.2)") : "var(--bg-elevated)",
                      border: `2px solid ${done ? "var(--gold)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.5s ease",
                      boxShadow: active ? "0 0 20px rgba(201,168,76,0.4)" : "none",
                    }}>
                      <Icon size={18} color={done ? (active ? "var(--bg)" : "var(--gold)") : "var(--text-muted)"} />
                    </div>
                    <div style={{ paddingTop: "8px" }}>
                      <p style={{
                        fontWeight: active ? 700 : 500,
                        color: done ? "var(--text-primary)" : "var(--text-muted)",
                        fontSize: "0.95rem",
                        transition: "color 0.3s",
                      }}>{stage.label}</p>
                      {active && (
                        <p style={{ fontSize: "0.8rem", color: "var(--gold)", marginTop: "2px" }}>
                          {stage.detail}
                        </p>
                      )}
                    </div>
                    {active && (
                      <div style={{
                        marginLeft: "auto",
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: "100px",
                        padding: "3px 10px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--gold)",
                        flexShrink: 0,
                      }}>CURRENT</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          marginBottom: "24px",
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "20px" }}>Order Details</h3>
          {order.items.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "0.875rem" }}>{item.name} × {item.quantity}</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gold)" }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Total Paid</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--gold)" }}>₹{order.total}</span>
          </div>
        </div>

        {/* Delivery address */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "20px 28px",
          marginBottom: "32px",
        }}>
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>Delivering To</h3>
          <p style={{ fontWeight: 600 }}>{order.delivery.name}</p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {order.delivery.address}, {order.delivery.city} - {order.delivery.pincode}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link to="/menu" className="btn btn-primary" style={{ padding: "14px 28px" }}>
            Order Again <ArrowRight size={16} />
          </Link>
          <Link to="/orders" className="btn btn-outline" style={{ padding: "14px 28px" }}>
            View All Orders
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}
