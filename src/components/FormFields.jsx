// FormFields component - Reusable form input components

// Design tokens
const N = "#0B1D3A"; // navy
const Y = "#F5B800"; // yellow
const YP = "#FFFBEB"; // yellow pale
const W = "#FFFFFF";
const TM = "#475569"; // text-mid
const TL = "#94A3B8"; // text-light
const BD = "#E2E8F0"; // border
const ER = "#DC2626"; // error
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * Text/date/email/tel input with label and error display
 */
export function Inp({ label, name, type = "text", value, onChange, error, placeholder, min, max }) {
  const inputId = `input-${name}`;
  return (
    <div style={{ marginBottom: 18 }}>
      <label htmlFor={inputId} style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>
        {label} <span style={{ color: ER }}>*</span>
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: 8,
          border: `1.5px solid ${error ? ER : BD}`,
          fontSize: 14,
          fontFamily: FB,
          color: N,
          background: W,
          boxSizing: "border-box",
          outline: "none",
          transition: "border 0.2s"
        }}
      />
      {error && <p style={{ fontSize: 12, color: ER, margin: "5px 0 0", fontFamily: FB }}>{error}</p>}
    </div>
  );
}

/**
 * Select dropdown with label and error display
 */
export function Sel({ label, name, value, onChange, options, error }) {
  const selectId = `select-${name}`;
  return (
    <div style={{ marginBottom: 18 }}>
      <label htmlFor={selectId} style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>
        {label} <span style={{ color: ER }}>*</span>
      </label>
      <select
        id={selectId}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: 8,
          border: `1.5px solid ${error ? ER : BD}`,
          fontSize: 14,
          fontFamily: FB,
          color: value ? N : TL,
          background: W,
          boxSizing: "border-box",
          outline: "none"
        }}
      >
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p style={{ fontSize: 12, color: ER, margin: "5px 0 0", fontFamily: FB }}>{error}</p>}
    </div>
  );
}

/**
 * Container card with consistent styling
 */
export function Card({ children, mb = 0, mt = 0 }) {
  return (
    <div style={{
      background: W,
      borderRadius: 18,
      border: `1px solid ${BD}`,
      padding: "30px 28px",
      marginBottom: mb,
      marginTop: mt,
      boxShadow: "0 4px 20px rgba(11,29,58,0.05)"
    }}>
      {children}
    </div>
  );
}

/**
 * Section header with underline
 */
export function SectionH({ children }) {
  return (
    <h3 style={{
      fontFamily: FD,
      fontSize: 26,
      color: N,
      letterSpacing: "0.04em",
      margin: "0 0 22px",
      borderBottom: `3px solid ${Y}`,
      paddingBottom: 10,
      display: "inline-block"
    }}>
      {children}
    </h3>
  );
}

/**
 * Colored information box with icon
 */
export function InfoBox({ children, color, border, text, icon }) {
  return (
    <div style={{
      padding: "12px 16px",
      background: color,
      border: `1px solid ${border}`,
      borderRadius: 9,
      fontSize: 13,
      color: text,
      fontFamily: FB,
      lineHeight: 1.6,
      marginBottom: 18
    }}>
      {icon} {children}
    </div>
  );
}

/**
 * Event selection row with checkbox
 */
export function EventRow({ name, fee, checked, disabled, label, labelBg, labelColor, desc, onClick, locked, ariaLabel }) {
  // Handle keyboard events for accessibility
  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !locked) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={disabled || locked ? undefined : onClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled || locked}
      aria-label={ariaLabel || `${name}, ${label.toLowerCase()}, fee ₹${fee.toLocaleString()}`}
      tabIndex={disabled || locked ? -1 : 0}
      style={{
        padding: "15px 18px",
        borderRadius: 11,
        border: `1.5px solid ${checked && !disabled ? Y : BD}`,
        background: checked && !disabled ? YP : W,
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: disabled || locked ? "default" : "pointer",
        transition: "all 0.2s",
        opacity: locked ? 0.45 : 1,
        outline: "none",
        minHeight: "44px", // Touch-friendly minimum height
        gap: 14,
        flexWrap: "wrap"
      }}
    >
      <div style={{ flex: "1 1 auto", minWidth: "200px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input
            type="checkbox"
            checked={checked}
            readOnly
            aria-hidden="true"
            style={{ 
              width: 18, 
              height: 18, 
              accentColor: N, 
              pointerEvents: "none",
              minWidth: "18px",
              minHeight: "18px"
            }}
          />
          <span style={{ fontWeight: 700, color: N, fontFamily: FB, fontSize: 15 }}>{name}</span>
          <span style={{
            background: labelBg,
            color: labelColor,
            fontSize: 10,
            padding: "2px 8px",
            borderRadius: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            fontFamily: FB
          }}>
            {label}
          </span>
        </div>
        <div style={{ color: TM, fontSize: 12, marginTop: 5, marginLeft: 28, fontFamily: FB }}>{desc}</div>
      </div>
      <span style={{
        fontFamily: FD,
        fontSize: 24,
        color: N,
        letterSpacing: "0.03em",
        flexShrink: 0,
        whiteSpace: "nowrap"
      }}>
        ₹{fee.toLocaleString()}
      </span>
    </div>
  );
}
