import React from "react";
import { Sequence, interpolate, useCurrentFrame } from "remotion";
import { C, FONT_BODY } from "../theme";
import type { Sub } from "../content";
import { HEIGHT } from "../timeline";

/**
 * Bandeau de sous-titre du storyboard : navy 85 %, coins arrondis, texte
 * blanc. En 9:16 il est remonté à 25 % du bas pour rester au-dessus de
 * l'interface TikTok / Reels.
 */
const Band: React.FC<{ text: string; duration: number }> = ({
  text,
  duration,
}) => {
  const frame = useCurrentFrame();
  const inOut = interpolate(
    frame,
    [0, 4, duration - 4, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rise = interpolate(frame, [0, 8], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 56,
        bottom: HEIGHT * 0.25,
        display: "flex",
        justifyContent: "center",
        opacity: inOut,
        transform: `translateY(${rise}px)`,
      }}
    >
      <div
        style={{
          background: `${C.navy}D9`,
          borderRadius: 8,
          padding: "24px 34px 28px",
          fontFamily: FONT_BODY,
          fontSize: 64,
          lineHeight: 1.22,
          fontWeight: 600,
          color: C.white,
          textAlign: "center",
          textWrap: "balance",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Captions: React.FC<{ subs?: Sub[] }> = ({ subs }) => (
  <>
    {(subs ?? []).map((s) => (
      <Sequence
        key={s.from}
        from={s.from}
        durationInFrames={s.duration}
        layout="none"
      >
        <Band text={s.text} duration={s.duration} />
      </Sequence>
    ))}
  </>
);
