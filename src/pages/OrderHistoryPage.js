// src/pages/OrderHistoryPage.js
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { useOrders } from "../context/OrderContext";

const STATUS_COLORS = {
  confirmed: { bg: "rgba(76,175,125,0.1)", border: "rgba(76,175,125,0.3)", text: "var(--green)" },
  preparing: { bg: "rgba(240,168,76,0.1)", border: "rgba(240,168,76,0.3)", text: "var(--amber)" },
  delivered: { bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.3)", text: "var(--gold)" },
};

export default function OrderHistoryPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div style={{ paddingTop: "var(--nav-height)" }}>
        <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>📦</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "12px" }}>No orders yet</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
            Your order history will appear here after your first purchase.
          </p>
          <Link to="/menu" className="btn btn-primary" style={{ padding: "14px 32px" }}>
            Start Ordering <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <div className="container" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, marginBottom: "8px" }}>My Orders</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>
          {orders.length} order{orders.length > 1 ? "s" : ""} placed
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => {
            const statusColor = STATUS_COLORS[order.status] || STATUS_COLORS.confirmed;
            const placedAt = new Date(order.placedAt);

            return (
              <div key={order.id} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 28px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-strong)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <Package size={16} color="var(--gold)" />
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem" }}>
                        {order.id}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      <Clock size={12} />
                      <span>{placedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} at {placedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                  <div style={{
                    background: statusColor.bg,
                    border: `1px solid ${statusColor.border}`,
                    color: statusColor.text,
                    borderRadius: "100px",
                    padding: "5px 14px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "capitalize",
                  }}>
                    ● {order.status}
                  </div>
                </div>

                {/* Items */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                    {order.items.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: 36, height: 36, borderRadius: "6px", objectFit: "cover" }}
                          onError={(e) => e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&q=60"}
                        />
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                          {item.name} ×{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total: </span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--gold)" }}>₹{order.total}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "8px" }}>
                      via {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "upi" ? "UPI" : "Card"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link to="/menu" className="btn btn-outline" style={{ padding: "8px 18px", fontSize: "0.82rem" }}>
                      Reorder
                    </Link>
                    <Link
                      to="/order-confirmation"
                      state={{ order }}
                      className="btn btn-ghost"
                      style={{ padding: "8px 18px", fontSize: "0.82rem" }}
                    >
                      Track <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
