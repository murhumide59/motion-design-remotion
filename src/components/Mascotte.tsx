import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { bob, useSpringIn } from "../animations";

type Props = {
  /** Hauteur de la mascotte en px. */
  height?: number;
  /** Frame d'apparition (relative à la séquence). */
  delay?: number;
  /** Décalage horizontal d'entrée (px). Négatif = arrive de la gauche. */
  slideFrom?: number;
  /** La mascotte fait « coucou » (balancement plus marqué). */
  wave?: boolean;
  /** Inverse horizontalement (pour la faire regarder vers la droite). */
  flip?: boolean;
  style?: React.CSSProperties;
};

/**
 * Mascotte Mur Humide (Victor).
 *
 * L'image vit dans `public/mascotte.png` : remplacez simplement ce fichier
 * (PNG à fond transparent, format portrait) pour changer la mascotte, sans
 * toucher au code.
 */
export const Mascotte: React.FC<Props> = ({
  height = 620,
  delay = 0,
  slideFrom = 0,
  wave = false,
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
  const breathe = bob(frame, 78, 10);
  const tilt = wave ? bob(frame, 26, 7) : bob(frame, 110, 1.6);

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
        src={staticFile("mascotte.png")}
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
