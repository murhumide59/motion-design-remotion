import React from "react";
import { COLORS, FONT } from "../theme";

/**
 * Outils de Victor, dessinés en style dessin animé (aplats + gros contours).
 * Convention : la pointe active de l'outil est à l'origine locale (0,0), le
 * corps part vers les x négatifs. On place donc l'outil en donnant
 * directement la position du trou à percer / injecter.
 */

const OUTLINE = COLORS.blueDeep;

type ToolProps = {
  /** Position de la pointe, en pixels écran. */
  x: number;
  y: number;
  /** Inclinaison en degrés (40° = manche en haut à gauche). */
  angle?: number;
  /** Tremblement (0 = immobile, 1 = en pleine action). */
  shake?: number;
  scale?: number;
  frame?: number;
  /** Couleur d'accent de l'outil (charte du projet par défaut). */
  accent?: string;
};

/** Perceuse. */
export const Drill: React.FC<ToolProps> = ({
  x,
  y,
  angle = 40,
  shake = 0,
  scale = 1,
  frame = 0,
  accent = COLORS.blue,
}) => {
  const wob = shake * Math.sin(frame * 1.9) * 3;
  const jitter = shake * Math.sin(frame * 2.7) * 2.5;

  return (
    <g
      transform={`translate(${x + jitter} ${y}) rotate(${angle + wob}) scale(${scale})`}
    >
      {/* Mèche */}
      <rect x={-78} y={-7} width={78} height={14} rx={3} fill="#B7C1C7" stroke={OUTLINE} strokeWidth={4} />
      <g stroke={OUTLINE} strokeWidth={3} opacity={0.55}>
        <line x1={-16} y1={-7} x2={-26} y2={7} />
        <line x1={-34} y1={-7} x2={-44} y2={7} />
        <line x1={-52} y1={-7} x2={-62} y2={7} />
      </g>
      {/* Mandrin */}
      <rect x={-110} y={-22} width={36} height={44} rx={8} fill="#78858D" stroke={OUTLINE} strokeWidth={5} />
      {/* Corps */}
      <rect x={-250} y={-38} width={144} height={76} rx={22} fill="#414F59" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-244} y={-32} width={120} height={20} rx={10} fill={accent} />
      <rect x={-276} y={-26} width={32} height={52} rx={12} fill="#2E3A42" stroke={OUTLINE} strokeWidth={6} />
      {/* Poignée */}
      <g transform="translate(-198 26) rotate(12)">
        <rect x={-26} y={0} width={52} height={112} rx={22} fill="#2E3A42" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-19} y={14} width={38} height={48} rx={14} fill={COLORS.blue} opacity={0.35} />
      </g>
      <rect x={-166} y={24} width={24} height={32} rx={9} fill={COLORS.orange} stroke={OUTLINE} strokeWidth={5} />
    </g>
  );
};

/** Pistolet à cartouche : la crème hydrofuge. */
export const InjectionGun: React.FC<ToolProps> = ({
  x,
  y,
  angle = 40,
  shake = 0,
  scale = 1,
  frame = 0,
  accent = COLORS.blue,
}) => {
  const wob = shake * Math.sin(frame * 1.3) * 2;

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle + wob}) scale(${scale})`}>
      {/* Canule */}
      <path
        d="M0 -9 L-56 -20 L-56 20 L0 9 Z"
        fill="#C9D4DA"
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* Cartouche */}
      <rect x={-250} y={-40} width={196} height={80} rx={18} fill={COLORS.white} stroke={OUTLINE} strokeWidth={6} />
      <rect x={-232} y={-28} width={110} height={56} rx={10} fill={accent} />
      <rect x={-224} y={-16} width={94} height={10} rx={5} fill={COLORS.white} opacity={0.75} />
      <rect x={-224} y={2} width={64} height={8} rx={4} fill={COLORS.white} opacity={0.5} />
      {/* Berceau + tige */}
      <rect x={-266} y={-16} width={26} height={32} rx={8} fill={COLORS.orange} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-320} y={-8} width={60} height={16} rx={8} fill="#9AA5AB" stroke={OUTLINE} strokeWidth={5} />
      {/* Poignée */}
      <g transform="translate(-214 36) rotate(10)">
        <rect x={-26} y={0} width={52} height={116} rx={22} fill={COLORS.orange} stroke={OUTLINE} strokeWidth={6} />
      </g>
      <path
        d="M-186 44 q26 6 24 40 q-14 -14 -30 -16 Z"
        fill={COLORS.orangeDark}
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    </g>
  );
};

/** Mètre-ruban déroulé entre deux trous, avec la cote. */
export const TapeMeasure: React.FC<{
  x1: number;
  x2: number;
  y: number;
  label: string;
  progress: number;
  /** Grossit la cote sans changer la longueur du ruban. */
  labelScale?: number;
}> = ({ x1, x2, y, label, progress, labelScale = 1 }) => {
  const w = (x2 - x1) * progress;
  return (
    <g opacity={Math.min(1, progress * 2)}>
      {/* Boîtier */}
      <rect x={x1 - 74} y={y - 34} width={68} height={68} rx={16} fill={COLORS.orange} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={x1 - 40} cy={y} r={16} fill={COLORS.white} stroke={OUTLINE} strokeWidth={5} />
      {/* Ruban */}
      <rect x={x1 - 8} y={y - 15} width={w + 16} height={30} rx={6} fill="#FFD86B" stroke={OUTLINE} strokeWidth={5} />
      <g stroke={OUTLINE} strokeWidth={3} opacity={0.8}>
        {Array.from({ length: Math.max(0, Math.floor(w / 14)) }, (_, i) => (
          <line
            key={i}
            x1={x1 + 8 + i * 14}
            y1={y - 15}
            x2={x1 + 8 + i * 14}
            y2={y - (i % 2 === 0 ? 2 : 7)}
          />
        ))}
      </g>
      {/* Cote */}
      <g transform={`translate(${(x1 + x2) / 2} ${y - 74 * labelScale}) scale(${labelScale})`} opacity={progress > 0.85 ? 1 : 0}>
        <rect x={-92} y={-32} width={184} height={62} rx={20} fill={COLORS.white} stroke={OUTLINE} strokeWidth={6} />
        <text
          x={0}
          y={12}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={38}
          fontWeight={900}
          fill={COLORS.blueDeep}
        >
          {label}
        </text>
      </g>
    </g>
  );
};

/** Truelle : sert à reboucher les trous. */
export const Trowel: React.FC<ToolProps> = ({ x, y, angle = 40, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <path
      d="M0 0 L-120 -46 L-160 0 L-120 46 Z"
      fill="#C9D4DA"
      stroke={OUTLINE}
      strokeWidth={6}
      strokeLinejoin="round"
    />
    <rect x={-176} y={-14} width={30} height={28} rx={8} fill="#78858D" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-262} y={-22} width={92} height={44} rx={20} fill={COLORS.orange} stroke={OUTLINE} strokeWidth={6} />
  </g>
);
