/**
 * Version 9:16 du storyboard : 1080x1920, 25 fps, 45 s (1125 frames).
 *
 * Montage repris du tableau « Version 9x16 » du storyboard : on ouvre sur le
 * plan 3 (la main qui décolle l'enduit), le plan 5 est supprimé, les étapes
 * 1 à 4 sont compressées, le logo passe à la fin.
 */

export const FPS = 25;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Chevauchement des plans, en frames (montage cut sec : très court). */
export const CUT_OVERLAP = 5;

export const PLANS = [
  { id: "accroche", title: "Accroche", seconds: 5 },
  { id: "diagnostic", title: "Le diagnostic", seconds: 6 },
  { id: "etape1", title: "Décroûtage", seconds: 3.5 },
  { id: "etape2", title: "Traçage", seconds: 3.5 },
  { id: "etape3", title: "Perçage", seconds: 3.5 },
  { id: "etape4", title: "Dépoussiérage", seconds: 3.5 },
  { id: "etape5", title: "Injection", seconds: 7 },
  { id: "barriere", title: "La barrière", seconds: 6 },
  { id: "etape6", title: "Rebouchage", seconds: 3 },
  { id: "signature", title: "Signature", seconds: 4 },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const DURATION: Record<PlanId, number> = Object.fromEntries(
  PLANS.map((p) => [p.id, Math.round(p.seconds * FPS)]),
) as Record<PlanId, number>;

export const START: Record<PlanId, number> = (() => {
  const starts = {} as Record<PlanId, number>;
  let at = 0;
  for (const p of PLANS) {
    starts[p.id] = at;
    at += DURATION[p.id];
  }
  return starts;
})();

/** 1125 frames = 45 s. */
export const TOTAL = PLANS.reduce((sum, p) => sum + DURATION[p.id], 0);
