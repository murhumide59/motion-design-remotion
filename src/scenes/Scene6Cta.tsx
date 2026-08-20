import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
import { Logo } from "../components/Logo";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { SpeechTrack } from "../components/SpeechBubble";
import { GROUND, VICTOR_BOTTOM } from "../components/Stage";
import { BRAND, SCRIPT } from "../content";
import { fadeUp, useSpringIn } from "../animations";

const ICONS: Record<string, React.ReactNode> = {
  phone: (
    <path
      d="M7 4 h6 l3 7 l-4 2 a14 14 0 0 0 7 7 l2 -4 l7 3 v6 a3 3 0 0 1 -3 3 A22 22 0 0 1 4 7 a3 3 0 0 1 3 -3 Z"
      fill={COLORS.blue}
    />
  ),
  web: (
    <g fill="none" stroke={COLORS.blue} strokeWidth={2.8}>
      <circle cx={16} cy={16} r={12} />
      <ellipse cx={16} cy={16} rx={5} ry={12} />
      <line x1={4} y1={16} x2={28} y2={16} />
    </g>
  ),
  pin: (
    <path
      d="M16 3 a10 10 0 0 1 10 10 c0 7 -10 16 -10 16 S6 20 6 13 A10 10 0 0 1 16 3 Z M16 9 a4 4 0 1 0 0 8 a4 4 0 0 0 0 -8 Z"
      fill={COLORS.blue}
    />
  ),
};

const ContactCard: React.FC<{
  icon: keyof typeof ICONS;
  label: string;
  value: string;
  delay: number;
}> = ({ icon, label, value, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        flex: 1,
        background: COLORS.white,
        border: `5px solid ${COLORS.blueDeep}`,
        borderRadius: 26,
        boxShadow: SHADOW.soft,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        ...fadeUp(frame, delay, 20, 26),
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          background: COLORS.bluePale,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={32} height={32} viewBox="0 0 32 32">
          {ICONS[icon]}
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: COLORS.inkSoft,
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: 3,
            fontSize: 29,
            fontWeight: 800,
            color: COLORS.ink,
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

/** Séquence 6 — Victor salue devant le logo (60 → 70 s). */
export const Scene6Cta: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const logoIn = useSpringIn(2, { damping: 13, mass: 0.8, stiffness: 100 });

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <AbsoluteFill style={{ background: "rgba(255,255,255,0.55)" }} />

        <div style={{ position: "absolute", left: 148, top: 168, width: 1150 }}>
          <div
            style={{
              opacity: Math.min(1, logoIn * 1.4),
              transform: `scale(${interpolate(logoIn, [0, 1], [0.7, 1])})`,
              transformOrigin: "0% 50%",
            }}
          >
            <Logo size={244} showBaseline />
          </div>

          <div
            style={{
              marginTop: 34,
              display: "inline-flex",
              alignItems: "center",
              gap: 18,
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueDark})`,
              color: COLORS.white,
              border: `6px solid ${COLORS.blueDeep}`,
              borderRadius: 999,
              padding: "18px 40px",
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: 1,
              boxShadow: SHADOW.card,
              ...fadeUp(frame, 40, 22),
            }}
          >
            Diagnostic gratuit sur notre stand
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
            <ContactCard icon="phone" label="Téléphone" value={BRAND.phone} delay={70} />
            <ContactCard icon="web" label="Site" value={BRAND.site} delay={88} />
            <ContactCard icon="pin" label="Salon" value={BRAND.stand} delay={106} />
          </div>
        </div>

        <Mascotte
          height={560}
          delay={12}
          slideFrom={120}
          wave
          style={{ position: "absolute", left: 1450, bottom: VICTOR_BOTTOM }}
        />
        <div
          style={{
            position: "absolute",
            left: 1502,
            top: GROUND - 18,
            width: 260,
            height: 34,
            borderRadius: "50%",
            background: "rgba(14, 58, 85, 0.16)",
          }}
        />

        <SpeechTrack
          lines={SCRIPT.cta}
          anchor={{ left: 872, top: 62, width: 700 }}
          tail={82}
        />
      </AbsoluteFill>
    </Scene>
  );
};
