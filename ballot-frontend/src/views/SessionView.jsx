import { TOKENS } from "../styles/tokens";
import Panel from "../components/Panel";
import Stub from "../components/Stub";
import VoteBallot from "../components/VoteBallot";
import ResultsBoard from "../components/ResultsBoard";
import Button from "../components/Button";

export default function SessionView({
  role,
  hasVoted,
  sessionId,
  sessionPassword,
  counts,
  options,
  selectedOption,
  busy,
  onSelectOption,
  onVote,
  onEndSession,
}) {
  const isAdmin = role === "admin";

  return (
    <Panel>
      {isAdmin && (
        <>
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: TOKENS.text, margin: "0 0 0.4rem" }}>
            Polls are open
          </h2>
          <p style={{ fontSize: "13px", color: TOKENS.textMuted, margin: "0 0 1.25rem" }}>
            Share this code and password with your voters.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: TOKENS.spacing.xl }}>
            <Stub label="Code" value={sessionId} />
            <Stub label="Password" value={sessionPassword} />
          </div>
        </>
      )}

      {!hasVoted && (
        <>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: TOKENS.text, margin: "0 0 1rem" }}>
            Mark your choice
          </h3>
          <VoteBallot
            options={options}
            selectedOption={selectedOption}
            busy={busy}
            onSelect={onSelectOption}
            onVote={onVote}
          />
        </>
      )}

      {hasVoted && (
        <div style={{ marginTop: isAdmin ? 0 : "0.5rem" }}>
          <ResultsBoard counts={counts} options={options} highlight={selectedOption} />
        </div>
      )}

      {isAdmin && (
        <div style={{ marginTop: TOKENS.spacing.xl }}>
          <Button variant="danger" fullWidth busy={busy} onClick={onEndSession}>
            {busy ? "Ending..." : "End session"}
          </Button>
        </div>
      )}
    </Panel>
  );
}
