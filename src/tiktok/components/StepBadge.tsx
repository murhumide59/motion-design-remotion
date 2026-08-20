import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_TITLE } from "../theme";

/**
 * Cartouche chiffré d'étape : pastille orange Ø 120 px, scale 0 → 1 en
 * 12 frames, puis maintien ~2 s, comme spécifié au storyboard.
 */
export const StepBadge: React.FC<{
  n: number;
  label?: string;
  delay?: number;
  hold?: number;
}> = ({ n, label, delay = 2, hold = 50 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    delay,
    durationInFrames: 12,
    config: { damping: 13, mass: 0.5, stiffness: 140 },
  });
  const out = interpolate(frame, [delay + hold, delay + hold + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        top: 120,
        display: "flex",
        alignItems: "center",
        gap: 26,
        opacity: out,
        transform: `scale(${pop})`,
        transformOrigin: "0% 50%",
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: C.orange,
          color: C.white,
          fontFamily: FONT_TITLE,
          fontSize: 66,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {n}
      </div>
      {label ? (
        <div
          style={{
            background: `${C.navy}E6`,
            color: C.white,
            borderRadius: 8,
            padding: "16px 26px",
            fontFamily: FONT_TITLE,
            fontSize: 46,
            fontWeight: 700,
            letterSpacing: 0.5,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
