// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, ChefHat, Clock, MapPin } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/orders", label: "My Orders" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: "var(--nav-height)",
        background: scrolled ? "rgba(13,13,11,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 36, height: 36,
              background: "var(--gold)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChefHat size={18} color="#0d0d0b" />
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--cream)",
                lineHeight: 1.1,
              }}>Watika</div>
              <div style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                lineHeight: 1,
              }}>Gardenia</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: location.pathname === link.to ? "var(--gold)" : "var(--text-secondary)",
                  transition: "color 0.2s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => e.target.style.color = "var(--cream)"}
                onMouseLeave={(e) => e.target.style.color = location.pathname === link.to ? "var(--gold)" : "var(--text-secondary)"}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Info badges */}
            <div style={{ display: "flex", gap: "16px", marginRight: "8px" }} className="info-badges">
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                <Clock size={12} />
                <span>30-45 min</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                <MapPin size={12} />
                <span>Bengaluru</span>
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              style={{
                position: "relative",
                background: itemCount > 0 ? "var(--gold)" : "var(--bg-elevated)",
                border: "1px solid " + (itemCount > 0 ? "var(--gold)" : "var(--border)"),
                borderRadius: "var(--radius)",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: itemCount > 0 ? "var(--bg)" : "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              <ShoppingCart size={16} />
              {itemCount > 0 ? (
                <span>{itemCount} item{itemCount > 1 ? "s" : ""}</span>
              ) : (
                <span>Cart</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "4px",
                display: "none",
              }}
              className="mobile-toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "var(--nav-height)",
          left: 0, right: 0,
          background: "rgba(13,13,11,0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          zIndex: 999,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "1.1rem",
                fontWeight: 500,
                color: location.pathname === link.to ? "var(--gold)" : "var(--text-secondary)",
                padding: "8px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .info-badges { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
