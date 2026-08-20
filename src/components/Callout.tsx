import React from "react";
import { interpolate } from "remotion";
import { COLORS, FONT, SHADOW } from "../theme";
import { useSpringIn } from "../animations";

type Props = {
  text: string;
  /** Couleur d'accent (pastille + liseré). */
  accent?: string;
  delay?: number;
  /** Légère inclinaison, façon étiquette collée. */
  rotate?: number;
  fontSize?: number;
  style?: React.CSSProperties;
};

/** Étiquette incrustée qui « pope » à l'écran (spring). */
export const Callout: React.FC<Props> = ({
  text,
  accent = COLORS.alert,
  delay = 0,
  rotate = -2,
  fontSize = 40,
  style,
}) => {
  const enter = useSpringIn(delay, { damping: 11, mass: 0.6, stiffness: 130 });
  const scale = interpolate(enter, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        position: "absolute",
        opacity: Math.min(1, enter * 1.6),
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: "50% 50%",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: COLORS.white,
          borderRadius: 18,
          padding: "18px 30px",
          boxShadow: SHADOW.card,
          border: `3px solid ${accent}33`,
          fontFamily: FONT,
          fontSize,
          fontWeight: 700,
          color: COLORS.ink,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: accent,
            flexShrink: 0,
          }}
        />
        {text}
      </div>
    </div>
  );
};
