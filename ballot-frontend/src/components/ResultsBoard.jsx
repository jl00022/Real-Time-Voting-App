import { TOKENS, inset } from "../styles/tokens";

export default function ResultsBoard({ counts, options, highlight }) {
  const optionList = options && options.length ? options : Object.keys(counts || {});
  const total = optionList.reduce((sum, o) => sum + (counts[o] || 0), 0);

  return (
    <div>
      {optionList.map((opt) => {
        const c = counts[opt] || 0;
        const pct = total > 0 ? Math.round((c / total) * 100) : 0;
        const isHighlight = highlight === opt;
        return (
          <div key={opt} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isHighlight ? TOKENS.accent : TOKENS.text,
                }}
              >
                {opt}
              </span>
              <span style={{ fontSize: "13px", fontFamily: TOKENS.font.mono, color: TOKENS.text }}>
                {c} <span style={{ color: TOKENS.textMuted }}>· {pct}%</span>
              </span>
            </div>
            <div style={{ ...inset(TOKENS.radius.pill), height: "10px", padding: "2px" }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  borderRadius: TOKENS.radius.pill,
                  background: isHighlight ? TOKENS.accent : TOKENS.textMuted,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}
      <p
        style={{
          fontSize: "11px",
          color: TOKENS.textMuted,
          fontFamily: TOKENS.font.mono,
          marginTop: TOKENS.spacing.sm,
        }}
      >
        {total} vote{total === 1 ? "" : "s"} counted · refreshes every 2s
      </p>
    </div>
  );
}
