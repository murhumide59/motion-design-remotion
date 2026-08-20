/**
 * Découpage temporel de « Victor fait l'injection » (30 fps, 1920x1080, 70 s).
 * Les séquences sont enchaînées bout à bout ; chaque scène déborde de
 * `SCENE_OVERLAP` frames sur la suivante pour permettre un fondu croisé.
 */

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Chevauchement (frames) entre deux scènes, pour le fondu croisé. */
export const SCENE_OVERLAP = 18;

export const SCENE_DURATIONS = {
  intro: 8 * FPS, // 0 → 8 s
  constat: 10 * FPS, // 8 → 18 s
  percage: 14 * FPS, // 18 → 32 s
  injection: 18 * FPS, // 32 → 50 s
  resultat: 10 * FPS, // 50 → 60 s
  cta: 10 * FPS, // 60 → 70 s
} as const;

export type SceneId = keyof typeof SCENE_DURATIONS;

export const SCENE_ORDER: SceneId[] = [
  "intro",
  "constat",
  "percage",
  "injection",
  "resultat",
  "cta",
];

export const SCENE_TITLES: Record<SceneId, string> = {
  intro: "Bonjour !",
  constat: "Le constat",
  percage: "Le perçage",
  injection: "L'injection",
  resultat: "Le résultat",
  cta: "Diagnostic gratuit",
};

/** Frame de départ de chaque scène. */
export const SCENE_START: Record<SceneId, number> = (() => {
  const starts = {} as Record<SceneId, number>;
  let at = 0;
  for (const id of SCENE_ORDER) {
    starts[id] = at;
    at += SCENE_DURATIONS[id];
  }
  return starts;
})();

/** Durée totale : 2100 frames = 70 s. */
export const TOTAL_DURATION = SCENE_ORDER.reduce(
  (sum, id) => sum + SCENE_DURATIONS[id],
  0,
);
