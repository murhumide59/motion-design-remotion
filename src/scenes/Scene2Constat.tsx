import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { Callout } from "../components/Callout";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { SpeechTrack } from "../components/SpeechBubble";
import {
  GROUND,
  VICTOR_BOTTOM,
  VICTOR_H,
  VICTOR_W,
  handAt,
} from "../components/Stage";
import { IdeaBulb, DustPuff, Onomatopee, Worry } from "../components/Effects";
import { SCRIPT } from "../content";
import { useSmoothSpring } from "../animations";

const START_LEFT = 420;

/** La pointe de la bulle reste pointée vers Victor. */
const tailTowards = (left: number, anchorLeft: number, width: number) =>
  Math.max(10, Math.min(90, ((left + VICTOR_W / 2 - anchorLeft) / width) * 100));

const TOUCH_LEFT = 686;

/** Séquence 2 — Victor s'approche, touche le mur et fait le constat (8 → 18 s). */
export const Scene2Constat: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  const walk = useSmoothSpring(8, 76);
  const left = interpolate(walk, [0, 1], [START_LEFT, TOUCH_LEFT]);
  const hand = handAt(left);
  const walking = walk > 0.02 && walk < 0.98;

  /* Au contact, un morceau de plâtre se détache. */
  const crack = interpolate(frame, [88, 150], [0, 1], clamp);
  const worry = interpolate(frame, [96, 118, 196, 214], [0, 1, 1, 0], clamp);
  const idea = interpolate(frame, [224, 250], [0, 1], clamp);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <Mascotte
          src="mascotte2.png"
          height={VICTOR_H}
          delay={0}
          bobPeriod={walking ? 26 : 84}
          bobAmount={walking ? 11 : 7}
          style={{ position: "absolute", left, bottom: VICTOR_BOTTOM }}
        />
        <div
          style={{
            position: "absolute",
            left: left + 70,
            top: GROUND - 18,
            width: 340,
            height: 36,
            borderRadius: "50%",
            background: "rgba(14, 58, 85, 0.18)",
          }}
        />

        <svg
          width={1920}
          height={1080}
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {/* Écaille de plâtre qui se détache sous sa main */}
          {crack > 0 && crack < 1 ? (
            <g
              transform={`translate(${hand.x + 18} ${hand.y + 26}) translate(${crack * 26} ${crack * crack * 300}) rotate(${crack * 72})`}
              opacity={1 - crack * 0.9}
            >
              <path
                d="M0 0 L74 -12 L86 54 L14 66 Z"
                fill="#EDE4D3"
                stroke={COLORS.brickEdge}
                strokeWidth={5}
                strokeLinejoin="round"
              />
            </g>
          ) : null}
          <DustPuff x={hand.x + 40} y={hand.y + 40} progress={interpolate(frame, [88, 126], [0, 1], clamp)} />
          <Onomatopee
            text="CRAC !"
            x={hand.x + 210}
            y={hand.y - 40}
            progress={interpolate(frame, [86, 156], [0, 1], clamp)}
            rotate={-10}
          />
          <Worry x={left + 330} y={GROUND - VICTOR_H - 26} progress={worry} />
          <IdeaBulb x={left + 250} y={GROUND - VICTOR_H - 74} progress={idea} />
        </svg>

        <Callout
          text="Le plâtre se détache"
          accent={COLORS.orange}
          delay={112}
          rotate={-2.5}
          fontSize={34}
          style={{ left: 1180, top: 258 }}
        />
        <Callout
          text="Moisissures"
          accent={COLORS.mould}
          delay={158}
          rotate={2}
          fontSize={34}
          style={{ left: 1520, top: 404 }}
        />

        <SpeechTrack
          lines={SCRIPT.constat}
          anchor={{ left: 76, top: 74, width: 780 }}
          tail={tailTowards(left, 76, 780)}
        />
      </AbsoluteFill>
    </Scene>
  );
};
