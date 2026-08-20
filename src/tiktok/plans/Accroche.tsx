import React from "react";
import { AbsoluteFill, Sequence, interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Captions } from "../components/Caption";
import { Footage } from "../components/Footage";
import { GlovedHand, PlasterSurface, Room } from "../components/Surfaces";
import { SUBS } from "../content";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Plan 3 du storyboard : macro, une main décolle un fragment d'enduit. */
const Macro: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 70], [1.02, 1.12], clamp);
  const reach = interpolate(frame, [4, 22], [0, 1], clamp);
  const pull = interpolate(frame, [26, 58], [0, 1], clamp);

  const handX = interpolate(reach, [0, 1], [1180, 690]) + pull * 210;
  const handY = interpolate(reach, [0, 1], [1180, 1010]) - pull * 90;

  return (
    <AbsoluteFill style={{ backgroundColor: "#E4D9C3", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <PlasterSurface damp={0.55} />
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
          {/* Le creux laissé par le fragment arraché */}
          {pull > 0.05 ? (
            <path
              d="M470 940 L666 906 L700 1064 L500 1102 Z"
              fill="#C6A87E"
              stroke="#9C7F58"
              strokeWidth={6}
              strokeLinejoin="round"
              opacity={Math.min(1, pull * 4)}
            />
          ) : null}

          {/* Le fragment, emporté par la main */}
          <g
            transform={`translate(${pull * 240} ${-pull * 70}) rotate(${pull * 26} 580 1000)`}
            opacity={1 - pull * 0.15}
          >
            <path
              d="M470 940 L666 906 L700 1064 L500 1102 Z"
              fill="#F1E7D4"
              stroke="#B5A187"
              strokeWidth={6}
              strokeLinejoin="round"
            />
          </g>

          {/* Poudre qui tombe */}
          {Array.from({ length: 26 }, (_, i) => {
            const start = 30 + random(`p${i}`) * 26;
            const p = interpolate(frame, [start, start + 40], [0, 1], clamp);
            if (p <= 0 || p >= 1) return null;
            return (
              <circle
                key={i}
                cx={480 + random(`px${i}`) * 230 + p * 40}
                cy={1030 + p * p * 620}
                r={4 + random(`pr${i}`) * 9}
                fill="#EFE6D4"
                opacity={(1 - p) * 0.95}
              />
            );
          })}

          <GlovedHand x={handX} y={handY} grip={pull} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Plan 2 du storyboard : plan large, plinthe qui se décolle. */
const Large: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 55], [1, 1.06], clamp);
  const decolle = interpolate(frame, [6, 42], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#E2D6C0", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Room decolle={decolle} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Séquence d'accroche 9:16 : on ouvre sur la macro (les 3 premières secondes
 * décident du scroll), puis coupe sur le plan large.
 */
export const Accroche: React.FC<{ duration: number }> = ({ duration }) => {
  const cut = 70;
  return (
    <AbsoluteFill style={{ backgroundColor: C.navyDeep }}>
      <Sequence durationInFrames={cut} layout="none">
        <Footage shot="B">
          <Macro />
        </Footage>
      </Sequence>
      <Sequence from={cut} durationInFrames={duration - cut} layout="none">
        <Footage shot="A">
          <Large />
        </Footage>
      </Sequence>
      <Captions subs={SUBS.accroche} />
    </AbsoluteFill>
  );
};
