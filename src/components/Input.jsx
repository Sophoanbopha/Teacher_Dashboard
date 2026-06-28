const C = {
  brand: "#4F46E5",
  s800:  "#1E293B",
  s200:  "#E2E8F0",
};

const Input = ({ value, onChange, placeholder, type = "text", ...rest }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      border: `1.5px solid ${C.s200}`,
      borderRadius: 8,
      padding: "9px 12px",
      fontSize: 14,
      color: C.s800,
      background: "white",
      outline: "none",
      transition: "border-color 0.15s",
      fontFamily: "'DM Sans', sans-serif",
    }}
    onFocus={(e) => (e.target.style.borderColor = C.brand)}
    onBlur={(e) => (e.target.style.borderColor = C.s200)}
    {...rest}
  />
);

export default Input;
