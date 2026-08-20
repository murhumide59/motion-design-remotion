/**
 * Emplacements pour les prises de vue réelles du storyboard.
 *
 * Tant qu'un plan vaut `null`, il est joué avec son animation de remplacement,
 * ce qui permet de diffuser la vidéo dès maintenant. Pour brancher un rush :
 * déposer le fichier dans `public/footage/` et renseigner son nom ici.
 *
 * Les lettres reprennent la « liste de tournage » du storyboard.
 */
export const FOOTAGE: Record<string, string | null> = {
  /** A — Mur dégradé, plan large (8 s) */
  A: null,
  /** B — Macro : enduit qui s'effrite dans la main (6 s) */
  B: null,
  /** C — Piquage au perforateur (10 s) */
  C: null,
  /** D — Mètre déroulé + marques au crayon (10 s) */
  D: null,
  /** E — Perçage, gros plan foret (12 s) */
  E: null,
  /** G — Soufflage du trou (8 s) */
  G: null,
  /** H — Injection cartouche, retrait lent (15 s) */
  H: null,
  /** K/L — Rebouchage mortier puis enduit (6 s + 6 s) */
  K: null,
};

export type ShotId = keyof typeof FOOTAGE;
