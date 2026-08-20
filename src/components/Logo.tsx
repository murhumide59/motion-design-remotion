import React from "react";
import { COLORS, FONT } from "../theme";
import { BRAND } from "../content";

type Props = {
  /** Hauteur de la goutte, en px. Le wordmark s'adapte. */
  size?: number;
  /** Affiche le nom à côté de la goutte. */
  showWordmark?: boolean;
  /** Affiche la baseline sous le nom. */
  showBaseline?: boolean;
  style?: React.CSSProperties;
};

/** Marque Murhumide : goutte + wordmark, redimensionnable. */
export const Logo: React.FC<Props> = ({
  size = 84,
  showWordmark = true,
  showBaseline = false,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.28,
        fontFamily: FONT,
        ...style,
      }}
    >
      <svg
        width={size * 0.8}
        height={size}
        viewBox="0 0 64 80"
        style={{ display: "block", flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="mh-logo-drop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.greenLight} />
            <stop offset="55%" stopColor={COLORS.green} />
            <stop offset="100%" stopColor={COLORS.greenDark} />
          </linearGradient>
          <clipPath id="mh-logo-clip">
            <path d="M32 3 C32 3 6 34 6 51 a26 26 0 0 0 52 0 C58 34 32 3 32 3 Z" />
          </clipPath>
        </defs>
        <path
          d="M32 3 C32 3 6 34 6 51 a26 26 0 0 0 52 0 C58 34 32 3 32 3 Z"
          fill="url(#mh-logo-drop)"
        />
        {/* Vague blanche = l'humidité maîtrisée */}
        <g clipPath="url(#mh-logo-clip)">
          <path
            d="M-4 58 q 12 -9 22 0 t 22 0 t 22 0 V 84 H -4 Z"
            fill={COLORS.white}
            opacity={0.92}
          />
        </g>
        <path
          d="M32 3 C32 3 6 34 6 51 a26 26 0 0 0 52 0 C58 34 32 3 32 3 Z"
          fill="none"
          stroke={COLORS.greenDark}
          strokeWidth={2.5}
          opacity={0.25}
        />
      </svg>

      {showWordmark ? (
        <div style={{ lineHeight: 1 }}>
          <div
            style={{
              fontSize: size * 0.56,
              fontWeight: 800,
              letterSpacing: size * 0.006,
              color: COLORS.ink,
            }}
          >
            MUR<span style={{ color: COLORS.green }}>HUMIDE</span>
          </div>
          {showBaseline ? (
            <div
              style={{
                marginTop: size * 0.13,
                fontSize: size * 0.19,
                fontWeight: 600,
                letterSpacing: size * 0.024,
                textTransform: "uppercase",
                color: COLORS.inkSoft,
              }}
            >
              {BRAND.baseline}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
