import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../theme";
import { Wall, type WallProps } from "../../components/Wall";
import { C } from "../theme";
import type { Framing } from "../framing";

/** Barrière et flèches à la charte du storyboard : orange. */
export const ORANGE_BARRIER = {
  line: C.orange,
  lineDark: C.orangeDark,
  glow: C.orangeLight,
};

/**
 * Le mur en coupe, posé dans un cadrage vertical, avec le sol prolongé
 * jusqu'au bas du cadre et un fond « navy clair ».
 */
export const WallShot: React.FC<
  WallProps & {
    framing: Framing;
    bg?: string;
    zoom?: number;
    /** Dessiné derrière le mur (nappe d'eau, etc.). */
    under?: React.ReactNode;
    children?: React.ReactNode;
  }
> = ({ framing, bg = C.navyPale, zoom = 1, under, children, ...wall }) => (
  <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: framing.ground,
          bottom: 0,
          background: `linear-gradient(180deg, ${COLORS.soil} 0%, ${COLORS.soilDark} 100%)`,
        }}
      />
      {under}
      <div style={{ position: "absolute", left: framing.x, top: framing.y }}>
        <Wall
          uid="tk"
          width={framing.width}
          arrowColor={C.orange}
          barrierColor={ORANGE_BARRIER}
          jointColor={C.orange}
          {...wall}
        />
      </div>
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);
