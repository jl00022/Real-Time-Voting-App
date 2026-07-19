import { TOKENS, inset } from "../styles/tokens";

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        ...inset(TOKENS.radius.sm),
        color: TOKENS.danger,
        padding: "12px 16px",
        fontSize: "13px",
        marginBottom: TOKENS.spacing.lg,
      }}
    >
      {message}
    </div>
  );
}
