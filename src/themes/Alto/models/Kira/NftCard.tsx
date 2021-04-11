import Model from "./CardModel";
import { Image, Video, Interactable, useLimiter } from "spacesvr";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";

type CardProps = {
  link: string;
  video?: string;
  image?: string;
  rotate?: boolean;
  float?: boolean;
  thin?: boolean;
} & JSX.IntrinsicElements["group"];

const NftCard = (props: CardProps) => {
  const { link, video, image, rotate, float, thin } = props;

  const group = useRef<THREE.Group>();

  const handleClick = () => window.open(link, "_blank");

  const limiter = useLimiter(45);
  useFrame(({ clock }) => {
    if (!group.current || !limiter.isReady(clock)) return;
    if (rotate) {
      group.current.rotation.y = clock.getElapsedTime() / 10;
    }
    if (float) {
      group.current.position.y = Math.sin(clock.getElapsedTime()) / 5;
    }
  });

  return (
    <group {...props} ref={group}>
      <Interactable onClick={handleClick}>
        <group scale={[1.25, 1.25, 1.25]}>
          {video && (
            <Video
              src={video}
              rotation-y={-Math.PI / 2 + 0.05}
              position={[-0.05, 0, 0]}
              scale={thin ? [1.3, 1.3, 1.3] : [1.5, 1.5, 1.5]}
              muted
            />
          )}
          {image && (
            <Image
              src={image}
              rotation-y={-Math.PI / 2 + 0.05}
              position={[-0.05, 0, 0]}
              scale={thin ? [1.3, 1.3, 1.3] : [1.5, 1.5, 1.5]}
            />
          )}
          <Model />
        </group>
      </Interactable>
    </group>
  );
};

export default NftCard;
