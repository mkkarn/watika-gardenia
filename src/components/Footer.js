// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { ChefHat, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      padding: "60px 0 32px",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "48px",
          marginBottom: "48px",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: 40, height: 40,
                background: "var(--gold)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ChefHat size={20} color="#0d0d0b" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700 }}>Watika</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Gardenia</div>
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
              Where culinary artistry meets warm hospitality. Every dish tells a story, every meal creates a memory.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36,
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-muted)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: "20px", color: "var(--gold)" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Our Menu" },
                { to: "/cart", label: "Cart" },
                { to: "/orders", label: "Track Order" },
              ].map((link) => (
                <Link key={link.to} to={link.to} style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.color = "var(--gold)"}
                onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: "20px", color: "var(--gold)" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { Icon: MapPin, text: "12, Gardenia Lane, Indiranagar, Bengaluru — 560038" },
                { Icon: Phone, text: "+91 98765 43210" },
                { Icon: Mail, text: "hello@watikagardenia.com" },
                { Icon: Clock, text: "Mon–Sun: 11:00 AM – 11:00 PM" },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Icon size={14} color="var(--gold)" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: "8px", color: "var(--gold)" }}>Stay in the Know</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
              Get exclusive deals, new dishes, and seasonal offers delivered to your inbox.
            </p>
            <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="input"
                style={{ fontSize: "0.85rem" }}
              />
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            © 2025 Watika Gardenia. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.78rem", color: "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.target.style.color = "var(--gold)"}
                onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
