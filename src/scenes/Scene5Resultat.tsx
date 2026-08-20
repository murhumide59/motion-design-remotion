import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
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
  sx,
  sy,
  victorLeftFor,
} from "../components/Stage";
import { Trowel } from "../components/Tools";
import { Onomatopee, Sparkles } from "../components/Effects";
import { SCRIPT } from "../content";
import { SCENE_START } from "../timeline";
import { PATCH_FROM, PATCH_TO, patchAt } from "../wallState";
import { bob, useSpringIn } from "../animations";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ADMIRE_LEFT = 286;

/** La pointe de la bulle reste pointée vers Victor. */
const tailTowards = (left: number, anchorLeft: number, width: number) =>
  Math.max(10, Math.min(90, ((left + VICTOR_W / 2 - anchorLeft) / width) * 100));

/** Séquence 5 — Victor rebouche, recule et admire le mur qui sèche (50 → 60 s). */
export const Scene5Resultat: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const abs = SCENE_START.resultat + frame;

  const patch = patchAt(abs);
  const patchEnd = PATCH_TO - SCENE_START.resultat;

  /* Il rebouche de droite à gauche, puis recule pour admirer. */
  const toolX = interpolate(patch, [0, 1], [holeScreenX(12), holeScreenX(0)]);
  const stepBack = interpolate(frame, [patchEnd, patchEnd + 64], [0, 1], clamp);
  const left = interpolate(
    stepBack,
    [0, 1],
    [victorLeftFor(toolX), ADMIRE_LEFT],
    clamp,
  );

  const patching = frame > PATCH_FROM - SCENE_START.resultat && patch < 1;
  const badge = useSpringIn(196, { damping: 11, mass: 0.6, stiffness: 130 });

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <Mascotte
          src="mascotte2.png"
          height={VICTOR_H}
          delay={0}
          wave={stepBack > 0.9}
          bobPeriod={patching || stepBack < 0.98 ? 26 : 84}
          bobAmount={patching ? 9 : 7}
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
          {patching ? (
            <Trowel x={toolX} y={JOINT} angle={TOOL_ANGLE} scale={1} />
          ) : null}

          <Sparkles
            seed="dry"
            count={16}
            box={{ x: sx(210), y: sy(40), w: sx(750) - sx(210), h: sy(430) - sy(40) }}
            frame={frame}
            from={110}
          />

          <Onomatopee
            text="TADAAM !"
            x={1420}
            y={300}
            progress={interpolate(frame, [150, 236], [0, 1], clamp)}
            color={COLORS.orange}
            rotate={-7}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 1300,
            top: 452,
            opacity: Math.min(1, badge * 1.5),
            transform: `scale(${interpolate(badge, [0, 1], [0.5, 1])}) rotate(${bob(frame, 90, 1.6)}deg)`,
            background: `linear-gradient(140deg, ${COLORS.blue}, ${COLORS.blueDark})`,
            color: COLORS.white,
            border: `6px solid ${COLORS.blueDeep}`,
            borderRadius: 34,
            padding: "26px 44px",
            boxShadow: SHADOW.card,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 58, fontWeight: 900 }}>Mur sain</div>
          <div style={{ marginTop: 6, fontSize: 31, fontWeight: 700, opacity: 0.94 }}>
            et durablement sec
          </div>
        </div>

        <SpeechTrack
          lines={SCRIPT.resultat}
          anchor={{ left: 76, top: 74, width: 780 }}
          tail={tailTowards(left, 76, 780)}
        />
      </AbsoluteFill>
    </Scene>
  );
};
