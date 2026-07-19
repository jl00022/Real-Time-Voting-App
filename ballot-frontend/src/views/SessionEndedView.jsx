import { TOKENS } from "../styles/tokens";
import Panel from "../components/Panel";
import ResultsBoard from "../components/ResultsBoard";
import Button from "../components/Button";

export default function SessionEndedView({ role, counts, options, onReset }) {
  return (
    <Panel>
      <h2 style={{ fontSize: "22px", fontWeight: 600, color: TOKENS.text, margin: "0 0 0.4rem" }}>
        Session has ended
      </h2>
      <p style={{ fontSize: "13px", color: TOKENS.textMuted, margin: "0 0 1.5rem" }}>
        {role === "admin" ? "You ended this session." : "The organizer ended this session."} Here are the final
        results.
      </p>
      <ResultsBoard counts={counts} options={options} />
      <div style={{ marginTop: TOKENS.spacing.xl }}>
        <Button variant="secondary" fullWidth onClick={onReset}>
          Start or join another session
        </Button>
      </div>
    </Panel>
  );
}
