import React from "react";
import { C, FONT_TITLE } from "../theme";
import { COLORS } from "../../theme";

const OUTLINE = C.navy;

/** Burin de perforateur : décroûtage de l'enduit dégradé. */
export const Chisel: React.FC<{
  x: number;
  y: number;
  angle?: number;
  shake?: number;
  frame?: number;
  scale?: number;
}> = ({ x, y, angle = 52, shake = 0, frame = 0, scale = 1 }) => {
  const wob = shake * Math.sin(frame * 2.2) * 4;
  const kick = shake * Math.abs(Math.sin(frame * 1.1)) * 14;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle + wob}) scale(${scale})`}>
      <g transform={`translate(${-kick} 0)`}>
        <path d="M0 -16 L-70 -26 L-70 26 L0 16 Z" fill="#C3CED5" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={-22} width={84} height={44} rx={12} fill="#8B979F" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-330} y={-52} width={186} height={104} rx={30} fill="#414F59" stroke={OUTLINE} strokeWidth={7} />
        <rect x={-318} y={-40} width={150} height={26} rx={13} fill={C.orange} />
        <g transform="translate(-276 44) rotate(10)">
          <rect x={-32} y={0} width={64} height={132} rx={26} fill="#2E3A42" stroke={OUTLINE} strokeWidth={7} />
        </g>
      </g>
    </g>
  );
};

/** Soufflette : dépoussiérage du trou. */
export const Blower: React.FC<{
  x: number;
  y: number;
  angle?: number;
  scale?: number;
}> = ({ x, y, angle = 52, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <rect x={-150} y={-10} width={150} height={20} rx={10} fill="#B9C4CB" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-300} y={-42} width={156} height={84} rx={24} fill={C.orange} stroke={OUTLINE} strokeWidth={7} />
    <rect x={-288} y={-30} width={120} height={22} rx={11} fill={C.white} opacity={0.45} />
    <g transform="translate(-250 36) rotate(8)">
      <rect x={-28} y={0} width={56} height={120} rx={24} fill="#2E3A42" stroke={OUTLINE} strokeWidth={7} />
    </g>
  </g>
);

/** Jet d'air + poussière expulsée du trou. */
export const DustJet: React.FC<{ x: number; y: number; progress: number }> = ({
  x,
  y,
  progress,
}) => {
  if (progress <= 0 || progress >= 1) return null;
  return (
    <g opacity={Math.sin(progress * Math.PI)}>
      {Array.from({ length: 9 }, (_, i) => {
        const t = (progress * 2.4 + i * 0.11) % 1;
        return (
          <circle
            key={i}
            cx={x - t * 320}
            cy={y - 26 - t * 150 + Math.sin(i * 2) * 22}
            r={10 + t * 34}
            fill="#D9CBB0"
            opacity={(1 - t) * 0.8}
          />
        );
      })}
    </g>
  );
};

/** Marque au crayon sur le joint. */
export const PencilMark: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={C.orange} strokeWidth={11} strokeLinecap="round">
    <line x1={-22} y1={-22} x2={22} y2={22} />
    <line x1={22} y1={-22} x2={-22} y2={22} />
  </g>
);

/**
 * Coupe horizontale d'un trou : la canule injecte la crème et le dernier
 * centimètre reste libre. C'est l'insert pédagogique du plan 10.
 */
export const HoleCutaway: React.FC<{ fill: number; showGap: number }> = ({
  fill,
  showGap,
}) => {
  const X0 = 96;
  const X1 = 900;
  const gap = 130; // le dernier centimètre
  const filled = X0 + (X1 - gap - X0) * fill;
  const TOP = 560;
  const H = 760;

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
      {/* Titre de l'insert */}
      <g transform="translate(540 430)">
        <rect x={-320} y={-52} width={640} height={104} rx={12} fill={C.navy} />
        <text x={0} y={16} textAnchor="middle" fontFamily={FONT_TITLE} fontSize={52} fontWeight={800} fill={C.white}>
          Le trou vu en coupe
        </text>
      </g>

      {/* Maçonnerie */}
      <rect x={40} y={TOP} width={1000} height={H} rx={14} fill={COLORS.brick} stroke={OUTLINE} strokeWidth={9} />
      <g stroke={COLORS.brickEdge} strokeWidth={6} opacity={0.55}>
        {Array.from({ length: 4 }, (_, i) => (
          <line key={i} x1={40} y1={TOP + 152 * (i + 1)} x2={1040} y2={TOP + 152 * (i + 1)} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`v${i}`} x1={140 + i * 200} y1={TOP} x2={140 + i * 200} y2={TOP + H} opacity={0.5} />
        ))}
      </g>

      {/* Le trou */}
      <rect x={X0} y={TOP + 300} width={X1 - X0} height={150} rx={30} fill="#2B2118" stroke={OUTLINE} strokeWidth={8} />
      {/* La crème injectée */}
      <rect x={X0 + 8} y={TOP + 308} width={Math.max(0, filled - X0 - 8)} height={134} rx={26} fill={C.orange} />
      <rect x={X0 + 8} y={TOP + 314} width={Math.max(0, filled - X0 - 8)} height={34} rx={17} fill={C.orangeLight} opacity={0.75} />

      {/* Canule qui se retire */}
      <g transform={`translate(${filled + 30} ${TOP + 375})`}>
        <rect x={0} y={-20} width={520} height={40} rx={20} fill="#C3CED5" stroke={OUTLINE} strokeWidth={7} />
        <rect x={470} y={-58} width={220} height={116} rx={26} fill={C.white} stroke={OUTLINE} strokeWidth={8} />
        <rect x={496} y={-34} width={140} height={40} rx={16} fill={C.orange} />
      </g>

      {/* Le dernier centimètre reste libre */}
      {showGap > 0.01 ? (
        <g opacity={showGap}>
          <rect
            x={X1 - gap}
            y={TOP + 288}
            width={gap}
            height={174}
            rx={20}
            fill="none"
            stroke={C.white}
            strokeWidth={9}
            strokeDasharray="20 16"
          />
          <g transform={`translate(${X1 - gap / 2 - 40} ${TOP + 560})`}>
            <rect x={-190} y={-4} width={380} height={92} rx={12} fill={C.navy} />
            <text x={0} y={60} textAnchor="middle" fontFamily={FONT_TITLE} fontSize={54} fontWeight={800} fill={C.white}>
              1 cm libre
            </text>
            <line x1={0} y1={-4} x2={0} y2={-92} stroke={C.white} strokeWidth={7} />
          </g>
        </g>
      ) : null}
    </svg>
  );
};
