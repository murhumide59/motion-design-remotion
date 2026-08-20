import React from "react";
import { AbsoluteFill } from "remotion";
import { useSceneFade } from "../animations";
import { FONT } from "../theme";

/**
 * Enveloppe commune à toutes les séquences : fondu croisé (entrée/sortie)
 * et léger recadrage, pour des transitions fluides sans coupure sèche.
 */
export const Scene: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const { opacity, scale } = useSceneFade(durationInFrames);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale})`,
        fontFamily: FONT,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
