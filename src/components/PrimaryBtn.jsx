const C = {
  brand: "#0b3eac",
  brandMid: "#C7D2FE",
  red: "#DC2626",
  s100: "#F1F5F9",
  s700: "#334155",
};

const PrimaryBtn = ({
  onClick,
  children,
  disabled,
  small,
  variant = "primary",
}) => {
  const styles = {
    primary: { bg: C.brand, color: "white", border: "none" },
    outline: { bg: "white", color: C.brand, border: `1.5px solid ${C.brand}` },
    danger: { bg: C.red, color: "white", border: "none" },
    ghost: { bg: C.s100, color: C.s700, border: "none" },
  };

  const s = styles[variant] || styles.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? C.brandMid : s.bg,
        color: s.color,
        border: s.border,
        borderRadius: 8,
        padding: small ? "6px 14px" : "9px 20px",
        fontSize: small ? 13 : 14,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        transition: "opacity 0.15s",
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={(e) =>
        !disabled && (e.currentTarget.style.opacity = "0.85")
      }
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
