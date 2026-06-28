const Badge = ({ status }) => {
  const map = {
    active: { bg: "#DBEAFE", color: "#2563EB", label: "Active" },
    closed: { bg: "#F1F5F9", color: "#475569", label: "Closed" },
    draft: { bg: "#FEF9C3", color: "#92400E", label: "Draft" },
    graded: { bg: "#DCFCE7", color: "#16A34A", label: "Graded" },
    pending: { bg: "#FEF3C7", color: "#B45309", label: "Pending" },
    missing: { bg: "#FEE2E2", color: "#DC2626", label: "Missing" },
    present: { bg: "#DCFCE7", color: "#16A34A", label: "Present" },
    absent: { bg: "#FEE2E2", color: "#DC2626", label: "Absent" },
  };

  const s = map[status] || map.draft;

  return (
    <span
      style={{
        display: "inline-block",
        background: s.bg,
        color: s.color,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.01em",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {s.label}
    </span>
  );
};

export default Badge;
