import React from "react";
import { Sequence, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT, SHADOW } from "../theme";
import type { CaptionLine } from "../content";
import { useSpringIn } from "../animations";

const Line: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const enter = useSpringIn(0, { damping: 18, mass: 0.6, stiffness: 120 });

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const y = interpolate(enter, [0, 1], [34, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 72,
        display: "flex",
        justifyContent: "center",
        padding: "0 120px",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          background: "rgba(255, 255, 255, 0.96)",
          borderRadius: 26,
          borderLeft: `12px solid ${COLORS.blue}`,
          boxShadow: SHADOW.card,
          padding: "26px 46px 28px",
          fontFamily: FONT,
          fontSize: 44,
          lineHeight: 1.32,
          fontWeight: 600,
          color: COLORS.ink,
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/**
 * Piste de sous-titres d'une séquence : les phrases s'enchaînent au rythme
 * du commentaire parlé.
 */
export const CaptionTrack: React.FC<{ lines: CaptionLine[] }> = ({ lines }) => {
  return (
    <>
      {lines.map((line) => (
        <Sequence
          key={`${line.from}-${line.text}`}
          from={line.from}
          durationInFrames={line.durationInFrames}
          layout="none"
        >
          <Line text={line.text} durationInFrames={line.durationInFrames} />
        </Sequence>
      ))}
    </>
  );
};
