import { interpolate } from "remotion";
import { SCENE_START } from "./timeline";
import type { WallProps } from "./components/Wall";

/**
 * Le mur est un décor continu : son état (humidité, trous, barrière, séchage)
 * est calculé à partir de la frame absolue, et non scène par scène. Les scènes
 * réutilisent les mêmes repères pour synchroniser Victor et ses outils.
 */

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Perçage : du premier au dernier trou. */
export const DRILL_FROM = SCENE_START.percage + 60;
export const DRILL_TO = SCENE_START.percage + 348;

/** Injection : de la première à la dernière cartouche. */
export const INJECT_FROM = SCENE_START.injection + 96;
export const INJECT_TO = SCENE_START.injection + 456;

/** Rebouchage des trous, puis séchage du mur. */
export const PATCH_FROM = SCENE_START.resultat + 14;
export const PATCH_TO = SCENE_START.resultat + 104;
export const DRY_FROM = SCENE_START.resultat + 96;
export const DRY_TO = SCENE_START.resultat + 250;

export const holesAt = (abs: number) =>
  interpolate(abs, [DRILL_FROM, DRILL_TO], [0, 1], clamp);

export const barrierAt = (abs: number) =>
  interpolate(abs, [INJECT_FROM, INJECT_TO], [0, 1], clamp);

export const patchAt = (abs: number) =>
  interpolate(abs, [PATCH_FROM, PATCH_TO], [0, 1], clamp);

export const dryAt = (abs: number) =>
  interpolate(abs, [DRY_FROM, DRY_TO], [0, 1], clamp);

/** État complet du mur à une frame absolue donnée. */
export const wallStateAt = (abs: number): WallProps => {
  const dry = dryAt(abs);

  return {
    dampLevel: interpolate(
      abs,
      [0, SCENE_START.constat + 40, SCENE_START.constat + 240, DRY_FROM, DRY_TO],
      [0.42, 0.46, 0.58, 0.58, 0.04],
      clamp,
    ),
    arrows: interpolate(
      abs,
      [
        SCENE_START.constat + 30,
        SCENE_START.constat + 70,
        INJECT_FROM + 120,
        INJECT_TO,
      ],
      [0.35, 1, 1, 0],
      clamp,
    ),
    mould: interpolate(
      abs,
      [0, SCENE_START.constat + 120, SCENE_START.constat + 260, DRY_FROM, DRY_TO],
      [0.55, 0.6, 1, 1, 0],
      clamp,
    ),
    flaking: 1,
    jointHighlight: interpolate(
      abs,
      [SCENE_START.percage + 6, SCENE_START.percage + 40, INJECT_TO, INJECT_TO + 60],
      [0, 1, 1, 0],
      clamp,
    ),
    holes: holesAt(abs),
    patched: patchAt(abs),
    barrier: barrierAt(abs),
    clean: dry,
    repaired: interpolate(abs, [DRY_FROM + 30, DRY_TO + 20], [0, 1], clamp),
  };
};
