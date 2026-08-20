import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { bob, useSpringIn } from "../animations";

type Props = {
  /**
   * Fichier de `public/` à utiliser. `mascotte.png` (Victor avec son panneau)
   * pour l'intro et l'écran de fin, `mascotte2.png` (bras ouverts) pour les
   * séquences explicatives.
   */
  src?: string;
  /** Hauteur de la mascotte en px. */
  height?: number;
  /** Frame d'apparition (relative à la séquence). */
  delay?: number;
  /** Décalage horizontal d'entrée (px). Négatif = arrive de la gauche. */
  slideFrom?: number;
  /** La mascotte fait « coucou » (balancement plus marqué). */
  wave?: boolean;
  /** Période de la respiration en frames : plus court = démarche rebondie. */
  bobPeriod?: number;
  /** Amplitude verticale de la respiration / du pas, en px. */
  bobAmount?: number;
  /** Inverse horizontalement (pour la faire regarder vers la droite). */
  flip?: boolean;
  style?: React.CSSProperties;
};

/**
 * Mascotte Mur Humide (Victor).
 *
 * Les visuels vivent dans `public/` (cf. `brand/README.md`) : remplacez le
 * fichier correspondant pour changer la mascotte, sans toucher au code.
 */
export const Mascotte: React.FC<Props> = ({
  src = "mascotte.png",
  height = 620,
  delay = 0,
  slideFrom = 0,
  wave = false,
  bobPeriod = 82,
  bobAmount = 8,
  flip = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const enter = useSpringIn(delay);

  const scale = interpolate(enter, [0, 1], [0.62, 1]);
  const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slide = interpolate(enter, [0, 1], [slideFrom, 0]);

  /* Respiration permanente + balancement « coucou ». */
  const breathe = bob(frame, bobPeriod, bobAmount);
  const tilt = wave ? bob(frame, 30, 3.5) : bob(frame, 110, 1.2);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${slide}px, ${breathe}px) scale(${scale}) rotate(${tilt}deg)`,
        transformOrigin: "50% 92%",
        ...style,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          height,
          width: "auto",
          display: "block",
          transform: flip ? "scaleX(-1)" : undefined,
          filter: "drop-shadow(0 26px 34px rgba(8, 43, 29, 0.22))",
        }}
      />
    </div>
  );
};
