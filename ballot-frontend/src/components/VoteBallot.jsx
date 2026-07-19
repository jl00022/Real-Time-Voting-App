import { TOKENS, inset, raised } from "../styles/tokens";
import Button from "./Button";

export default function VoteBallot({ options, selectedOption, busy, onSelect, onVote }) {
  if (!options || options.length === 0) {
    return (
      <p style={{ fontSize: "14px", color: TOKENS.textMuted }}>
        The ballot isn't open yet — ask the organizer to add options.
      </p>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: TOKENS.spacing.lg }}>
        {options.map((opt) => {
          const isSelected = selectedOption === opt;
          return (
            <label
              key={opt}
              style={{
                ...(isSelected ? inset(TOKENS.radius.sm) : raised(TOKENS.radius.sm)),
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="ballot-option"
                value={opt}
                checked={isSelected}
                onChange={() => onSelect(opt)}
                style={{ accentColor: TOKENS.accent, width: "16px", height: "16px" }}
              />
              <span style={{ fontSize: "14px", color: TOKENS.text }}>{opt}</span>
            </label>
          );
        })}
      </div>
      <Button variant="primary" fullWidth busy={busy} disabled={!selectedOption} onClick={onVote}>
        {busy ? "Casting..." : "Cast vote"}
      </Button>
    </div>
  );
}
