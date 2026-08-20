import React from "react";
import { COLORS, FONT, SHADOW } from "../theme";
import { fadeUp } from "../animations";
import { useCurrentFrame } from "remotion";
import { Logo } from "./Logo";

type Props = {
  /** Numéro de l'étape affiché dans la pastille (1 → 6). */
  index: number;
  title: string;
  delay?: number;
};

/** Bandeau haut commun aux séquences : étape à gauche, logo à droite. */
export const SceneHeader: React.FC<Props> = ({ index, title, delay = 6 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 62,
        left: 96,
        right: 96,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: FONT,
        ...fadeUp(frame, delay, 20, -18),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 66,
            height: 66,
            borderRadius: 22,
            background: `linear-gradient(140deg, ${COLORS.green}, ${COLORS.greenDark})`,
            color: COLORS.white,
            fontSize: 34,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: SHADOW.soft,
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.ink,
            letterSpacing: 0.4,
          }}
        >
          {title}
        </div>
      </div>

      <Logo size={54} />
    </div>
  );
};
