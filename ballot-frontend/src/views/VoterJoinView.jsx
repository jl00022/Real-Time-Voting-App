import { TOKENS } from "../styles/tokens";
import Panel from "../components/Panel";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function VoterJoinView({ joinSessionId, joinPassword, busy, onCodeChange, onPasswordChange, onJoin }) {
  return (
    <Panel>
      <h2 style={{ fontSize: "22px", fontWeight: 600, color: TOKENS.text, margin: "0 0 0.4rem" }}>
        Enter the session
      </h2>
      <p style={{ fontSize: "13px", color: TOKENS.textMuted, margin: "0 0 1.25rem" }}>
        Ask the organizer for the code and password.
      </p>
      <TextField label="Code" value={joinSessionId} onChange={(e) => onCodeChange(e.target.value)} placeholder="123456" mono />
      <TextField
        label="Password"
        value={joinPassword}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="A1B2C3"
        mono
      />
      <Button variant="primary" fullWidth busy={busy} onClick={onJoin}>
        {busy ? "Checking..." : "Enter"}
      </Button>
    </Panel>
  );
}
