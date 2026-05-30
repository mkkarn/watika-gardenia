// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck, Clock, ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { getFeaturedItems } from "../data/menuData";
import MenuItemCard from "../components/MenuItemCard";
import Recommendations from "../components/Recommendations";

// ─── Ad Banner Rotator ──────────────────────────────────────────────────────
const ADS = [
  {
    id: 1,
    title: "Grand Opening Offer",
    subtitle: "Get 20% off your first order",
    code: "WELCOME20",
    bg: "linear-gradient(135deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)",
    accent: "#c9a84c",
    emoji: "🎉",
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "On all orders above ₹500",
    code: null,
    bg: "linear-gradient(135deg, #001a0e 0%, #003d22 50%, #001a0e 100%)",
    accent: "#4caf7d",
    emoji: "🚀",
  },
  {
    id: 3,
    title: "Weekend Special",
    subtitle: "Watika Thali at ₹559 — Full meal for one",
    code: "WATIKA10",
    bg: "linear-gradient(135deg, #0a0010 0%, #220033 50%, #0a0010 100%)",
    accent: "#b07cff",
    emoji: "🌟",
  },
];

function AdBanner() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % ADS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const ad = ADS[current];

  return (
    <div style={{
      background: ad.bg,
      border: `1px solid ${ad.accent}30`,
      borderRadius: "var(--radius-lg)",
      padding: "28px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      marginBottom: "64px",
      position: "relative",
      overflow: "hidden",
      transition: "background 0.6s ease",
    }}>
      {/* Decorative glow */}
      <div style={{
        position: "absolute",
        top: -60, right: -60,
        width: 200, height: 200,
        background: `${ad.accent}20`,
        borderRadius: "50%",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
        <div style={{ fontSize: "2.5rem" }}>{ad.emoji}</div>
        <div>
          <div style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: ad.accent,
            marginBottom: "4px",
            fontWeight: 600,
          }}>Limited Offer</div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--cream)",
            marginBottom: "4px",
          }}>{ad.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{ad.subtitle}</p>
          {ad.code && (
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "10px",
              background: `${ad.accent}20`,
              border: `1px dashed ${ad.accent}`,
              borderRadius: "6px",
              padding: "4px 12px",
            }}>
              <Gift size={12} color={ad.accent} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: ad.accent, letterSpacing: "0.1em" }}>
                {ad.code}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {ADS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: "100px",
              background: i === current ? ad.accent : `${ad.accent}40`,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }} />
          ))}
        </div>

        <button
          onClick={() => navigate("/menu")}
          style={{
            background: ad.accent,
            color: "#0d0d0b",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "10px 20px",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          Order Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: Star, value: "4.8★", label: "Average Rating" },
    { icon: Clock, value: "30 min", label: "Avg Delivery" },
    { icon: Truck, value: "Free", label: "Delivery above ₹500" },
    { icon: Shield, value: "100%", label: "Fresh Ingredients" },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1px",
      background: "var(--border)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      marginBottom: "64px",
    }}>
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} style={{
          background: "var(--bg-card)",
          padding: "20px",
          textAlign: "center",
        }}>
          <Icon size={18} color="var(--gold)" style={{ margin: "0 auto 8px" }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--cream)" }}>{value}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      paddingTop: "var(--nav-height)",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.3)",
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(13,13,11,0.9) 0%, rgba(13,13,11,0.4) 60%, rgba(13,13,11,0.8) 100%)",
      }} />

      {/* Floating orbs */}
      <div style={{
        position: "absolute",
        top: "20%", right: "10%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 8s ease-in-out infinite",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "24px",
          }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
              Now Accepting Orders
            </span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 2s infinite" }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: "24px",
            color: "var(--cream)",
          }}>
            A Garden of<br />
            <span style={{
              background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}>Flavours</span>
          </h1>

          <p style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "36px",
            maxWidth: 500,
          }}>
            From Kashmiri dum biryanis to truffle risottos — Watika Gardenia brings the world's finest cuisines to your table, crafted with love and served with pride.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => navigate("/menu")} style={{ padding: "14px 32px", fontSize: "1rem" }}>
              Explore Menu <ArrowRight size={18} />
            </button>
            <a href="#featured" className="btn btn-outline" style={{ padding: "14px 32px", fontSize: "1rem" }}>
              Today's Specials
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const featured = getFeaturedItems();

  return (
    <>
      <Hero />

      <div className="container" style={{ paddingTop: "80px" }}>
        <AdBanner />
        <StatsBar />

        {/* Featured */}
        <section id="featured">
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div className="divider" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
                Chef's Selection
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}>Featured Dishes</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 500 }}>
              Our most loved creations, hand-picked by the chef for an exceptional dining experience.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}>
            {featured.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Link to="/menu" className="btn btn-outline" style={{ padding: "12px 32px" }}>
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Recommendations */}
        <Recommendations
          title="Trending Right Now"
          excludeIds={featured.map((f) => f.id)}
          limit={4}
        />

        {/* Why us section */}
        <section style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "56px 48px",
          margin: "64px 0",
          textAlign: "center",
        }}>
          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>Our Promise</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}>Why Watika Gardenia?</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
          }}>
            {[
              { emoji: "🌿", title: "Farm Fresh", desc: "Ingredients sourced daily from local farms and trusted suppliers." },
              { emoji: "👨‍🍳", title: "Expert Chefs", desc: "Our team has 20+ years of combined culinary experience." },
              { emoji: "⚡", title: "Lightning Fast", desc: "30–45 minute delivery, fresh and hot, every single time." },
              { emoji: "💳", title: "Secure Payments", desc: "Bank-grade encryption on all transactions. 100% safe." },
            ].map(({ emoji, title, desc }) => (
              <div key={title}>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{emoji}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "var(--gold)" }}>{title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
