import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Logo } from "../components/Logo";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { SpeechTrack } from "../components/SpeechBubble";
import { GROUND, VICTOR_BOTTOM, VICTOR_H } from "../components/Stage";
import { SCRIPT } from "../content";
import { useSpringIn } from "../animations";

/** Séquence 1 — Victor arrive sur le chantier et se présente (0 → 8 s). */
export const Scene1Intro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const enter = useSpringIn(4, { damping: 15, mass: 0.9, stiffness: 90 });
  const left = interpolate(enter, [0, 1], [-620, 420]);

  const logoIn = useSpringIn(14, { damping: 13, mass: 0.7, stiffness: 110 });
  const logoOpacity = interpolate(frame, [160, 205], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 1180,
            top: 286,
            opacity: Math.min(1, logoIn * 1.4) * logoOpacity,
            transform: `scale(${interpolate(logoIn, [0, 1], [0.6, 1])})`,
            transformOrigin: "50% 50%",
          }}
        >
          <Logo size={228} showBaseline />
        </div>

        <Mascotte
          src="mascotte2.png"
          height={VICTOR_H}
          delay={4}
          wave
          bobPeriod={30}
          style={{ position: "absolute", left, bottom: VICTOR_BOTTOM }}
        />

        {/* Petite ombre au sol */}
        <div
          style={{
            position: "absolute",
            left: left + 60,
            top: GROUND - 18,
            width: 276,
            height: 34,
            borderRadius: "50%",
            background: "rgba(14, 58, 85, 0.18)",
            opacity: Math.min(1, enter * 2),
          }}
        />

        <SpeechTrack
          lines={SCRIPT.intro}
          anchor={{ left: 286, top: 108, width: 760 }}
          tail={46}
        />
      </AbsoluteFill>
    </Scene>
  );
};
