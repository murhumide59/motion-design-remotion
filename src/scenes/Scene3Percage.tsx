import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { Callout } from "../components/Callout";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { SpeechTrack } from "../components/SpeechBubble";
import {
  GROUND,
  JOINT,
  TOOL_ANGLE,
  VICTOR_BOTTOM,
  VICTOR_H,
  VICTOR_W,
  holeScreenX,
  victorLeftFor,
} from "../components/Stage";
import { Drill, TapeMeasure } from "../components/Tools";
import { DustPuff, ImpactStar, Onomatopee } from "../components/Effects";
import { SCRIPT } from "../content";
import { SCENE_START } from "../timeline";
import { DRILL_FROM, DRILL_TO, holesAt } from "../wallState";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** La pointe de la bulle reste pointée vers Victor. */
const tailTowards = (left: number, anchorLeft: number, width: number) =>
  Math.max(10, Math.min(90, ((left + VICTOR_W / 2 - anchorLeft) / width) * 100));


/** Frame (locale) à laquelle le trou n° i est percé. */
const holeFrame = (i: number) =>
  DRILL_FROM - SCENE_START.percage + ((DRILL_TO - DRILL_FROM) * i) / 12;

/** Séquence 3 — Victor perce le joint tous les 10 cm (18 → 32 s). */
export const Scene3Percage: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const abs = SCENE_START.percage + frame;

  const drilling = holesAt(abs);
  const startLocal = DRILL_FROM - SCENE_START.percage;

  /* Victor rejoint le premier trou, puis avance au rythme du perçage. */
  const approach = interpolate(frame, [0, startLocal], [0, 1], clamp);
  const toolX = interpolate(
    drilling,
    [0, 1],
    [holeScreenX(0), holeScreenX(12)],
  );
  const left = interpolate(
    approach,
    [0, 1],
    [686, victorLeftFor(holeScreenX(0))],
  ) + (victorLeftFor(toolX) - victorLeftFor(holeScreenX(0)));

  const active = frame > startLocal - 6 && drilling < 1;
  const walking = frame < startLocal || (drilling > 0 && drilling < 1);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <Mascotte
          src="mascotte2.png"
          height={VICTOR_H}
          delay={0}
          bobPeriod={walking ? 24 : 84}
          bobAmount={walking ? 10 : 7}
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
          {/* Poussière et étoiles à chaque trou percé */}
          {Array.from({ length: 13 }, (_, i) => {
            const f = holeFrame(i);
            const p = interpolate(frame, [f, f + 26], [0, 1], clamp);
            return (
              <g key={i}>
                <DustPuff x={holeScreenX(i)} y={JOINT} progress={p} />
                <ImpactStar x={holeScreenX(i)} y={JOINT} progress={p} />
              </g>
            );
          })}

          {frame > startLocal - 14 ? (
            <Drill
              x={toolX}
              y={JOINT}
              angle={TOOL_ANGLE}
              shake={active ? 1 : 0}
              frame={frame}
              scale={1.02}
            />
          ) : null}

          <Onomatopee
            text="BZZZ !"
            x={toolX + 250}
            y={JOINT - 190}
            progress={interpolate(frame, [startLocal + 4, startLocal + 76], [0, 1], clamp)}
            rotate={-9}
          />
          <Onomatopee
            text="BZZZ !"
            x={toolX + 230}
            y={JOINT - 220}
            progress={interpolate(frame, [232, 300], [0, 1], clamp)}
            color={COLORS.blue}
            rotate={7}
          />

          <TapeMeasure
            x1={holeScreenX(10)}
            x2={holeScreenX(11)}
            y={JOINT - 118}
            label="10 cm"
            progress={interpolate(frame, [112, 148, 268, 284], [0, 1, 1, 0], clamp)}
          />
        </svg>

        <Callout
          text="Dans le joint de ciment"
          accent={COLORS.blue}
          delay={168}
          rotate={-2}
          fontSize={32}
          style={{ left: 96, top: 392 }}
        />
        <Callout
          text="Ø 12 mm, pas plus"
          accent={COLORS.orange}
          delay={302}
          rotate={2}
          fontSize={32}
          style={{ left: 128, top: 520 }}
        />

        <SpeechTrack
          lines={SCRIPT.percage}
          anchor={{ left: 76, top: 74, width: 780 }}
          tail={tailTowards(left, 76, 780)}
        />
      </AbsoluteFill>
    </Scene>
  );
};
