// src/components/Recommendations.js
import React from "react";
import { Sparkles } from "lucide-react";
import MenuItemCard from "./MenuItemCard";
import { menuItems } from "../data/menuData";

export default function Recommendations({ title = "You May Also Like", excludeIds = [], limit = 4 }) {
  const recs = menuItems
    .filter((item) => !excludeIds.includes(item.id) && item.rating >= 4.6)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);

  if (recs.length === 0) return null;

  return (
    <section style={{ padding: "48px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Sparkles size={18} color="var(--gold)" />
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}>{title}</h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
      }}>
        {recs.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
