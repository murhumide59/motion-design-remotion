import React from "react";
import { interpolate, random } from "remotion";
import { C } from "../theme";
import { COLORS } from "../../theme";

/**
 * Surfaces de remplacement pour les plans tournés en réel : un mur enduit
 * cloqué (macro) et une pièce vue en plan large. Elles disparaissent dès que
 * les rushes sont branchés dans `footage.ts`.
 */

const BLISTERS = Array.from({ length: 16 }, (_, i) => ({
  x: random(`bx${i}`) * 1080,
  y: 200 + random(`by${i}`) * 1500,
  rx: 60 + random(`brx${i}`) * 90,
  ry: 40 + random(`bry${i}`) * 60,
  rot: (random(`brot${i}`) - 0.5) * 1.2,
}));

const CRACKS = Array.from({ length: 7 }, (_, i) => {
  const x = random(`cx${i}`) * 1080;
  const y = 300 + random(`cy${i}`) * 1300;
  let d = `M${x} ${y}`;
  let px = x;
  let py = y;
  for (let k = 0; k < 5; k++) {
    px += (random(`cdx${i}${k}`) - 0.5) * 120;
    py += 40 + random(`cdy${i}${k}`) * 90;
    d += ` L${px.toFixed(0)} ${py.toFixed(0)}`;
  }
  return d;
});

/** Enduit cloqué, plein cadre. */
export const PlasterSurface: React.FC<{ damp?: number }> = ({ damp = 0.5 }) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="mh-plaster" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EFE6D4" />
        <stop offset="100%" stopColor="#DDD0B8" />
      </linearGradient>
      <linearGradient id="mh-damp-macro" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLORS.damp} stopOpacity={0} />
        <stop offset="55%" stopColor={COLORS.damp} stopOpacity={0.35} />
        <stop offset="100%" stopColor={COLORS.dampDark} stopOpacity={0.6} />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#mh-plaster)" />
    {BLISTERS.map((b, i) => (
      <g key={i} transform={`rotate(${(b.rot * 180) / Math.PI} ${b.x} ${b.y})`}>
        <ellipse cx={b.x} cy={b.y + 8} rx={b.rx} ry={b.ry} fill="#C9B999" opacity={0.55} />
        <ellipse cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="#F3EADA" />
        <ellipse cx={b.x - b.rx * 0.25} cy={b.y - b.ry * 0.3} rx={b.rx * 0.4} ry={b.ry * 0.35} fill={C.white} opacity={0.5} />
      </g>
    ))}
    <g stroke="#B4A488" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.7}>
      {CRACKS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
    <rect y={620} width={1080} height={1300} fill="url(#mh-damp-macro)" opacity={damp} />
  </svg>
);

/** Main gantée qui décolle un fragment d'enduit. */
export const GlovedHand: React.FC<{ x: number; y: number; grip: number }> = ({
  x,
  y,
  grip,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${-14 + grip * 8})`}>
    <path
      d="M0 0 q-40 -70 -18 -132 q10 -30 40 -22 q8 -66 44 -60 q10 -60 46 -50 q14 -54 48 -38 l52 40 q46 36 40 104 q-8 96 -74 138 q-70 44 -178 20 Z"
      fill={C.white}
      stroke="#9FB0BC"
      strokeWidth={7}
      strokeLinejoin="round"
    />
    <path
      d="M96 -186 q30 26 26 74"
      fill="none"
      stroke="#C7D3DB"
      strokeWidth={6}
      strokeLinecap="round"
    />
    <rect x={-4} y={-16} width={210} height={54} rx={22} fill="#DCE5EB" stroke="#9FB0BC" strokeWidth={7} />
  </g>
);

/** Pièce vue en plan large : mur cloqué, plinthe décollée, sol. */
export const Room: React.FC<{ decolle: number }> = ({ decolle }) => {
  const lift = interpolate(decolle, [0, 1], [0, 26]);
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="mh-room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1E9DA" />
          <stop offset="70%" stopColor="#E2D6C0" />
          <stop offset="100%" stopColor="#C9BCA3" />
        </linearGradient>
        <linearGradient id="mh-room-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8794C" />
          <stop offset="100%" stopColor="#7E572F" />
        </linearGradient>
        <linearGradient id="mh-room-damp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.damp} stopOpacity={0} />
          <stop offset="100%" stopColor={COLORS.dampDark} stopOpacity={0.55} />
        </linearGradient>
      </defs>
      <rect width={1080} height={1420} fill="url(#mh-room-wall)" />
      <rect y={760} width={1080} height={660} fill="url(#mh-room-damp)" />
      {BLISTERS.slice(0, 10).map((b, i) => (
        <ellipse
          key={i}
          cx={b.x}
          cy={900 + (i % 5) * 90}
          rx={b.rx * 0.5}
          ry={b.ry * 0.45}
          fill="#F0E6D3"
          stroke="#B8A88C"
          strokeWidth={4}
          opacity={0.9}
        />
      ))}
      {/* Plinthe : une section se décolle */}
      <rect y={1330} width={1080} height={90} fill="#F2EDE4" stroke="#B9AE9B" strokeWidth={5} />
      <g transform={`translate(0 ${-lift}) rotate(${-decolle * 3} 640 1375)`}>
        <rect x={430} y={1330} width={420} height={90} fill="#F7F3EC" stroke="#B9AE9B" strokeWidth={5} />
      </g>
      <rect y={1420} width={1080} height={500} fill="url(#mh-room-floor)" />
      <g stroke="#6B4A26" strokeWidth={4} opacity={0.45}>
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={0} y1={1470 + i * 70} x2={1080} y2={1470 + i * 70} />
        ))}
      </g>
    </svg>
  );
};
