import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
import { CaptionTrack } from "../components/Caption";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { SceneHeader } from "../components/SceneHeader";
import { VIEW, Wall, wallCardStyle } from "../components/Wall";
import { SCRIPT } from "../content";
import { bob, fadeUp, useSpringIn } from "../animations";
import { SCENE_TITLES } from "../timeline";

const WALL_LEFT = 510;
const WALL_TOP = 190;
const WALL_WIDTH = 900;
const WALL_HEIGHT = (WALL_WIDTH * VIEW.h) / VIEW.w;

const RESULTS = [
  "Barrière étanche active",
  "Trous rebouchés",
  "Le mur sèche et s'assainit",
];

const SPARKLES = Array.from({ length: 14 }, (_, i) => ({
  x: 60 + random(`sx${i}`) * (WALL_WIDTH - 120),
  y: 40 + random(`sy${i}`) * (WALL_HEIGHT - 220),
  s: 10 + random(`ss${i}`) * 16,
  delay: random(`sd${i}`) * 60,
}));

const Pill: React.FC<{
  text: string;
  opacity: number;
  style?: React.CSSProperties;
}> = ({ text, opacity, style }) => (
  <div
    style={{
      position: "absolute",
      opacity,
      background: COLORS.white,
      borderRadius: 999,
      padding: "12px 28px",
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: 3,
      color: COLORS.ink,
      boxShadow: SHADOW.soft,
      ...style,
    }}
  >
    {text}
  </div>
);

/** Séquence 5 — Le résultat (50 → 60 s) : balayage humide → mur sain. */
export const Scene5Resultat: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  const wipe = interpolate(frame, [40, 185], [0, 1], clamp);
  const badge = useSpringIn(200, { damping: 12, mass: 0.7, stiffness: 120 });
  const lineOpacity = interpolate(frame, [36, 46, 178, 192], [0, 1, 1, 0], clamp);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <SceneHeader index={5} title={SCENE_TITLES.resultat} />

        <div
          style={{
            ...wallCardStyle(WALL_WIDTH),
            left: WALL_LEFT,
            top: WALL_TOP,
          }}
        >
          {/* État « avant » : mur encore humide */}
          <Wall
            uid="s5-wet"
            width={WALL_WIDTH}
            dampLevel={0.78}
            mould={0.6}
            flaking={1}
            holes={1}
            barrier={1}
            style={{ position: "absolute", left: 0, top: 0 }}
          />

          {/* État « après » : révélé par un balayage horizontal */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: WALL_WIDTH,
              height: WALL_HEIGHT,
              clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`,
            }}
          >
            <Wall
              uid="s5-dry"
              width={WALL_WIDTH}
              dampLevel={0.08}
              dampOpacity={0.5}
              mould={0}
              flaking={0}
              holes={1}
              patched
              barrier={1}
              clean={1}
            />
            {/* Étincelles de « mur sain » */}
            {SPARKLES.map((s, i) => {
              const o = interpolate(
                frame,
                [70 + s.delay, 92 + s.delay, 150 + s.delay, 176 + s.delay],
                [0, 1, 1, 0],
                clamp,
              );
              return (
                <svg
                  key={i}
                  width={s.s * 2}
                  height={s.s * 2}
                  viewBox="0 0 24 24"
                  style={{
                    position: "absolute",
                    left: s.x,
                    top: s.y,
                    opacity: o * 0.9,
                  }}
                >
                  <path
                    d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z"
                    fill={COLORS.barrierGlow}
                  />
                </svg>
              );
            })}
          </div>

          {/* Ligne de balayage */}
          <div
            style={{
              position: "absolute",
              left: wipe * WALL_WIDTH - 4,
              top: 0,
              width: 8,
              height: WALL_HEIGHT,
              opacity: lineOpacity,
              borderRadius: 4,
              background: `linear-gradient(180deg, ${COLORS.greenLight}, ${COLORS.green})`,
              boxShadow: `0 0 34px ${COLORS.barrierGlow}, 0 0 12px ${COLORS.green}`,
            }}
          />

          <Pill
            text="AVANT"
            opacity={Math.min(1, (1 - wipe) * 2.4)}
            style={{ left: 30, top: 30 }}
          />
          <Pill
            text="APRÈS"
            opacity={Math.min(1, wipe * 2.2)}
            style={{ right: 30, top: 30 }}
          />
        </div>

        {/* Récapitulatif à gauche */}
        <div style={{ position: "absolute", left: 96, top: 300, width: 390 }}>
          {RESULTS.map((label, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 26,
                background: COLORS.white,
                borderRadius: 20,
                boxShadow: SHADOW.soft,
                padding: "20px 24px",
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.25,
                color: COLORS.ink,
                ...fadeUp(frame, 60 + i * 40, 20, 22),
              }}
            >
              <svg width={36} height={36} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
                <circle cx={20} cy={20} r={19} fill={COLORS.green} />
                <path
                  d="M12 20.5 l6 6 l11 -13"
                  fill="none"
                  stroke={COLORS.white}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {label}
            </div>
          ))}
        </div>

        {/* Badge final */}
        <div
          style={{
            position: "absolute",
            left: 1452,
            top: 268,
            opacity: Math.min(1, badge * 1.5),
            transform: `scale(${interpolate(badge, [0, 1], [0.6, 1])}) rotate(${bob(frame, 90, 1.4)}deg)`,
            background: `linear-gradient(140deg, ${COLORS.green}, ${COLORS.greenDark})`,
            color: COLORS.white,
            borderRadius: 26,
            padding: "24px 34px",
            boxShadow: SHADOW.card,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 800 }}>Mur sain</div>
          <div style={{ marginTop: 6, fontSize: 26, fontWeight: 600, opacity: 0.9 }}>
            et durablement sec
          </div>
        </div>

        <Mascotte
          height={360}
          delay={16}
          slideFrom={70}
          wave
          style={{ position: "absolute", left: 1520, bottom: 210 }}
        />

        <CaptionTrack lines={SCRIPT.resultat} />
      </AbsoluteFill>
    </Scene>
  );
};
