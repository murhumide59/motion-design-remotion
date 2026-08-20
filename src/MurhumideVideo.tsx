import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, FONT } from "./theme";
import { Set } from "./components/Set";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Constat } from "./scenes/Scene2Constat";
import { Scene3Percage } from "./scenes/Scene3Percage";
import { Scene4Injection } from "./scenes/Scene4Injection";
import { Scene5Resultat } from "./scenes/Scene5Resultat";
import { Scene6Cta } from "./scenes/Scene6Cta";
import {
  SCENE_DURATIONS,
  SCENE_OVERLAP,
  SCENE_ORDER,
  SCENE_START,
  SCENE_TITLES,
  type SceneId,
} from "./timeline";

const SCENE_COMPONENTS: Record<
  SceneId,
  React.FC<{ durationInFrames: number }>
> = {
  intro: Scene1Intro,
  constat: Scene2Constat,
  percage: Scene3Percage,
  injection: Scene4Injection,
  resultat: Scene5Resultat,
  cta: Scene6Cta,
};

/**
 * « Victor fait l'injection » — 1920x1080, 30 fps, 70 s.
 * Le décor (ciel, sol, mur) est rendu une fois pour toutes et évolue avec la
 * frame absolue ; chaque séquence n'ajoute que Victor, ses outils et son texte.
 */
export const MurhumideVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.offWhite, fontFamily: FONT }}>
      <Set />

      {SCENE_ORDER.map((id, i) => {
        const Component = SCENE_COMPONENTS[id];
        const isLast = i === SCENE_ORDER.length - 1;
        return (
          <Sequence
            key={id}
            name={`${i + 1} — ${SCENE_TITLES[id]}`}
            from={SCENE_START[id]}
            durationInFrames={
              SCENE_DURATIONS[id] + (isLast ? 0 : SCENE_OVERLAP)
            }
          >
            <Component durationInFrames={SCENE_DURATIONS[id]} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
