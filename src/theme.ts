/**
 * Charte visuelle Mur Humide Hauts-de-France.
 * Bleu #019EE5 + orange #DD6A00, tirés du logo.
 */

export const COLORS = {
  /** Bleu principal Mur Humide */
  blue: "#019EE5",
  blueDark: "#0176AB",
  /** Bleu nuit : contours du logo, textes */
  blueDeep: "#0E3A55",
  blueLight: "#5AC8F2",
  bluePale: "#E3F5FD",

  /** Orange Mur Humide (briques du logo) */
  orange: "#DD6A00",
  orangeDark: "#A94F00",
  orangeLight: "#F08A2E",
  orangePale: "#FDEFE0",

  white: "#FFFFFF",
  offWhite: "#F4FBFE",

  ink: "#122B3D",
  inkSoft: "#4C6577",

  /** Humidité / remontées capillaires */
  damp: "#5C7F94",
  dampDark: "#33566B",
  dampPale: "#9DB7C6",

  /** Moisissures, plâtre qui se détache */
  mould: "#3E4A38",
  /** Accent « alerte » : l'orange de la marque */
  alert: "#DD6A00",
  alertPale: "#FDEFE0",

  /** Maçonnerie (terre cuite, en écho aux briques du logo) */
  brick: "#DE9257",
  brickDark: "#C97B41",
  brickEdge: "#A96331",
  mortar: "#F5EFE6",
  plaster: "#FBF7F0",
  soil: "#8A6A4B",
  soilDark: "#6A5138",

  /** Barrière hydrofuge injectée */
  barrier: "#019EE5",
  barrierGlow: "#9BE4FF",
} as const;

export const FONT =
  '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif';

/** Ombres douces réutilisées sur les cartes / badges */
export const SHADOW = {
  card: "0 18px 46px rgba(14, 58, 85, 0.16)",
  soft: "0 8px 22px rgba(14, 58, 85, 0.12)",
  glow: `0 0 60px ${COLORS.barrierGlow}`,
} as const;
