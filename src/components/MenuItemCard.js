// src/components/MenuItemCard.js
import React, { useState } from "react";
import { Plus, Minus, Star, Clock, Flame } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function MenuItemCard({ item, compact = false }) {
  const { items, addItem, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);
  const cartItem = items.find((i) => i.id === item.id);
  const qty = cartItem?.quantity || 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, qty + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, qty - 1);
  };

  const isVeg = item.tags.includes("vegetarian") || item.tags.includes("vegan");

  return (
    <div className="card" style={{
      display: "flex",
      flexDirection: compact ? "row" : "column",
      cursor: "default",
      position: "relative",
    }}>
      {/* Discount badge */}
      {item.originalPrice && (
        <div style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
          background: "var(--red)",
          color: "white",
          fontSize: "0.65rem",
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: "100px",
          letterSpacing: "0.05em",
        }}>
          {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
        </div>
      )}

      {/* Bestseller badge */}
      {item.tags.includes("bestseller") && (
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          background: "var(--gold)",
          color: "var(--bg)",
          fontSize: "0.6rem",
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: "100px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          ⭐ Bestseller
        </div>
      )}

      {/* Image */}
      <div style={{
        width: compact ? 120 : "100%",
        height: compact ? "100%" : 200,
        minHeight: compact ? 120 : undefined,
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: compact ? "var(--radius-lg) 0 0 var(--radius-lg)" : "0",
      }}>
        <img
          src={imgError ? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70" : item.image}
          alt={item.name}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: compact ? "16px" : "20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        {/* Veg/non-veg indicator + name */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <div style={{
            width: 14,
            height: 14,
            border: `2px solid ${isVeg ? "var(--green)" : "var(--red)"}`,
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isVeg ? "var(--green)" : "var(--red)",
            }} />
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: compact ? "0.95rem" : "1.05rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}>{item.name}</h3>
        </div>

        {/* Rating + time */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Star size={12} fill="var(--gold)" color="var(--gold)" />
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gold)" }}>{item.rating}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({item.reviews})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.75rem" }}>
            <Clock size={11} />
            <span>{item.preparationTime} min</span>
          </div>
          {item.spiceLevel > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {[...Array(3)].map((_, i) => (
                <Flame
                  key={i}
                  size={11}
                  color={i < item.spiceLevel ? "var(--red)" : "var(--border-strong)"}
                  fill={i < item.spiceLevel ? "var(--red)" : "transparent"}
                />
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        {!compact && (
          <p style={{
            fontSize: "0.82rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>{item.description}</p>
        )}

        {/* Price + Add to cart */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: "4px",
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "var(--gold)",
            }}>₹{item.price}</span>
            {item.originalPrice && (
              <span style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textDecoration: "line-through",
                marginLeft: "6px",
              }}>₹{item.originalPrice}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={handleAdd}
              style={{
                background: "transparent",
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                borderRadius: "var(--radius)",
                padding: "6px 16px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold)";
                e.currentTarget.style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--gold)";
              }}
            >
              <Plus size={14} />
              Add
            </button>
          ) : (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              background: "var(--gold)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
            }}>
              <button
                onClick={handleDecrease}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  color: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{
                padding: "0 4px",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--bg)",
                minWidth: "20px",
                textAlign: "center",
              }}>{qty}</span>
              <button
                onClick={handleIncrease}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  color: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
