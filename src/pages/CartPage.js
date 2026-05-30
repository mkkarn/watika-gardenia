// src/pages/CartPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import Recommendations from "../components/Recommendations";
import toast from "react-hot-toast";

export default function CartPage() {
  const {
    items, updateQuantity, removeItem,
    subtotal, deliveryFee, taxes, discount, total,
    coupon, applyCoupon, removeCoupon, COUPONS,
  } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = () => {
    setCouponLoading(true);
    setTimeout(() => {
      const result = applyCoupon(couponInput);
      if (result.success) {
        toast.success(`Coupon applied: ${result.message}`);
        setCouponInput("");
      } else {
        toast.error(result.message);
      }
      setCouponLoading(false);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: "var(--nav-height)" }}>
        <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛒</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "12px" }}>Your cart is empty</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
            Looks like you haven't added anything yet. Let's fix that!
          </p>
          <Link to="/menu" className="btn btn-primary" style={{ padding: "14px 32px" }}>
            Browse Menu <ArrowRight size={16} />
          </Link>
          <div className="container" style={{ padding: 0, marginTop: "64px" }}>
            <Recommendations title="Popular Picks" excludeIds={[]} limit={4} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <div className="container" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, marginBottom: "8px" }}>
          Your Cart
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>
          {items.reduce((s, i) => s + i.quantity, 0)} item{items.length > 1 ? "s" : ""} ready to order
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }}>
          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {items.map((item) => (
              <div key={item.id} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 80, height: 80, borderRadius: "var(--radius)", objectFit: "cover", flexShrink: 0 }}
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=70"}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, marginBottom: "4px" }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                    ₹{item.price} each
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Qty control */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0",
                      border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden",
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: "none", border: "none", padding: "8px 12px", cursor: "pointer", color: "var(--text-secondary)", display: "flex" }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: "0 8px", fontWeight: 700, minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: "none", border: "none", padding: "8px 12px", cursor: "pointer", color: "var(--text-secondary)", display: "flex" }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => { removeItem(item.id); toast("Item removed", { icon: "🗑️" }); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--red)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)" }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon hints */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px dashed var(--border-strong)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Tag size={14} color="var(--gold)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gold)" }}>Available Coupons</span>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {Object.entries(COUPONS).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => setCouponInput(code)}
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      border: "1px dashed rgba(201,168,76,0.4)",
                      borderRadius: "6px",
                      padding: "4px 12px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--gold)",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      letterSpacing: "0.05em",
                    }}
                    title={info.description}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "28px",
            position: "sticky",
            top: "calc(var(--nav-height) + 24px)",
          }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "24px" }}>Order Summary</h2>

            {/* Coupon input */}
            {!coupon ? (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Tag size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      className="input"
                      style={{ paddingLeft: 36, fontSize: "0.85rem", letterSpacing: "0.08em" }}
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponInput || couponLoading}
                    className="btn btn-outline"
                    style={{ padding: "10px 16px", fontSize: "0.82rem" }}
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(76,175,125,0.1)",
                border: "1px solid rgba(76,175,125,0.3)",
                borderRadius: "var(--radius)",
                padding: "10px 14px",
                marginBottom: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Tag size={13} color="var(--green)" />
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--green)", letterSpacing: "0.08em" }}>{coupon}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>applied</span>
                </div>
                <button onClick={removeCoupon} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {[
                { label: "Subtotal", value: `₹${subtotal}` },
                { label: "Delivery", value: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`, highlight: deliveryFee === 0 },
                { label: "GST (5%)", value: `₹${taxes}` },
                ...(discount > 0 ? [{ label: "Discount", value: `-₹${discount}`, highlight: true, color: "var(--green)" }] : []),
              ].map(({ label, value, highlight, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{label}</span>
                  <span style={{
                    fontSize: "0.875rem",
                    fontWeight: highlight ? 700 : 400,
                    color: color || (highlight ? "var(--green)" : "var(--text-primary)"),
                  }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)" }}>₹{total}</span>
              </div>
              {deliveryFee > 0 && (
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "6px" }}>
                  Add ₹{500 - subtotal} more for free delivery
                </p>
              )}
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.95rem" }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <Link to="/menu" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "12px",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              transition: "color 0.2s",
            }}>
              <ShoppingBag size={13} /> Add more items
            </Link>
          </div>
        </div>

        {/* Recommendations */}
        <Recommendations
          title="Complete Your Meal"
          excludeIds={items.map((i) => i.id)}
          limit={4}
        />
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
