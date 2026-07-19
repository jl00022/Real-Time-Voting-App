import { TOKENS, inset } from "../styles/tokens";
import Panel from "../components/Panel";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function AdminSetupView({
  draftOption,
  draftOptions,
  busy,
  onDraftChange,
  onAdd,
  onRemove,
  onConfirm,
}) {
  return (
    <Panel>
      <h2 style={{ fontSize: "22px", fontWeight: 600, color: TOKENS.text, margin: "0 0 0.4rem" }}>
        Set the options
      </h2>
      <p style={{ fontSize: "13px", color: TOKENS.textMuted, margin: "0 0 1.25rem" }}>
        Voters will choose from this list. Add at least two.
      </p>

      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <TextField
            value={draftOption}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="Type an option and press enter"
          />
        </div>
        <Button variant="secondary" size="sm" onClick={onAdd} style={{ marginTop: 0 }}>
          Add
        </Button>
      </div>

      {draftOptions.length > 0 && (
        <ul style={{ listStyle: "none", margin: "0 0 1.5rem", padding: 0 }}>
          {draftOptions.map((opt, i) => (
            <li
              key={opt}
              style={{
                ...inset(TOKENS.radius.sm),
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontFamily: TOKENS.font.mono, fontSize: "12px", color: TOKENS.textMuted }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ flex: 1, fontSize: "14px", color: TOKENS.text }}>{opt}</span>
              <button
                onClick={() => onRemove(opt)}
                aria-label={`Remove ${opt}`}
                style={{
                  background: "transparent",
                  border: "none",
                  color: TOKENS.danger,
                  fontSize: "18px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "0 4px",
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}

      <Button variant="primary" fullWidth busy={busy} disabled={draftOptions.length < 2} onClick={onConfirm}>
        {busy ? "Opening polls..." : "Open the polls"}
      </Button>
    </Panel>
  );
}
