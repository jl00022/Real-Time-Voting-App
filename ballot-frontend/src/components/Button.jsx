import { TOKENS, raised } from "../styles/tokens";

const VARIANTS = {
  primary: { background: TOKENS.accent, color: "#fff" },
  secondary: { background: TOKENS.surface, color: TOKENS.text },
  danger: { background: TOKENS.danger, color: "#fff" },
};

export default function Button({
  variant = "primary",
  size = "md",
  busy = false,
  disabled = false,
  onClick,
  children,
  type = "button",
  style,
  fullWidth = false,
}) {
  const isColored = variant === "primary" || variant === "danger";
  const colorStyle = isColored ? { background: VARIANTS[variant].background } : {};

  return (
    <button
      type={type}
      className="neu-btn"
      disabled={disabled || busy}
      onClick={onClick}
      style={{
        ...raised(TOKENS.radius.md),
        ...colorStyle,
        color: isColored ? VARIANTS[variant].color : TOKENS.text,
        border: "none",
        padding: size === "sm" ? "8px 16px" : "12px 22px",
        fontSize: size === "sm" ? "13px" : "14px",
        fontWeight: 500,
        fontFamily: TOKENS.font.body,
        cursor: disabled || busy ? "not-allowed" : "pointer",
        opacity: disabled || busy ? 0.6 : 1,
        width: fullWidth ? "100%" : undefined,
        transition: "box-shadow 0.15s ease, transform 0.1s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
