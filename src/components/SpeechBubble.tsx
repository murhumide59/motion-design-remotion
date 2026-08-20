import React from "react";
import { Sequence, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import type { CaptionLine } from "../content";
import { useSpringIn } from "../animations";

type Anchor = { left?: number; right?: number; top: number; width: number };

/** Une réplique : la bulle « pope » puis disparaît. */
const Bubble: React.FC<{
  text: string;
  durationInFrames: number;
  anchor: Anchor;
  /** Position horizontale de la pointe, en % de la largeur de la bulle. */
  tail: number;
}> = ({ text, durationInFrames, anchor, tail }) => {
  const frame = useCurrentFrame();
  const enter = useSpringIn(0, { damping: 12, mass: 0.5, stiffness: 150 });
  const opacity = interpolate(
    frame,
    [0, 6, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(enter, [0, 1], [0.55, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: anchor.left,
        right: anchor.right,
        top: anchor.top,
        width: anchor.width,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: `${tail}% 100%`,
      }}
    >
      <div
        style={{
          position: "relative",
          background: COLORS.white,
          border: `7px solid ${COLORS.blueDeep}`,
          borderRadius: 40,
          padding: "26px 38px 30px",
          fontFamily: FONT,
          fontSize: 42,
          lineHeight: 1.28,
          fontWeight: 700,
          color: COLORS.ink,
          textAlign: "center",
          boxShadow: "0 14px 0 rgba(14, 58, 85, 0.14)",
        }}
      >
        {text}
        {/* Pointe de la bulle */}
        <svg
          width={78}
          height={52}
          viewBox="0 0 78 52"
          style={{
            position: "absolute",
            left: `calc(${tail}% - 39px)`,
            top: "100%",
            marginTop: -6,
          }}
        >
          <path
            d="M8 0 L70 0 L26 48 Z"
            fill={COLORS.white}
            stroke={COLORS.blueDeep}
            strokeWidth={7}
            strokeLinejoin="round"
          />
          <rect x={10} y={-10} width={58} height={12} fill={COLORS.white} />
        </svg>
      </div>
    </div>
  );
};

/** Enchaîne les répliques d'une séquence dans la bulle de Victor. */
export const SpeechTrack: React.FC<{
  lines: CaptionLine[];
  anchor: Anchor;
  tail?: number;
}> = ({ lines, anchor, tail = 22 }) => (
  <>
    {lines.map((line) => (
      <Sequence
        key={`${line.from}-${line.text}`}
        from={line.from}
        durationInFrames={line.durationInFrames}
        layout="none"
      >
        <Bubble
          text={line.text}
          durationInFrames={line.durationInFrames}
          anchor={anchor}
          tail={tail}
        />
      </Sequence>
    ))}
  </>
);
