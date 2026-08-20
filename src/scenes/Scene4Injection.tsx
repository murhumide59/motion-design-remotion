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
import { InjectionGun } from "../components/Tools";
import { ImpactStar, Onomatopee } from "../components/Effects";
import { SCRIPT } from "../content";
import { SCENE_START } from "../timeline";
import { INJECT_FROM, INJECT_TO, barrierAt } from "../wallState";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** La pointe de la bulle reste pointée vers Victor. */
const tailTowards = (left: number, anchorLeft: number, width: number) =>
  Math.max(10, Math.min(90, ((left + VICTOR_W / 2 - anchorLeft) / width) * 100));


const holeFrame = (i: number) =>
  INJECT_FROM - SCENE_START.injection + ((INJECT_TO - INJECT_FROM) * i) / 12;

/** Séquence 4 — Victor injecte la crème hydrofuge trou par trou (32 → 50 s). */
export const Scene4Injection: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const abs = SCENE_START.injection + frame;

  const injecting = barrierAt(abs);
  const startLocal = INJECT_FROM - SCENE_START.injection;

  const approach = interpolate(frame, [0, startLocal], [0, 1], clamp);
  const toolX = interpolate(injecting, [0, 1], [holeScreenX(0), holeScreenX(12)]);
  const left =
    interpolate(
      approach,
      [0, 1],
      [victorLeftFor(holeScreenX(12)), victorLeftFor(holeScreenX(0))],
      clamp,
    ) +
    (victorLeftFor(toolX) - victorLeftFor(holeScreenX(0)));

  const walking = frame < startLocal || (injecting > 0 && injecting < 1);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <Mascotte
          src="mascotte2.png"
          height={VICTOR_H}
          delay={0}
          bobPeriod={walking ? 26 : 84}
          bobAmount={walking ? 9 : 7}
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
          {/* Petite gerbe bleue à chaque trou injecté */}
          {Array.from({ length: 13 }, (_, i) => {
            const f = holeFrame(i);
            const p = interpolate(frame, [f, f + 30], [0, 1], clamp);
            return (
              <ImpactStar
                key={i}
                x={holeScreenX(i)}
                y={JOINT}
                progress={p}
                color={COLORS.blueLight}
              />
            );
          })}

          {frame > startLocal - 20 ? (
            <>
              <InjectionGun
                x={toolX}
                y={JOINT}
                angle={TOOL_ANGLE}
                shake={injecting < 1 ? 1 : 0}
                frame={frame}
                scale={1.02}
              />
              {injecting < 1 ? (
                <g opacity={0.9}>
                  <circle cx={toolX - 6} cy={JOINT - 14} r={9} fill={COLORS.blueLight} />
                  <circle cx={toolX - 22} cy={JOINT - 34} r={6} fill={COLORS.blueLight} opacity={0.7} />
                </g>
              ) : null}
            </>
          ) : null}

          <Onomatopee
            text="PSCHHH !"
            x={toolX + 300}
            y={JOINT - 200}
            progress={interpolate(frame, [startLocal + 6, startLocal + 86], [0, 1], clamp)}
            color={COLORS.blue}
            rotate={-8}
          />
        </svg>

        <Callout
          text="Crème hydrofuge"
          accent={COLORS.blue}
          delay={136}
          rotate={-2}
          fontSize={32}
          style={{ left: 96, top: 392 }}
        />
        <Callout
          text="Barrière étanche horizontale"
          accent={COLORS.blue}
          delay={318}
          rotate={2}
          fontSize={32}
          style={{ left: 108, top: 512 }}
        />
        <Callout
          text="Même sur murs très humides !"
          accent={COLORS.orange}
          delay={430}
          rotate={-2}
          fontSize={32}
          style={{ left: 96, top: 632 }}
        />

        <SpeechTrack
          lines={SCRIPT.injection}
          anchor={{ left: 76, top: 74, width: 780 }}
          tail={tailTowards(left, 76, 780)}
        />
      </AbsoluteFill>
    </Scene>
  );
};
