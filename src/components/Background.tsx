import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { bob } from "../animations";

/**
 * Fond continu de toute la vidéo (rendu hors des séquences pour éviter
 * tout clignotement entre deux scènes).
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(155deg, ${COLORS.white} 0%, ${COLORS.offWhite} 48%, ${COLORS.bluePale} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          left: -320 + bob(frame, 620, 26),
          top: -380 + bob(frame, 520, 18),
          background: `radial-gradient(circle at 50% 50%, ${COLORS.blueLight}33 0%, ${COLORS.blueLight}00 68%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          right: -420 - bob(frame, 700, 30),
          bottom: -560 + bob(frame, 460, 22),
          background: `radial-gradient(circle at 50% 50%, ${COLORS.blue}22 0%, ${COLORS.blue}00 65%)`,
        }}
      />
      {/* Trame diagonale très discrète */}
      <AbsoluteFill
        style={{
          opacity: 0.5,
          backgroundImage: `repeating-linear-gradient(135deg, ${COLORS.blue}0A 0px, ${COLORS.blue}0A 2px, transparent 2px, transparent 26px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 10,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
          background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.blueLight})`,
        }}
      />
    </AbsoluteFill>
  );
};
