import Label from "./Label";

const Field = ({ label, required, children }) => (
  <div>
    <Label required={required}>{label}</Label>
    {children}
  </div>
);

export default Field;
