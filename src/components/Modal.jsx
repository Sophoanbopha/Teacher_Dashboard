const C = {
  s800: "#1E293B",
  s400: "#94A3B8",
  s200: "#E2E8F0",
  s100: "#F1F5F9",
  s600: "#475569",
};

const Modal = ({ title, subtitle, onClose, children, wide }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
  }}>
    {/* Backdrop */}
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)" }}
      onClick={onClose}
    />

    {/* Dialog */}
    <div style={{
      position: "relative", background: "white",
      borderRadius: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
      width: "100%", maxWidth: wide ? 840 : 560,
      display: "flex", flexDirection: "column", maxHeight: "92vh",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "20px 24px", borderBottom: `1px solid ${C.s200}`, flexShrink: 0,
      }}>
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: C.s800, margin: 0 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: C.s400, marginTop: 3 }}>{subtitle}</p>
          )}
        </div>
        <button onClick={onClose} style={{
          background: C.s100, border: "none", borderRadius: 8,
          width: 30, height: 30, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", color: C.s600,
          fontSize: 18, lineHeight: 1,
        }}>
          &times;
        </button>
      </div>

      {/* Body */}
      <div style={{ overflowY: "auto", flex: 1, padding: 24 }}>
        {children}
      </div>
    </div>
  </div>
);

export default Modal;
