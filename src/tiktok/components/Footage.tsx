import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { C, FONT_TITLE } from "../theme";
import { FOOTAGE, type ShotId } from "../footage";

/**
 * Emplacement de rush : joue la prise de vue réelle si elle est renseignée
 * dans `footage.ts`, sinon l'animation de remplacement passée en `children`.
 * `startFrom` permet de caler le rush sur le plan.
 */
export const Footage: React.FC<{
  shot: ShotId;
  startFrom?: number;
  children: React.ReactNode;
}> = ({ shot, startFrom = 0, children }) => {
  const file = FOOTAGE[shot];

  if (!file) return <>{children}</>;

  return (
    <AbsoluteFill style={{ backgroundColor: C.navyDeep, overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(`footage/${file}`)}
        startFrom={startFrom}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

/** Repère visuel utilisable en pré-visualisation (non utilisé au montage). */
export const ShotSlate: React.FC<{ shot: ShotId; label: string }> = ({
  shot,
  label,
}) => (
  <div
    style={{
      position: "absolute",
      right: 48,
      top: 120,
      background: `${C.navy}CC`,
      color: C.white,
      borderRadius: 8,
      padding: "12px 20px",
      fontFamily: FONT_TITLE,
      fontSize: 30,
      fontWeight: 700,
    }}
  >
    {shot} · {label}
  </div>
);
