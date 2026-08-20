import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

/** Fine barre de progression globale, lisible de loin sur un écran TV. */
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = Math.min(1, frame / (durationInFrames - 1));

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        background: `${COLORS.greenDark}14`,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${COLORS.greenDark}, ${COLORS.green} 60%, ${COLORS.greenLight})`,
        }}
      />
    </div>
  );
};
