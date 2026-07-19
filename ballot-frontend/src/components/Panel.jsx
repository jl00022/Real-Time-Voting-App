import { TOKENS, raised } from "../styles/tokens";

export default function Panel({ children, style }) {
  return (
    <section
      style={{
        ...raised(TOKENS.radius.lg),
        padding: "2rem",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
