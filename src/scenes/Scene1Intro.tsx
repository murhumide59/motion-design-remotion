import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
import { CaptionTrack } from "../components/Caption";
import { Logo } from "../components/Logo";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { MASCOTTE_NAME, SCRIPT } from "../content";
import { fadeUp, useSpringIn } from "../animations";

/** Séquence 1 — Intro (0 → 8 s) : mascotte + logo Murhumide. */
export const Scene1Intro: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const logoIn = useSpringIn(4, { damping: 13, mass: 0.8, stiffness: 100 });
  const logoScale = interpolate(logoIn, [0, 1], [0.7, 1]);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <Mascotte
          height={600}
          delay={12}
          slideFrom={-160}
          wave
          style={{ position: "absolute", left: 170, bottom: 246 }}
        />

        <div
          style={{
            position: "absolute",
            left: 900,
            right: 120,
            top: 186,
          }}
        >
          <div
            style={{
              opacity: Math.min(1, logoIn * 1.4),
              transform: `scale(${logoScale})`,
              transformOrigin: "0% 50%",
            }}
          >
            <Logo variant="full" size={232} />
          </div>

          <div
            style={{
              marginTop: 50,
              fontSize: 74,
              lineHeight: 1.14,
              fontWeight: 800,
              color: COLORS.ink,
              ...fadeUp(frame, 34, 24),
            }}
          >
            Les remontées capillaires,
            <br />
            <span style={{ color: COLORS.blue }}>expliquées simplement.</span>
          </div>

          <div
            style={{
              marginTop: 46,
              display: "inline-flex",
              alignItems: "center",
              gap: 18,
              background: COLORS.white,
              borderRadius: 999,
              padding: "18px 34px",
              boxShadow: SHADOW.soft,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.blueDark,
              ...fadeUp(frame, 58, 22),
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: COLORS.blue,
              }}
            />
            {`Avec ${MASCOTTE_NAME}, votre guide anti-humidité`}
          </div>
        </div>

        <CaptionTrack lines={SCRIPT.intro} />
      </AbsoluteFill>
    </Scene>
  );
};
