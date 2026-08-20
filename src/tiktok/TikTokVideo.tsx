import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { C, FONT_BODY } from "./theme";
import { DURATION, PLANS, START, type PlanId } from "./timeline";
import { Accroche } from "./plans/Accroche";
import { Diagnostic } from "./plans/Diagnostic";
import { Etape1, Etape2, Etape3, Etape4, Etape5, Etape6 } from "./plans/Etapes";
import { Barriere } from "./plans/Barriere";
import { Signature } from "./plans/Signature";

const PLAN_COMPONENTS: Record<PlanId, React.FC<{ duration: number }>> = {
  accroche: Accroche,
  diagnostic: Diagnostic,
  etape1: Etape1,
  etape2: Etape2,
  etape3: Etape3,
  etape4: Etape4,
  etape5: Etape5,
  barriere: Barriere,
  etape6: Etape6,
  signature: Signature,
};

/**
 * Version verticale du storyboard « Stopper l'humidité montante ».
 * 1080x1920, 25 fps, 45 s, montage cut sec — pensée pour TikTok / Reels :
 * accroche en macro dès la frame 0, sous-titres remontés hors de l'interface,
 * et compréhension totale sans le son.
 */
export const TikTokVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.navyDeep, fontFamily: FONT_BODY }}>
    {PLANS.map((p) => {
      const Component = PLAN_COMPONENTS[p.id];
      return (
        <Sequence
          key={p.id}
          name={p.title}
          from={START[p.id]}
          durationInFrames={DURATION[p.id]}
        >
          <Component duration={DURATION[p.id]} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
