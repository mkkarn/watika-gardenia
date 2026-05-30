// src/pages/CheckoutPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Smartphone, Banknote, ChevronRight, Lock, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import toast from "react-hot-toast";

const STEPS = ["Delivery", "Payment", "Review"];

// ── Delivery Form ─────────────────────────────────────────────────────────────
function DeliveryStep({ data, setData, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.phone.match(/^\d{10}$/)) e.phone = "Enter valid 10-digit number";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter valid email";
    if (!data.address.trim()) e.address = "Address is required";
    if (!data.city.trim()) e.city = "City is required";
    if (!data.pincode.match(/^\d{6}$/)) e.pincode = "Enter valid 6-digit pincode";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onNext();
  };

  const field = (key, label, placeholder, type = "text") => (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={data[key]}
        onChange={(e) => { setData((d) => ({ ...d, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: null })); }}
        className="input"
        style={{ borderColor: errors[key] ? "var(--red)" : undefined }}
      />
      {errors[key] && <p style={{ fontSize: "0.75rem", color: "var(--red)", marginTop: "4px" }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <MapPin size={20} color="var(--gold)" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>Delivery Details</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ gridColumn: "1 / -1" }}>{field("name", "Full Name", "John Doe")}</div>
        {field("phone", "Phone Number", "9876543210")}
        {field("email", "Email Address", "you@email.com", "email")}
        <div style={{ gridColumn: "1 / -1" }}>{field("address", "Street Address", "Building, Street, Area")}</div>
        {field("city", "City", "Bengaluru")}
        {field("pincode", "Pincode", "560001")}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="label">Delivery Instructions (Optional)</label>
          <textarea
            placeholder="E.g., Ring the bell twice, Leave at door..."
            value={data.instructions}
            onChange={(e) => setData((d) => ({ ...d, instructions: e.target.value }))}
            className="input"
            style={{ height: 80, resize: "none" }}
          />
        </div>
      </div>

      <div style={{
        background: "rgba(76,175,125,0.08)",
        border: "1px solid rgba(76,175,125,0.2)",
        borderRadius: "var(--radius)",
        padding: "12px 16px",
        marginTop: "16px",
        display: "flex",
        gap: "8px",
        alignItems: "flex-start",
      }}>
        <CheckCircle size={14} color="var(--green)" style={{ marginTop: 2 }} />
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          Your address is only used for delivery purposes and is kept secure.
        </p>
      </div>

      <button className="btn btn-primary" onClick={handleNext} style={{ marginTop: "28px", padding: "14px 32px" }}>
        Continue to Payment <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ── Payment Step ─────────────────────────────────────────────────────────────
function PaymentStep({ method, setMethod, cardData, setCardData, onNext, onBack }) {
  const methods = [
    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
    { id: "upi", label: "UPI / GPay / PhonePe", icon: Smartphone },
    { id: "cod", label: "Cash on Delivery", icon: Banknote },
  ];

  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const e = {};
    if (method === "card") {
      if (!cardData.number.replace(/\s/g, "").match(/^\d{16}$/)) e.number = "Enter valid 16-digit card number";
      if (!cardData.name.trim()) e.name = "Name is required";
      if (!cardData.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format: MM/YY";
      if (!cardData.cvv.match(/^\d{3,4}$/)) e.cvv = "Enter valid CVV";
    } else if (method === "upi") {
      if (!upiId.includes("@")) e.upi = "Enter valid UPI ID (e.g., name@upi)";
    }
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onNext();
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <CreditCard size={20} color="var(--gold)" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>Payment Method</h2>
      </div>

      {/* Method selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {methods.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMethod(id)}
            style={{
              background: method === id ? "rgba(201,168,76,0.1)" : "var(--bg-elevated)",
              border: `1px solid ${method === id ? "var(--gold)" : "var(--border)"}`,
              borderRadius: "var(--radius)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
            }}
          >
            <div style={{
              width: 20, height: 20,
              borderRadius: "50%",
              border: `2px solid ${method === id ? "var(--gold)" : "var(--border-strong)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {method === id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)" }} />}
            </div>
            <Icon size={18} color={method === id ? "var(--gold)" : "var(--text-secondary)"} />
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: method === id ? "var(--gold)" : "var(--text-primary)" }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Card fields */}
      {method === "card" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Card Number</label>
            <input
              className="input"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) => setCardData((d) => ({ ...d, number: formatCard(e.target.value) }))}
              maxLength={19}
              style={{ borderColor: errors.number ? "var(--red)" : undefined, letterSpacing: "0.1em" }}
            />
            {errors.number && <p style={{ fontSize: "0.75rem", color: "var(--red)", marginTop: 4 }}>{errors.number}</p>}
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="label">Name on Card</label>
            <input
              className="input"
              placeholder="John Doe"
              value={cardData.name}
              onChange={(e) => setCardData((d) => ({ ...d, name: e.target.value }))}
              style={{ borderColor: errors.name ? "var(--red)" : undefined }}
            />
            {errors.name && <p style={{ fontSize: "0.75rem", color: "var(--red)", marginTop: 4 }}>{errors.name}</p>}
          </div>
          <div>
            <label className="label">Expiry Date</label>
            <input
              className="input"
              placeholder="MM/YY"
              value={cardData.expiry}
              maxLength={5}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, "");
                if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                setCardData((d) => ({ ...d, expiry: v }));
              }}
              style={{ borderColor: errors.expiry ? "var(--red)" : undefined }}
            />
            {errors.expiry && <p style={{ fontSize: "0.75rem", color: "var(--red)", marginTop: 4 }}>{errors.expiry}</p>}
          </div>
          <div>
            <label className="label">CVV</label>
            <input
              className="input"
              placeholder="•••"
              type="password"
              maxLength={4}
              value={cardData.cvv}
              onChange={(e) => setCardData((d) => ({ ...d, cvv: e.target.value.replace(/\D/g, "") }))}
              style={{ borderColor: errors.cvv ? "var(--red)" : undefined }}
            />
            {errors.cvv && <p style={{ fontSize: "0.75rem", color: "var(--red)", marginTop: 4 }}>{errors.cvv}</p>}
          </div>
        </div>
      )}

      {/* UPI */}
      {method === "upi" && (
        <div style={{ marginBottom: "16px" }}>
          <label className="label">UPI ID</label>
          <input
            className="input"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{ borderColor: errors.upi ? "var(--red)" : undefined }}
          />
          {errors.upi && <p style={{ fontSize: "0.75rem", color: "var(--red)", marginTop: 4 }}>{errors.upi}</p>}
        </div>
      )}

      {/* COD note */}
      {method === "cod" && (
        <div style={{
          background: "rgba(240,168,76,0.1)",
          border: "1px solid rgba(240,168,76,0.3)",
          borderRadius: "var(--radius)",
          padding: "14px 16px",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          marginBottom: "16px",
          lineHeight: 1.6,
        }}>
          💵 Please have the exact amount ready. Our delivery partner carries limited change.
        </div>
      )}

      {/* Security badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <Lock size={12} color="var(--green)" />
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>256-bit SSL encryption • Secure checkout</span>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ padding: "14px 24px" }}>← Back</button>
        <button className="btn btn-primary" onClick={handleNext} style={{ padding: "14px 32px" }}>
          Review Order <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Review Step ───────────────────────────────────────────────────────────────
function ReviewStep({ delivery, paymentMethod, onBack, onPlace, placing }) {
  const { items, subtotal, deliveryFee, taxes, discount, total, coupon } = useCart();

  const methodLabel = { card: "Credit/Debit Card", upi: "UPI Payment", cod: "Cash on Delivery" };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: "28px" }}>Review Your Order</h2>

      {/* Delivery summary */}
      <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius)", padding: "16px 20px", marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>Delivery To</span>
        </div>
        <p style={{ fontWeight: 600 }}>{delivery.name}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {delivery.address}, {delivery.city} - {delivery.pincode}
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{delivery.phone} • {delivery.email}</p>
      </div>

      {/* Payment summary */}
      <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius)", padding: "14px 20px", marginBottom: "24px" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>Payment</span>
        <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>{methodLabel[paymentMethod]}</p>
      </div>

      {/* Items */}
      <div style={{ marginBottom: "24px" }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: "0.875rem" }}>{item.name} × {item.quantity}</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>₹{item.price * item.quantity}</span>
          </div>
        ))}
        {coupon && (
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", color: "var(--green)" }}>
            <span style={{ fontSize: "0.875rem" }}>Coupon ({coupon})</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>-₹{discount}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.82rem" }}>
          <span>Delivery + GST</span>
          <span>₹{deliveryFee + taxes}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem" }}>Total</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gold)" }}>₹{total}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ padding: "14px 24px" }}>← Back</button>
        <button
          className="btn btn-primary"
          onClick={onPlace}
          disabled={placing}
          style={{ padding: "14px 32px", flex: 1, justifyContent: "center", fontSize: "1rem" }}
        >
          {placing ? "Placing Order..." : "🎉 Place Order"}
        </button>
      </div>
    </div>
  );
}

