import { TOKENS, inset } from "../styles/tokens";

export default function TextField({ label, value, onChange, onKeyDown, placeholder, mono = false }) {
  return (
    <div style={{ marginBottom: TOKENS.spacing.md }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: TOKENS.textMuted,
            marginBottom: "6px",
            fontFamily: TOKENS.font.mono,
          }}
        >
          {label}
        </label>
      )}
      <input
        className="neu-input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        style={{
          ...inset(TOKENS.radius.sm),
          border: "none",
          color: TOKENS.text,
          padding: "12px 14px",
          fontSize: "14px",
          width: "100%",
          boxSizing: "border-box",
          fontFamily: mono ? TOKENS.font.mono : TOKENS.font.body,
        }}
      />
    </div>
  );
}
