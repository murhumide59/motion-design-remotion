import React from "react";
import { COLORS, FONT, SHADOW } from "../theme";

type Props = {
  /** Valeur affichée en % (0 → 100). */
  value: number;
  label?: string;
  size?: number;
  style?: React.CSSProperties;
};

const R = 100;
const CIRC = Math.PI * R; // demi-cercle

/** Hygromètre : arc de cercle + valeur, utilisé pour le diagnostic. */
export const MoistureGauge: React.FC<Props> = ({
  value,
  label = "Humidité du mur",
  size = 300,
  style,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = -180 + (clamped / 100) * 180;

  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: 28,
        boxShadow: SHADOW.card,
        padding: "26px 34px 22px",
        fontFamily: FONT,
        textAlign: "center",
        ...style,
      }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 240 132">
        <defs>
          <linearGradient id="mh-gauge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLORS.blue} />
            <stop offset="55%" stopColor={COLORS.damp} />
            <stop offset="100%" stopColor={COLORS.alert} />
          </linearGradient>
        </defs>
        <path
          d="M20 118 A100 100 0 0 1 220 118"
          fill="none"
          stroke={`${COLORS.ink}12`}
          strokeWidth={22}
          strokeLinecap="round"
        />
        <path
          d="M20 118 A100 100 0 0 1 220 118"
          fill="none"
          stroke="url(#mh-gauge)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - clamped / 100)}
        />
        <g transform={`rotate(${angle} 120 118)`}>
          <line
            x1={120}
            y1={118}
            x2={120}
            y2={38}
            stroke={COLORS.ink}
            strokeWidth={7}
            strokeLinecap="round"
          />
        </g>
        <circle cx={120} cy={118} r={13} fill={COLORS.ink} />
        <circle cx={120} cy={118} r={5} fill={COLORS.white} />
      </svg>

      <div
        style={{
          marginTop: -6,
          fontSize: size * 0.24,
          fontWeight: 800,
          color: COLORS.ink,
          lineHeight: 1,
        }}
      >
        {Math.round(clamped)}
        <span style={{ fontSize: size * 0.13, marginLeft: 4 }}>%</span>
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: size * 0.075,
          fontWeight: 700,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: COLORS.inkSoft,
        }}
      >
        {label}
      </div>
    </div>
  );
};
