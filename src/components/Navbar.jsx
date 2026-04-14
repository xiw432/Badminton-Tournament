import { useState, useEffect } from "react";

/**
 * Navbar component - Fixed navigation bar with scroll effects
 * Features:
 * - Fixed positioning at top of viewport
 * - Scroll-based background opacity change
 * - Active page highlighting with yellow underline
 * - Responsive design with theme colors
 * 
 * @param {Object} props
 * @param {string} props.page - Current active page ("home" | "rules" | "register" | "payment" | "confirm")
 * @param {Function} props.go - Navigation handler function
 */
export default function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme colors
  const navy = "#0B1D3A";
  const yellow = "#F5B800";
  const fontDisplay = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
  const fontBody = "'Outfit', 'Segoe UI', system-ui, sans-serif";

  // Link style with active state highlighting
  const linkStyle = (pageName) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    color: page === pageName ? yellow : "rgba(255,255,255,0.78)",
    fontSize: 14,
    fontFamily: fontBody,
    fontWeight: 500,
    padding: "8px 16px",
    borderBottom: page === pageName ? `2px solid ${yellow}` : "2px solid transparent",
    transition: "all 0.2s",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? navy : "rgba(7,15,31,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? `1px solid rgba(245,184,0,0.12)` : "none",
        transition: "all 0.35s",
        height: 70,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => go("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: fontDisplay,
              fontSize: 26,
              color: yellow,
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            SMAASH
          </span>
          <span
            style={{
              background: "rgba(245,184,0,0.12)",
              color: yellow,
              fontSize: 10,
              fontFamily: fontBody,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.1em",
              border: "1px solid rgba(245,184,0,0.25)",
            }}
          >
            TOURNAMENT
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button onClick={() => go("home")} style={linkStyle("home")}>
            Home
          </button>
          <button onClick={() => go("rules")} style={linkStyle("rules")}>
            Rules
          </button>
          <button onClick={() => go("how-to-register")} style={linkStyle("how-to-register")}>
            How to Register
          </button>
          <button
            onClick={() => go("register")}
            style={{
              background: yellow,
              color: navy,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: fontBody,
              fontWeight: 700,
              padding: "9px 22px",
              borderRadius: 8,
              marginLeft: 8,
              letterSpacing: "0.02em",
            }}
          >
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
}
