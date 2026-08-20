import { VIEW } from "../components/Wall";

/**
 * Deux cadrages du mur en coupe, pour le format vertical.
 *
 * `DIAG` : le mur entier dans la largeur, pour les plans pédagogiques.
 * `WORK` : gros plan sur le bas du mur, pour les plans de chantier.
 */
export type Framing = {
  width: number;
  scale: number;
  x: number;
  y: number;
  sx: (vx: number) => number;
  sy: (vy: number) => number;
  ground: number;
  joint: number;
  holeX: (i: number) => number;
};

const make = (scale: number, x: number, y: number): Framing => {
  const sx = (vx: number) => x + vx * scale;
  const sy = (vy: number) => y + vy * scale;
  return {
    width: VIEW.w * scale,
    scale,
    x,
    y,
    sx,
    sy,
    ground: sy(500),
    joint: sy(440),
    holeX: (i: number) => sx(240 + i * 40),
  };
};

/** Mur entier dans la largeur : bloc de 8 à 1072 px, sol à 1092. */
export const DIAG = make(1.9, -372, 142);

/** Gros plan chantier : joint à 900, sol à 1140, trous tous les 160 px. */
export const WORK = make(4, -900, -860);
