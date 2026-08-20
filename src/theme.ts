/**
 * Charte visuelle Murhumide : vert & blanc.
 * Toutes les couleurs / typos de la vidéo sont centralisées ici.
 */

export const COLORS = {
  /** Vert principal Murhumide */
  green: "#12A150",
  greenDark: "#0B5D3B",
  greenDeep: "#082B1D",
  greenLight: "#4ED18B",
  greenPale: "#E6F7EE",

  white: "#FFFFFF",
  offWhite: "#F5FBF7",

  ink: "#0E2A20",
  inkSoft: "#4A6259",

  /** Humidité / remontées capillaires */
  damp: "#5C7F94",
  dampDark: "#33566B",
  dampPale: "#9DB7C6",

  /** Moisissures, plâtre qui se détache */
  mould: "#3E4A38",
  alert: "#E4572E",
  alertPale: "#FDE9E2",

  /** Maçonnerie */
  brick: "#DCD3C6",
  brickDark: "#C0B4A3",
  brickEdge: "#A89A86",
  mortar: "#F0EBE2",
  plaster: "#FBF7F0",
  soil: "#8A6A4B",
  soilDark: "#6A5138",

  /** Barrière hydrofuge injectée */
  barrier: "#12A150",
  barrierGlow: "#8CF0C6",
} as const;

export const FONT =
  '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif';

/** Ombres douces réutilisées sur les cartes / badges */
export const SHADOW = {
  card: "0 18px 46px rgba(8, 43, 29, 0.14)",
  soft: "0 8px 22px rgba(8, 43, 29, 0.10)",
  glow: `0 0 60px ${COLORS.barrierGlow}`,
} as const;
