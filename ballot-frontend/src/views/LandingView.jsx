import { TOKENS } from "../styles/tokens";
import Button from "../components/Button";

export default function LandingView({ busy, onCreate, onJoin }) {
  return (
    <section>
      <h1
        style={{
          fontFamily: TOKENS.font.body,
          fontWeight: 600,
          fontSize: "clamp(30px, 6vw, 42px)",
          lineHeight: 1.15,
          color: TOKENS.text,
          margin: "0 0 0.75rem",
        }}
      >
        Cast the count.
      </h1>
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.6,
          color: TOKENS.textMuted,
          maxWidth: "420px",
          margin: "0 0 2rem",
        }}
      >
        Open a session in seconds, share the code and password with your voters, and watch the tally update live.
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button variant="primary" busy={busy} onClick={onCreate}>
          {busy ? "Opening..." : "Create session"}
        </Button>
        <Button variant="secondary" onClick={onJoin}>
          I have a code
        </Button>
      </div>
    </section>
  );
}
