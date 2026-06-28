const C = {
  brand:      "#4F46E5",
  brandLight: "#EEF2FF",
};

const Avatar = ({ initials, size = 34, color = C.brand }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: C.brandLight, color,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.34, fontWeight: 700, flexShrink: 0,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {initials}
  </div>
);

export default Avatar;
