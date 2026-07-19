export const TOKENS = {
  surface: "#E6E7EE",
  surfaceRaised: "#EEF0F5",
  text: "#3A3F52",
  textMuted: "#7A8099",
  accent: "#6C7BFF",
  accentSoft: "rgba(108,123,255,0.14)",
  danger: "#E0637A",
  dangerSoft: "rgba(224,99,122,0.14)",
  success: "#4CAF82",
  shadowLight: "rgba(255,255,255,0.85)",
  shadowDark: "rgba(163,177,198,0.55)",
  radius: { sm: "8px", md: "14px", lg: "22px", pill: "999px" },
  spacing: { xs: "6px", sm: "10px", md: "16px", lg: "24px", xl: "36px" },
  font: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif",
    mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  },
};

export function raised(radius = TOKENS.radius.md) {
  return {
    background: TOKENS.surface,
    borderRadius: radius,
    boxShadow: `6px 6px 12px ${TOKENS.shadowDark}, -6px -6px 12px ${TOKENS.shadowLight}`,
  };
}

export function inset(radius = TOKENS.radius.md) {
  return {
    background: TOKENS.surface,
    borderRadius: radius,
    boxShadow: `inset 4px 4px 8px ${TOKENS.shadowDark}, inset -4px -4px 8px ${TOKENS.shadowLight}`,
  };
}

export function flat(radius = TOKENS.radius.md) {
  return { background: TOKENS.surfaceRaised, borderRadius: radius };
}
