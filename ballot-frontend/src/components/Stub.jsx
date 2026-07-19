import { TOKENS, inset } from "../styles/tokens";

export default function Stub({ label, value, mono = true }) {
  return (
    <div
      style={{
        ...inset(TOKENS.radius.sm),
        flex: "1 1 140px",
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: TOKENS.textMuted,
          fontFamily: TOKENS.font.mono,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: TOKENS.text,
          fontFamily: mono ? TOKENS.font.mono : TOKENS.font.body,
          letterSpacing: mono ? "0.04em" : undefined,
        }}
      >
        {value}
      </span>
    </div>
  );
}
