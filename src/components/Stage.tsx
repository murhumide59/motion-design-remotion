import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { VIEW } from "./Wall";
import { bob } from "../animations";
import { HEIGHT as HEIGHT_PX } from "../timeline";

/* ------------------------------------------------------------------ */
/* Décor commun : ciel, sol, et repères pour poser le mur et Victor    */
/* ------------------------------------------------------------------ */

/**
 * Le mur occupe la moitié droite du cadre et déborde en haut : il se lit comme
 * le mur d'une maison, pas comme un panneau posé sur le décor.
 */
export const WALL_W = 1747;
export const WALL_SCALE = WALL_W / VIEW.w;
export const WALL_X = 556;
export const WALL_Y = -64;

/** Repère du schéma → pixels à l'écran. */
export const sx = (vx: number) => WALL_X + vx * WALL_SCALE;
export const sy = (vy: number) => WALL_Y + vy * WALL_SCALE;

/** Ligne de sol : Victor pose les pieds dessus. */
export const GROUND = sy(500); // ≈ 846
/** Joint de ciment : c'est là que ça se perce et que ça s'injecte. */
export const JOINT = sy(440); // ≈ 759

/**
 * Décor de dessin animé : ciel dégradé, nuages, sol continu sur toute la
 * largeur (raccordé pile au sol dessiné dans le schéma de mur).
 */
const PEBBLES = Array.from({ length: 46 }, (_, i) => ({
  x: random(`gx${i}`) * 1920,
  y: 18 + random(`gy${i}`) * (1080 - 846 - 30),
  r: 3 + random(`gr${i}`) * 8,
  o: 0.12 + random(`go${i}`) * 0.18,
}));

export const Stage: React.FC<{ clouds?: boolean }> = ({ clouds = true }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.white} 0%, ${COLORS.bluePale} 55%, #CDEBFA 100%)`,
        }}
      />

      {clouds ? (
        <>
          <Cloud x={180 + bob(frame, 900, 40)} y={130} scale={1} />
          <Cloud x={1180 + bob(frame, 1100, 55)} y={90} scale={0.72} />
          <Cloud x={760 + bob(frame, 780, 30)} y={230} scale={0.55} />
        </>
      ) : null}

      {/* Soleil doux dans l'angle */}
      <div
        style={{
          position: "absolute",
          left: 1500,
          top: -180,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.orangeLight}33 0%, ${COLORS.orangeLight}00 65%)`,
        }}
      />

      {/* Sol : même dégradé que celui du schéma, pour un raccord invisible */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: GROUND,
          bottom: 0,
          background: `linear-gradient(180deg, ${COLORS.soil} 0%, ${COLORS.soilDark} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: GROUND - 3,
          height: 6,
          background: COLORS.soilDark,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: GROUND - 3,
          height: 5,
          opacity: interpolate(frame, [0, 12], [0, 0.25], {
            extrapolateRight: "clamp",
          }),
          background: COLORS.ink,
        }}
      />

      {/* Cailloux, pour que le sol ne soit pas un aplat mort */}
      <svg
        width={1920}
        height={1080 - GROUND}
        viewBox={`0 0 1920 ${1080 - GROUND}`}
        style={{ position: "absolute", left: 0, top: GROUND }}
      >
        {PEBBLES.map((p, i) => (
          <ellipse
            key={i}
            cx={p.x}
            cy={p.y}
            rx={p.r * 1.5}
            ry={p.r}
            fill={COLORS.soilDark}
            opacity={p.o}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

const Cloud: React.FC<{ x: number; y: number; scale: number }> = ({
  x,
  y,
  scale,
}) => (
  <svg
    width={320 * scale}
    height={130 * scale}
    viewBox="0 0 320 130"
    style={{ position: "absolute", left: x, top: y }}
  >
    <g fill={COLORS.white} opacity={0.9}>
      <ellipse cx={90} cy={80} rx={80} ry={44} />
      <ellipse cx={165} cy={58} rx={68} ry={52} />
      <ellipse cx={232} cy={82} rx={70} ry={40} />
    </g>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Victor sur le décor                                                  */
/* ------------------------------------------------------------------ */

/** Hauteur de référence de Victor sur le décor. */
export const VICTOR_H = 512;
export const VICTOR_W = VICTOR_H * 0.941;
/** Position de sa main (celle qui tient l'outil) dans son cadre. */
export const HAND_DX = VICTOR_W * 0.9;
export const HAND_DY = VICTOR_H * 0.35;
/** Bas de Victor exprimé en `bottom` CSS, pieds posés sur le sol. */
export const VICTOR_BOTTOM = HEIGHT_PX - GROUND;

/** Outil : inclinaison et portée entre la main et la pointe. */
export const TOOL_ANGLE = 58;
export const TOOL_DX = 154;
export const TOOL_DY = 246;

/** Abscisse à l'écran du trou n° i (13 trous espacés de 10 cm). */
export const holeScreenX = (i: number) => sx(240 + i * 40);

/** Position de Victor pour que la pointe de son outil vise `targetX`. */
export const victorLeftFor = (targetX: number) => targetX - TOOL_DX - HAND_DX;

/** Position de la main de Victor, connaissant son bord gauche. */
export const handAt = (left: number) => ({
  x: left + HAND_DX,
  y: GROUND - VICTOR_H + HAND_DY,
});

/** Caisse à outils posée au sol, à gauche du décor. */
export const Toolbox: React.FC = () => (
  <svg
    width={250}
    height={150}
    viewBox="0 0 250 150"
    style={{ position: "absolute", left: 62, top: GROUND - 118 }}
  >
    <rect x={16} y={54} width={218} height={82} rx={16} fill={COLORS.orange} stroke={COLORS.blueDeep} strokeWidth={7} />
    <rect x={16} y={78} width={218} height={16} fill={COLORS.orangeDark} opacity={0.5} />
    <path
      d="M78 54 q47 -54 94 0"
      fill="none"
      stroke={COLORS.blueDeep}
      strokeWidth={9}
      strokeLinecap="round"
    />
    <rect x={100} y={92} width={50} height={26} rx={8} fill={COLORS.white} stroke={COLORS.blueDeep} strokeWidth={5} />
  </svg>
);
