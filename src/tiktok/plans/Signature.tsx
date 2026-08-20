import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_TITLE } from "../theme";
import { SIGNATURE } from "../content";
import { Logo } from "../../components/Logo";
import { Mascotte } from "../../components/Mascotte";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Plan 13 — signature : logo, promesse, pastilles, site. */
export const Signature: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, durationInFrames: 18, config: { damping: 14, mass: 0.6, stiffness: 120 } });
  const victorIn = spring({ frame, fps, delay: 8, durationInFrames: 22, config: { damping: 15, mass: 0.8, stiffness: 100 } });
  const victorX = interpolate(victorIn, [0, 1], [-520, 46]);

  /* Dernière frame : logo seul sur fond navy, tenue 12 frames. */
  const clearOut = interpolate(frame, [duration - 14, duration - 6], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: C.navy }}>
      {/* Halo orange */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 260,
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.orange}33 0%, ${C.orange}00 62%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 230,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, logoIn * 1.4),
          transform: `scale(${interpolate(logoIn, [0, 1], [0.7, 1])})`,
        }}
      >
        <Logo size={300} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 700,
          textAlign: "center",
          fontFamily: FONT_TITLE,
          fontSize: 92,
          fontWeight: 800,
          color: C.white,
          opacity: interpolate(frame, [12, 24], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [12, 26], [22, 0], clamp)}px)`,
        }}
      >
        {SIGNATURE.title}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 850,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: clearOut,
        }}
      >
        {SIGNATURE.pastilles.map((p, i) => {
          const pop = spring({
            frame,
            fps,
            delay: 26 + i * 6,
            durationInFrames: 14,
            config: { damping: 13, mass: 0.5, stiffness: 150 },
          });
          return (
            <div
              key={p}
              style={{
                background: C.orange,
                color: C.white,
                borderRadius: 999,
                padding: "18px 44px",
                fontFamily: FONT_TITLE,
                fontSize: 50,
                fontWeight: 700,
                transform: `scale(${pop})`,
              }}
            >
              {p}
            </div>
          );
        })}
      </div>

      <Mascotte
        height={620}
        delay={8}
        wave
        style={{
          position: "absolute",
          left: victorX,
          bottom: 120,
          opacity: clearOut,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 120,
          textAlign: "center",
          fontFamily: FONT_TITLE,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: 4,
          color: C.white,
          opacity: interpolate(frame, [44, 58], [0, 1], clamp) * clearOut,
        }}
      >
        {SIGNATURE.site}
      </div>
    </AbsoluteFill>
  );
};
