import { Video } from "spacesvr";

const CONTENT_URL = `https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp`;
const VIDEO_URL = `https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp/video.mp4`;
const VIDEO_SCALE = 2.25;
const SAKTE_VIDEO_SCALE = 1.25;

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
        size={SAKTE_VIDEO_SCALE}
        position={[-10.65, 1.075, -2.85]}
        rotation-y={Math.PI / 2}
      />
      <Video
        src={`${CONTENT_URL}/skate2.mp4`}
        muted
        size={SAKTE_VIDEO_SCALE}
        position={[-10.65, 1.075, -1.45]}
        rotation-y={Math.PI / 2}
      />
    </>
  );
};

export default MusicVideo;