// ── Main Checkout ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [delivery, setDelivery] = useState({
    name: "", phone: "", email: "", address: "", city: "Bengaluru", pincode: "", instructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const { items, total, subtotal, deliveryFee, taxes, discount, coupon, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate("/menu");
    return null;
  }

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder({
        items,
        delivery,
        paymentMethod,
        subtotal,
        deliveryFee,
        taxes,
        discount,
        coupon,
        total,
      });
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-confirmation", { state: { order } });
    }, 2000);
  };

  const progressWidth = ((step + 1) / STEPS.length) * 100;

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <div className="container" style={{ paddingTop: "48px", paddingBottom: "80px", maxWidth: 800 }}>
        {/* Progress */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: 28, height: 28,
                  borderRadius: "50%",
                  background: i <= step ? "var(--gold)" : "var(--bg-elevated)",
                  border: `2px solid ${i <= step ? "var(--gold)" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: i <= step ? "var(--bg)" : "var(--text-muted)",
                  transition: "all 0.3s",
                }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: "0.82rem",
                  fontWeight: i === step ? 700 : 400,
                  color: i === step ? "var(--gold)" : "var(--text-muted)",
                }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 3, background: "var(--bg-elevated)", borderRadius: "100px" }}>
            <div style={{
              height: "100%",
              width: `${progressWidth}%`,
              background: "var(--gold)",
              borderRadius: "100px",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Step Content */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "40px",
        }}>
          {step === 0 && <DeliveryStep data={delivery} setData={setDelivery} onNext={() => setStep(1)} />}
          {step === 1 && (
            <PaymentStep
              method={paymentMethod}
              setMethod={setPaymentMethod}
              cardData={cardData}
              setCardData={setCardData}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <ReviewStep
              delivery={delivery}
              paymentMethod={paymentMethod}
              onBack={() => setStep(1)}
              onPlace={handlePlaceOrder}
              placing={placing}
            />
          )}
        </div>
      </div>
    </div>
  );
}
