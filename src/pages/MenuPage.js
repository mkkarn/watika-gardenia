// src/pages/MenuPage.js
import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, menuItems } from "../data/menuData";
import MenuItemCard from "../components/MenuItemCard";
import Recommendations from "../components/Recommendations";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all"); // all | veg | nonveg
  const [sortBy, setSortBy] = useState("popular"); // popular | price-asc | price-desc | rating
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let items = [...menuItems];

    // Category
    if (activeCategory !== "all") {
      items = items.filter((i) => i.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.includes(q))
      );
    }

    // Diet
    if (dietFilter === "veg") {
      items = items.filter((i) => i.tags.includes("vegetarian") || i.tags.includes("vegan"));
    } else if (dietFilter === "nonveg") {
      items = items.filter((i) => !i.tags.includes("vegetarian") && !i.tags.includes("vegan"));
    }

    // Sort
    if (sortBy === "price-asc") items.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") items.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items.sort((a, b) => b.rating - a.rating);
    else items.sort((a, b) => b.reviews - a.reviews); // popular

    return items;
  }, [activeCategory, searchQuery, dietFilter, sortBy]);

  const hasFilters = dietFilter !== "all" || sortBy !== "popular" || searchQuery;

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, var(--bg-card) 0%, var(--bg) 100%)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0 32px",
      }}>
        <div className="container">
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>
            Our Menu
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            marginBottom: "24px",
          }}>
            Every Dish, a <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Masterpiece</span>
          </h1>

          {/* Search + Filter Bar */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 280px" }}>
              <Search size={16} style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                color: "var(--text-muted)", pointerEvents: "none",
              }} />
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: 42 }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)",
                  display: "flex",
                }}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Diet filter */}
            <div style={{ display: "flex", background: "var(--bg-elevated)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden" }}>
              {[["all", "All"], ["veg", "🌿 Veg"], ["nonveg", "🍖 Non-Veg"]].map(([val, label]) => (
                <button key={val} onClick={() => setDietFilter(val)} style={{
                  background: dietFilter === val ? "var(--gold)" : "transparent",
                  color: dietFilter === val ? "var(--bg)" : "var(--text-secondary)",
                  border: "none",
                  padding: "10px 16px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}>{label}</button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
              style={{ width: "auto", cursor: "pointer" }}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{
        position: "sticky",
        top: "var(--nav-height)",
        zIndex: 100,
        background: "rgba(13,13,11,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            gap: "4px",
            overflowX: "auto",
            padding: "12px 0",
            scrollbarWidth: "none",
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "var(--gold)" : "transparent",
                  color: activeCategory === cat.id ? "var(--bg)" : "var(--text-secondary)",
                  border: "1px solid " + (activeCategory === cat.id ? "var(--gold)" : "var(--border)"),
                  borderRadius: "100px",
                  padding: "8px 18px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        {/* Results count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
            {searchQuery ? ` for "${searchQuery}"` : ""}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setDietFilter("all"); setSortBy("popular"); setSearchQuery(""); setActiveCategory("all"); }}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: "100px", padding: "4px 14px", fontSize: "0.78rem", color: "var(--text-muted)", cursor: "pointer", fontFamily: "var(--font-body)" }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🍽️</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "8px" }}>No dishes found</h3>
            <p style={{ color: "var(--text-muted)" }}>Try a different search or category.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}>
            {filtered.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <Recommendations
          title="Frequently Ordered Together"
          excludeIds={filtered.map((i) => i.id).slice(0, 8)}
          limit={4}
        />
      </div>
    </div>
  );
}
