import { Video } from "spacesvr";
import { Text } from "@react-three/drei";

const CONTENT_URL = `https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp`;
const VIDEO_URL = `https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp/video.mp4`;
const VIDEO_SCALE = 2.25;
const SKATE_VIDEO_SCALE = 1.1;

const MusicVideo = () => {
  return (
    <>
      <Video
        src={VIDEO_URL}
        size={VIDEO_SCALE}
        position={[-10.68, VIDEO_SCALE * 0.5, 3.15]}
        framed
        rotation-y={Math.PI / 2}
      />
      <Video
        src={`${CONTENT_URL}/skate1.mp4`}
        muted
        size={SKATE_VIDEO_SCALE}
        position={[-10.65, 1.15, -2.65]}
        rotation-y={Math.PI / 2}
      />
      <Video
        src={`${CONTENT_URL}/skate2.mp4`}
        muted
        size={SKATE_VIDEO_SCALE}
        position={[-10.65, 1.15, -1.65]}
        rotation-y={Math.PI / 2}
      />
      {/* @ts-ignore */}
      <Text
        position={[-10.65, 0.475, -2.15]}
        rotation-y={Math.PI / 2}
        textAlign="center"
        anchorX="center"
      >
        Pro Skater Ishod Wair
      </Text>
    </>
  );
};

export default MusicVideo;
