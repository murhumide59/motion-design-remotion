import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SHADOW } from "../theme";
import { CaptionTrack } from "../components/Caption";
import { Logo } from "../components/Logo";
import { Mascotte } from "../components/Mascotte";
import { Scene } from "../components/Scene";
import { BRAND, SCRIPT } from "../content";
import { bob, fadeUp, useSpringIn } from "../animations";

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
        borderRadius: 24,
        boxShadow: SHADOW.card,
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        ...fadeUp(frame, delay, 20, 26),
      }}
    >
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: 18,
          background: COLORS.bluePale,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={34} height={34} viewBox="0 0 32 32">
          {ICONS[icon]}
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 20,
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
            marginTop: 4,
            fontSize: 30,
            fontWeight: 700,
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

/** Séquence 6 — Écran de fin / appel à l'action (60 → 70 s). */
export const Scene6Cta: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const logoIn = useSpringIn(2, { damping: 13, mass: 0.8, stiffness: 100 });
  const pulse = 1 + bob(frame, 96, 0.03);

  return (
    <Scene durationInFrames={durationInFrames}>
      <AbsoluteFill>
        {/* Halo derrière le logo */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 130,
            width: 760,
            height: 760,
            borderRadius: "50%",
            transform: `scale(${pulse})`,
            background: `radial-gradient(circle, ${COLORS.blueLight}30 0%, ${COLORS.blueLight}00 62%)`,
          }}
        />

        <div style={{ position: "absolute", left: 132, top: 196, width: 1200 }}>
          <div
            style={{
              opacity: Math.min(1, logoIn * 1.4),
              transform: `scale(${interpolate(logoIn, [0, 1], [0.72, 1])})`,
              transformOrigin: "0% 50%",
            }}
          >
            <Logo size={252} showBaseline />
          </div>

          <div
            style={{
              marginTop: 44,
              fontSize: 60,
              lineHeight: 1.16,
              fontWeight: 800,
              color: COLORS.ink,
              ...fadeUp(frame, 26, 22),
            }}
          >
            Une solution <span style={{ color: COLORS.blue }}>simple</span>,{" "}
            <span style={{ color: COLORS.blue }}>durable</span> et garantie.
          </div>

          <div
            style={{
              marginTop: 34,
              display: "inline-flex",
              alignItems: "center",
              gap: 18,
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueDark})`,
              color: COLORS.white,
              borderRadius: 999,
              padding: "20px 40px",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: 1.2,
              boxShadow: SHADOW.card,
              ...fadeUp(frame, 50, 22),
            }}
          >
            Diagnostic gratuit sur notre stand
          </div>

          <div style={{ display: "flex", gap: 22, marginTop: 40 }}>
            <ContactCard
              icon="phone"
              label="Téléphone"
              value={BRAND.phone}
              delay={76}
            />
            <ContactCard icon="web" label="Site" value={BRAND.site} delay={94} />
            <ContactCard
              icon="pin"
              label="Salon"
              value={BRAND.stand}
              delay={112}
            />
          </div>
        </div>

        <Mascotte
          height={560}
          delay={18}
          slideFrom={120}
          wave
          style={{ position: "absolute", left: 1440, bottom: 224 }}
        />

        <CaptionTrack lines={SCRIPT.cta} />
      </AbsoluteFill>
    </Scene>
  );
};
