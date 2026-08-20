import React from "react";
import { interpolate, interpolateColors, random, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/* ------------------------------------------------------------------ */
/* Géométrie du schéma (repère SVG 960 x 660)                          */
/* ------------------------------------------------------------------ */

export const VIEW = { w: 960, h: 660 };
const WALL = { x: 200, y: 20, w: 560, h: 540 };
const WALL_BOTTOM = WALL.y + WALL.h; // 560
/** Niveau du sol extérieur. */
const GROUND_Y = 500;
/** Bas du plâtrage : en dessous, la maçonnerie est apparente. */
const PLASTER_BOTTOM = 380;
/** Joint de ciment horizontal visé par l'injection (60 px ≈ 15 cm du sol). */
export const JOINT_Y = 440;
const COURSE_H = 60;
const BRICK_W = 140;

/** 40 px sur le schéma = 10 cm sur le mur. */
export const HOLE_SPACING = 40;
export const HOLE_X0 = 240;
export const HOLE_COUNT = 13;

export const holeX = (i: number) => HOLE_X0 + i * HOLE_SPACING;

export const WALL_BOX = WALL;

/* ------------------------------------------------------------------ */
/* Décors déterministes (positions figées, jamais aléatoires au rendu)  */
/* ------------------------------------------------------------------ */

const MOULD = Array.from({ length: 9 }, (_, i) => ({
  x: WALL.x + 50 + random(`mx${i}`) * (WALL.w - 100),
  y: 240 + random(`my${i}`) * 150,
  blobs: Array.from({ length: 5 }, (_, j) => ({
    dx: (random(`mbx${i}${j}`) - 0.5) * 44,
    dy: (random(`mby${i}${j}`) - 0.5) * 30,
    r: 7 + random(`mbr${i}${j}`) * 11,
  })),
}));

const MOTTLES = Array.from({ length: 18 }, (_, i) => ({
  x: WALL.x + 20 + random(`ox${i}`) * (WALL.w - 40),
  y: 190 + random(`oy${i}`) * 320,
  rx: 24 + random(`orx${i}`) * 46,
  ry: 13 + random(`ory${i}`) * 22,
  o: 0.05 + random(`oo${i}`) * 0.07,
}));

const PEBBLES = Array.from({ length: 26 }, (_, i) => ({
  x: random(`px${i}`) * VIEW.w,
  y: GROUND_Y + 14 + random(`py${i}`) * (VIEW.h - GROUND_Y - 24),
  r: 3 + random(`pr${i}`) * 7,
  o: 0.14 + random(`po${i}`) * 0.16,
}));

const FLAKES = Array.from({ length: 11 }, (_, i) => {
  const x = WALL.x + 26 + random(`fx${i}`) * (WALL.w - 110);
  const y = 196 + random(`fy${i}`) * 150;
  const w = 34 + random(`fw${i}`) * 40;
  const h = 30 + random(`fh${i}`) * 34;
  const jitter = (k: string) => (random(`fj${i}${k}`) - 0.5) * 18;
  const points = [
    [x + jitter("a"), y + jitter("b")],
    [x + w + jitter("c"), y + jitter("d")],
    [x + w + jitter("e"), y + h + jitter("f")],
    [x + jitter("g"), y + h + jitter("h")],
  ];
  return {
    d: `M${points.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L")} Z`,
    cx: x + w / 2,
    cy: y + h / 2,
    dir: random(`fd${i}`) > 0.5 ? 1 : -1,
    start: i / 13,
  };
});

/** Front d'humidité : ligne ondulée, animée très lentement. */
const dampCrest = (topY: number, phase: number) => {
  const steps = 16;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = WALL.x + (WALL.w * i) / steps;
    const y =
      topY +
      Math.sin(i * 0.8 + phase) * 11 +
      Math.sin(i * 2.2 + phase * 0.6) * 5;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d.trim();
};

/* ------------------------------------------------------------------ */

export type WallProps = {
  /** Hauteur des remontées capillaires (0 = mur sain, 1 = très haut). */
  dampLevel?: number;
  /** Intensité visuelle de la tache d'humidité. */
  dampOpacity?: number;
  /** Opacité des flèches montantes. */
  arrows?: number;
  /** Apparition des moisissures (0 → 1). */
  mould?: number;
  /** Décollement du plâtrage (0 → 1 : à 1, toutes les écailles sont tombées). */
  flaking?: number;
  /** Mise en évidence du joint de ciment (0 → 1). */
  jointHighlight?: number;
  /** Progression du perçage des trous (0 → 1). */
  holes?: number;
  /** Rebouchage des trous, de la droite vers la gauche (0 → 1). */
  patched?: number;
  /** Progression de la barrière hydrofuge injectée (0 → 1). */
  barrier?: number;
  /** Mur assaini : le plâtre retrouve sa teinte d'origine (0 → 1). */
  clean?: number;
  /** Plâtre refait : les zones épaufrées se referment (0 → 1). */
  repaired?: number;
  /** Largeur de rendu en px (le schéma garde son ratio). */
  width?: number;
  style?: React.CSSProperties;
  /** Identifiant unique : les `id` SVG doivent être uniques par instance. */
  uid?: string;
};

/**
 * Schéma de mur en coupe, réutilisé par les séquences 2, 4 et 5.
 * Tout l'état visuel (humidité, moisissures, trous, barrière…) est piloté
 * par les props, ce qui permet de le faire évoluer d'une scène à l'autre.
 */
export const Wall: React.FC<WallProps> = ({
  dampLevel = 0,
  dampOpacity = 1,
  arrows = 0,
  mould = 0,
  flaking = 0,
  jointHighlight = 0,
  holes = 0,
  patched = 0,
  barrier = 0,
  clean = 0,
  repaired = 0,
  width = 960,
  style,
  uid = "w",
}) => {
  const frame = useCurrentFrame();

  const dampTop = interpolate(dampLevel, [0, 1], [GROUND_Y - 4, 110]);
  const crest = dampCrest(dampTop, frame / 30);
  const dampArea = `${crest} L${WALL.x + WALL.w} ${WALL_BOTTOM} L${WALL.x} ${WALL_BOTTOM} Z`;

  const plasterFill = interpolateColors(clean, [0, 1], ["#EDE4D3", "#F8F2E7"]);
  const plasterStain = interpolate(clean, [0, 1], [1, 0]);

  const id = (name: string) => `${uid}-${name}`;

  return (
    <svg
      width={width}
      height={(width * VIEW.h) / VIEW.w}
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      style={{ display: "block", ...style }}
    >
      <defs>
        <linearGradient id={id("brick")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.brick} />
          <stop offset="100%" stopColor={COLORS.brickDark} />
        </linearGradient>
        <linearGradient
          id={id("damp")}
          x1="0"
          y1={dampTop}
          x2="0"
          y2={WALL_BOTTOM}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={COLORS.damp} stopOpacity={0.08} />
          <stop offset="22%" stopColor={COLORS.damp} stopOpacity={0.5} />
          <stop offset="100%" stopColor={COLORS.dampDark} stopOpacity={0.82} />
        </linearGradient>
        <linearGradient id={id("soil")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.soil} />
          <stop offset="100%" stopColor={COLORS.soilDark} />
        </linearGradient>
        <linearGradient id={id("barrier")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.blueDark} />
          <stop offset="45%" stopColor={COLORS.barrier} />
          <stop offset="100%" stopColor={COLORS.blueLight} />
        </linearGradient>
        <filter id={id("glow")} x="-40%" y="-400%" width="180%" height="900%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={id("soft")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <clipPath id={id("wallClip")}>
          <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} rx={5} />
        </clipPath>
        <clipPath id={id("dampClip")}>
          <path d={dampArea} />
        </clipPath>

      </defs>

      {/* ---------------- Sol ---------------- */}
      <rect
        x={0}
        y={GROUND_Y}
        width={VIEW.w}
        height={VIEW.h - GROUND_Y}
        fill={`url(#${id("soil")})`}
      />
      {PEBBLES.map((p, i) => (
        <ellipse
          key={i}
          cx={p.x}
          cy={p.y}
          rx={p.r * 1.4}
          ry={p.r}
          fill={COLORS.soilDark}
          opacity={p.o}
        />
      ))}

      {/* ---------------- Mur ---------------- */}
      <g clipPath={`url(#${id("wallClip")})`}>
        <rect
          x={WALL.x}
          y={WALL.y}
          width={WALL.w}
          height={WALL.h}
          fill={COLORS.mortar}
        />
        {/* Assises de maçonnerie (appareil à joints croisés) */}
        {Array.from({ length: Math.ceil(WALL.h / COURSE_H) }, (_, row) => {
          const y = WALL.y + row * COURSE_H;
          const offset = row % 2 === 0 ? 0 : -BRICK_W / 2;
          return Array.from({ length: 6 }, (_, col) => (
            <rect
              key={`${row}-${col}`}
              x={WALL.x + offset + col * BRICK_W + 5}
              y={y + 5}
              width={BRICK_W - 10}
              height={COURSE_H - 10}
              rx={3}
              fill={`url(#${id("brick")})`}
              stroke={COLORS.brickEdge}
              strokeWidth={3}
            />
          ));
        })}

        {/* Plâtrage intérieur */}
        <g>
          <rect
            x={WALL.x}
            y={WALL.y}
            width={WALL.w}
            height={PLASTER_BOTTOM - WALL.y}
            fill={plasterFill}
          />
          <rect
            x={WALL.x}
            y={PLASTER_BOTTOM - 10}
            width={WALL.w}
            height={10}
            fill={COLORS.brickEdge}
            opacity={0.35}
          />
        </g>

        {/* Remontée capillaire */}
        <g opacity={dampOpacity}>
          <path d={dampArea} fill={`url(#${id("damp")})`} />
          <g clipPath={`url(#${id("dampClip")})`}>
            {MOTTLES.map((m, i) => (
              <ellipse
                key={i}
                cx={m.x}
                cy={m.y}
                rx={m.rx}
                ry={m.ry}
                fill={COLORS.dampDark}
                opacity={m.o * plasterStain}
                filter={`url(#${id("soft")})`}
              />
            ))}
          </g>
          {dampLevel > 0.12 ? (
            <path
              d={crest}
              fill="none"
              stroke={COLORS.dampDark}
              strokeWidth={5}
              strokeOpacity={0.5}
              strokeLinecap="round"
            />
          ) : null}
        </g>

        {/* Moisissures */}
        {MOULD.map((spot, i) => {
          const o = interpolate(
            mould,
            [i / MOULD.length, i / MOULD.length + 0.3],
            [0, 0.5],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          if (o <= 0.001) return null;
          return (
            <g key={i} opacity={o}>
              {spot.blobs.map((b, j) => (
                <circle
                  key={j}
                  cx={spot.x + b.dx}
                  cy={spot.y + b.dy}
                  r={b.r}
                  fill={COLORS.mould}
                  stroke={COLORS.mould}
                  strokeWidth={6}
                  strokeOpacity={0.35}
                />
              ))}
            </g>
          );
        })}

        {/* Flèches : l'humidité qui remonte du sol dans le mur */}
        {arrows > 0.01 ? (
          <g opacity={arrows}>
            {Array.from({ length: 5 }, (_, i) => {
              const x = WALL.x + 76 + i * 102;
              const travel = Math.max(GROUND_Y - dampTop, 1);
              const phase = (frame * 1.5 + i * 41) % travel;
              const y = GROUND_Y - phase;
              const o = interpolate(
                phase,
                [0, travel * 0.25, travel * 0.7, travel],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <g
                  key={i}
                  transform={`translate(${x} ${y})`}
                  opacity={o}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <g stroke={COLORS.white} strokeWidth={13} opacity={0.85}>
                    <line x1={0} y1={32} x2={0} y2={-10} />
                    <polyline points="-13,4 0,-11 13,4" />
                  </g>
                  <g stroke={COLORS.dampDark} strokeWidth={6}>
                    <line x1={0} y1={32} x2={0} y2={-10} />
                    <polyline points="-13,4 0,-11 13,4" />
                  </g>
                </g>
              );
            })}
          </g>
        ) : null}
      </g>

      {/* Épaufrures : la sous-couche apparaît là où le plâtre est parti */}
      <g clipPath={`url(#${id("wallClip")})`}>
        {FLAKES.map((f, i) => {
          const p = interpolate(flaking, [f.start, f.start + 0.16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const closed = repaired * FLAKES.length > i;
          return p > 0.1 && !closed ? (
            <path
              key={i}
              d={f.d}
              fill="#D6C6A6"
              stroke="#A98D6A"
              strokeWidth={4}
              opacity={0.95}
            />
          ) : null;
        })}
      </g>

      {/* Écailles de plâtre qui se détachent et tombent */}
      {FLAKES.map((f, i) => {
        const p = interpolate(flaking, [f.start, f.start + 0.26], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        if (p <= 0.02 || p >= 0.995) return null;
        return (
          <path
            key={i}
            d={f.d}
            fill={plasterFill}
            stroke={COLORS.brickEdge}
            strokeWidth={2}
            opacity={1 - p * 0.85}
            transform={`translate(${f.dir * p * 46} ${p * p * 300}) rotate(${f.dir * p * 70} ${f.cx} ${f.cy})`}
          />
        );
      })}

      {/* Contour du mur */}
      <rect
        x={WALL.x}
        y={WALL.y}
        width={WALL.w}
        height={WALL.h}
        rx={5}
        fill="none"
        stroke={COLORS.blueDeep}
        strokeOpacity={0.9}
        strokeWidth={8}
      />

      {/* Sol au premier plan (vue en coupe : la fondation reste lisible) */}
      <rect
        x={0}
        y={GROUND_Y}
        width={VIEW.w}
        height={VIEW.h - GROUND_Y}
        fill={`url(#${id("soil")})`}
        opacity={0.78}
      />
      <line
        x1={0}
        y1={GROUND_Y}
        x2={VIEW.w}
        y2={GROUND_Y}
        stroke={COLORS.soilDark}
        strokeWidth={6}
      />

      {/* Joint de ciment horizontal mis en évidence */}
      {jointHighlight > 0.01 ? (
        <g opacity={jointHighlight}>
          <rect
            x={WALL.x - 4}
            y={JOINT_Y - 13}
            width={WALL.w + 8}
            height={26}
            rx={13}
            fill={COLORS.bluePale}
            opacity={0.35}
          />
          <rect
            x={WALL.x - 4}
            y={JOINT_Y - 13}
            width={WALL.w + 8}
            height={26}
            rx={13}
            fill="none"
            stroke={COLORS.blue}
            strokeWidth={5}
            strokeDasharray="15 10"
          />
        </g>
      ) : null}

      {/* Barrière hydrofuge injectée */}
      {barrier > 0.001 ? (
        <g clipPath={`url(#${id("wallClip")})`}>
          {Array.from({ length: HOLE_COUNT }, (_, i) => {
            const p = interpolate(
              barrier,
              [i / HOLE_COUNT, i / HOLE_COUNT + 0.22],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            if (p <= 0.01) return null;
            return (
              <ellipse
                key={i}
                cx={holeX(i)}
                cy={JOINT_Y}
                rx={32 * p}
                ry={22 * p}
                fill={COLORS.barrierGlow}
                opacity={0.5 * p}
                filter={`url(#${id("soft")})`}
              />
            );
          })}
          <rect
            x={WALL.x + 6}
            y={JOINT_Y - 8}
            width={(WALL.w - 12) * barrier}
            height={20}
            rx={10}
            fill={`url(#${id("barrier")})`}
            filter={`url(#${id("glow")})`}
          />
        </g>
      ) : null}

      {/* Trous de perçage, tous les 10 cm */}
      {Array.from({ length: HOLE_COUNT }, (_, i) => {
        const p = Math.max(0, Math.min(1, holes * HOLE_COUNT - i));
        if (p <= 0.01) return null;
        const x = holeX(i);
        const injected = WALL.x + 6 + (WALL.w - 12) * barrier > x;
        const plugged = patched * HOLE_COUNT > HOLE_COUNT - 1 - i;
        return (
          <g key={i}>
            {p < 1 ? (
              <circle
                cx={x}
                cy={JOINT_Y}
                r={9 + (1 - p) * 24}
                fill={COLORS.brickEdge}
                opacity={(1 - p) * 0.55}
              />
            ) : null}
            <circle
              cx={x}
              cy={JOINT_Y}
              r={(plugged ? 5.5 : 7) * p}
              fill={plugged || injected ? COLORS.mortar : "#2B2118"}
              opacity={plugged || injected ? 0.7 : 1}
              stroke={COLORS.blueDeep}
              strokeWidth={2.5}
              strokeOpacity={plugged || injected ? 0.35 : 0.9}
            />
          </g>
        );
      })}
    </svg>
  );
};
