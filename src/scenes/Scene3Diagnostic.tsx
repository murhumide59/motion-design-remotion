import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
import { CaptionTrack } from "../components/Caption";
import { Mascotte } from "../components/Mascotte";
import { MoistureGauge } from "../components/MoistureGauge";
import { Scene } from "../components/Scene";
import { SceneHeader } from "../components/SceneHeader";
import { Wall, wallCardStyle } from "../components/Wall";
import { SCRIPT } from "../content";
import { bob, fadeUp, useSmoothSpring, useSpringIn } from "../animations";
import { SCENE_TITLES } from "../timeline";

const CHECKS = [
  "Relevé du taux d'humidité",
  "Nature de la maçonnerie",
  "Hauteur des remontées",
];

const Loupe: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <g transform="rotate(35 60 60)">
      <rect x={54} y={82} width={13} height={38} rx={6} fill={COLORS.blueDark} />
    </g>
    <circle cx={60} cy={54} r={40} fill={COLORS.white} opacity={0.22} />
    <circle
      cx={60}
      cy={54}
      r={40}
      fill="none"
      stroke={COLORS.blue}
      strokeWidth={9}
    />
    <path
      d="M34 36 a34 34 0 0 1 22 -12"
      fill="none"
      stroke={COLORS.white}
      strokeWidth={7}
      strokeLinecap="round"
      opacity={0.75}
    />
  </svg>
);

/** Séquence 3 — Le diagnostic (20 → 28 s). */
export const Scene3Diagnostic: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const gauge = useSmoothSpring(70, 90);
  const cardIn = useSpringIn(24, { damping: 16, mass: 0.7, stiffness: 110 });

  const scan = interpolate(frame, [40, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const loupeX = interpolate(scan, [0, 1], [1300, 1576]);
  const loupeY = 424 + bob(frame, 62, 24);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <SceneHeader index={3} title={SCENE_TITLES.diagnostic} />

        {/* Colonne centrale : check-list du diagnostic */}
        <div
          style={{
            position: "absolute",
            left: 636,
            top: 244,
            width: 548,
            background: COLORS.white,
            borderRadius: 28,
            boxShadow: SHADOW.card,
            padding: "34px 38px",
            opacity: Math.min(1, cardIn * 1.5),
            transform: `translateY(${interpolate(cardIn, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: COLORS.blue,
              marginBottom: 22,
            }}
          >
            Diagnostic sur place
          </div>
          {CHECKS.map((label, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: i === 0 ? 0 : 22,
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.ink,
                ...fadeUp(frame, 56 + i * 34, 18, 16),
              }}
            >
              <svg width={40} height={40} viewBox="0 0 40 40">
                <circle cx={20} cy={20} r={19} fill={COLORS.bluePale} />
                <path
                  d="M12 20.5 l6 6 l11 -13"
                  fill="none"
                  stroke={COLORS.blue}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {label}
            </div>
          ))}
        </div>

        <MoistureGauge
          value={interpolate(gauge, [0, 1], [12, 95])}
          size={240}
          style={{
            position: "absolute",
            left: 690,
            top: 560,
            width: 440,
            opacity: Math.min(1, gauge * 3),
          }}
        />

        {/* Mur ausculté + loupe */}
        <div style={{ ...wallCardStyle(620), left: 1226, top: 292 }}>
          <Wall
            uid="s3"
            width={620}
            dampLevel={0.78}
            arrows={0.55}
            mould={0.8}
            flaking={1}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: loupeX,
            top: loupeY,
            filter: "drop-shadow(0 12px 20px rgba(8,43,29,0.25))",
          }}
        >
          <Loupe size={190} />
        </div>

        <Mascotte
          height={430}
          delay={10}
          slideFrom={-80}
          style={{ position: "absolute", left: 190, bottom: 210 }}
        />

        <CaptionTrack lines={SCRIPT.diagnostic} />
      </AbsoluteFill>
    </Scene>
  );
};
