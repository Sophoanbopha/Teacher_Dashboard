const C = {
  s600: "#475569",
  red:  "#DC2626",
};

const Label = ({ children, required }) => (
  <label style={{
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: C.s600,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {children}{" "}
    {required && <span style={{ color: C.red }}>*</span>}
  </label>
);

export default Label;
