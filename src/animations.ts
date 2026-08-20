import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SCENE_OVERLAP } from "./timeline";

/**
 * Fondu croisé d'une scène : entrée en fondu, puis sortie pendant le
 * chevauchement avec la scène suivante.
 */
export const useSceneFade = (sceneDuration: number) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 14, sceneDuration, sceneDuration + SCENE_OVERLAP],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(frame, [0, 24], [1.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { opacity, scale };
};

/** Ressort d'entrée standard (0 → 1). */
export const useSpringIn = (
  delay = 0,
  config: Parameters<typeof spring>[0]["config"] = {
    damping: 14,
    mass: 0.7,
    stiffness: 110,
  },
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame, fps, delay, config, durationInFrames: 40 });
};

/** Ressort doux, sans rebond (utile pour les jauges / barres). */
export const useSmoothSpring = (delay = 0, durationInFrames = 45) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame,
    fps,
    delay,
    durationInFrames,
    config: { damping: 200, mass: 1, stiffness: 100 },
  });
};

/** Oscillation continue (respiration de la mascotte, flèches, etc.). */
export const bob = (frame: number, periodInFrames: number, amplitude = 1) =>
  Math.sin((frame / periodInFrames) * Math.PI * 2) * amplitude;

/** Apparition « fade + montée » réutilisable, sans hook. */
export const fadeUp = (
  frame: number,
  from: number,
  durationInFrames = 18,
  distance = 26,
) => {
  const progress = interpolate(frame, [from, from + durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  };
};
