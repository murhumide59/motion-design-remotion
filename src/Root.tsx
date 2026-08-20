import React from "react";
import { Composition } from "remotion";
import { MurhumideVideo } from "./MurhumideVideo";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./timeline";
import { TikTokVideo } from "./tiktok/TikTokVideo";
import {
  FPS as TK_FPS,
  HEIGHT as TK_HEIGHT,
  TOTAL as TK_TOTAL,
  WIDTH as TK_WIDTH,
} from "./tiktok/timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Écran de salon, 16:9 */}
      <Composition
        id="MurhumideVideo"
        component={MurhumideVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* TikTok / Reels, 9:16 */}
      <Composition
        id="MurhumideTikTok"
        component={TikTokVideo}
        durationInFrames={TK_TOTAL}
        fps={TK_FPS}
        width={TK_WIDTH}
        height={TK_HEIGHT}
      />
    </>
  );
};
