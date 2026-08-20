import React from "react";
import { interpolate, random } from "remotion";
import { COLORS, FONT } from "../theme";

/** Éclat en étoile (impact, « pop » de dessin animé). */
export const starPath = (spikes: number, outer: number, inner: number) => {
  let d = "";
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)} `;
  }
  return `${d}Z`;
};

/** Nuage de poussière au perçage. */
export const DustPuff: React.FC<{ x: number; y: number; progress: number }> = ({
  x,
  y,
  progress,
}) => {
  if (progress <= 0 || progress >= 1) return null;
  return (
    <g opacity={1 - progress}>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 6 + 0.4;
        const d = 12 + progress * 62;
        return (
          <circle
            key={i}
            cx={x + Math.cos(a) * d}
            cy={y + Math.sin(a) * d * 0.75}
            r={7 + progress * 16}
            fill={COLORS.brick}
            stroke={COLORS.brickEdge}
            strokeWidth={3}
            opacity={0.85}
          />
        );
      })}
    </g>
  );
};

/** Étoile d'impact qui gonfle puis disparaît. */
export const ImpactStar: React.FC<{
  x: number;
  y: number;
  progress: number;
  color?: string;
}> = ({ x, y, progress, color = COLORS.orange }) => {
  if (progress <= 0 || progress >= 1) return null;
  const s = interpolate(progress, [0, 0.4, 1], [0.2, 1.15, 1.5]);
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      opacity={interpolate(progress, [0, 0.3, 1], [0, 1, 0])}
    >
      <path
        d={starPath(9, 46, 20)}
        fill={color}
        stroke={COLORS.blueDeep}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    </g>
  );
};

/** Onomatopée façon BD. */
export const Onomatopee: React.FC<{
  text: string;
  x: number;
  y: number;
  progress: number;
  color?: string;
  rotate?: number;
}> = ({ text, x, y, progress, color = COLORS.orange, rotate = -8 }) => {
  if (progress <= 0 || progress >= 1) return null;
  const pop = interpolate(progress, [0, 0.18, 0.85, 1], [0.3, 1, 1, 1.25]);
  const opacity = interpolate(progress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const w = 46 + text.length * 26;

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${pop})`}
      opacity={opacity}
    >
      <path
        d={starPath(14, w * 0.62, w * 0.44)}
        fill={COLORS.white}
        stroke={COLORS.blueDeep}
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <text
        x={0}
        y={16}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={48}
        fontWeight={900}
        fill={color}
        stroke={COLORS.blueDeep}
        strokeWidth={2.5}
        paintOrder="stroke"
      >
        {text}
      </text>
    </g>
  );
};

/** Petites étoiles « tout propre ». */
export const Sparkles: React.FC<{
  seed: string;
  count: number;
  box: { x: number; y: number; w: number; h: number };
  frame: number;
  from: number;
}> = ({ seed, count, box, frame, from }) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const px = box.x + random(`${seed}x${i}`) * box.w;
      const py = box.y + random(`${seed}y${i}`) * box.h;
      const size = 14 + random(`${seed}s${i}`) * 20;
      const delay = from + random(`${seed}d${i}`) * 70;
      const o = interpolate(
        frame,
        [delay, delay + 14, delay + 44, delay + 62],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      if (o <= 0.01) return null;
      return (
        <g key={i} transform={`translate(${px} ${py})`} opacity={o}>
          <path
            d="M0 -1 C1.5 -9 4 -12 12 -13 C4 -14 1.5 -17 0 -25 C-1.5 -17 -4 -14 -12 -13 C-4 -12 -1.5 -9 0 -1 Z"
            transform={`scale(${size / 13}) translate(0 13)`}
            fill={COLORS.blueLight}
            stroke={COLORS.white}
            strokeWidth={1.5}
          />
        </g>
      );
    })}
  </>
);

/** Gouttes de sueur / points d'interrogation au-dessus de la tête. */
export const Worry: React.FC<{ x: number; y: number; progress: number }> = ({
  x,
  y,
  progress,
}) => {
  if (progress <= 0.01) return null;
  return (
    <g opacity={progress}>
      <g transform={`translate(${x} ${y - progress * 14})`}>
        <path
          d="M0 -34 C0 -34 -22 -6 -22 6 a22 22 0 0 0 44 0 C22 -6 0 -34 0 -34 Z"
          fill={COLORS.blueLight}
          stroke={COLORS.blueDeep}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </g>
      <text
        x={x + 74}
        y={y - 24}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={72}
        fontWeight={900}
        fill={COLORS.orange}
        stroke={COLORS.blueDeep}
        strokeWidth={4}
        paintOrder="stroke"
        transform={`rotate(12 ${x + 74} ${y - 24})`}
      >
        ?
      </text>
    </g>
  );
};

/** Ampoule « j'ai la solution ! ». */
export const IdeaBulb: React.FC<{
  x: number;
  y: number;
  progress: number;
}> = ({ x, y, progress }) => {
  if (progress <= 0.01) return null;
  const s = interpolate(progress, [0, 0.35, 1], [0.2, 1.12, 1]);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g stroke={COLORS.orange} strokeWidth={8} strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 8;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 62}
              y1={Math.sin(a) * 62}
              x2={Math.cos(a) * 88}
              y2={Math.sin(a) * 88}
            />
          );
        })}
      </g>
      <path
        d="M0 -52 a40 40 0 0 1 24 72 l0 14 l-48 0 l0 -14 a40 40 0 0 1 24 -72 Z"
        fill="#FFE07A"
        stroke={COLORS.blueDeep}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <rect x={-20} y={34} width={40} height={22} rx={8} fill="#9AA5AB" stroke={COLORS.blueDeep} strokeWidth={6} />
    </g>
  );
};
