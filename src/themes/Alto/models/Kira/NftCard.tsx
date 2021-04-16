import CardModel from "./CardModel";
import { Image, Video, Interactable, useLimiter } from "spacesvr";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

type CardProps = {
  link?: string;
  mats: THREE.MeshBasicMaterial[];
  video?: string;
  image?: string;
  rotate?: boolean;
  float?: boolean;
  thin?: boolean;
} & JSX.IntrinsicElements["group"];

const NftCard = (props: CardProps) => {
  const { link, mats, video, image, rotate, float, thin } = props;

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
      {link && (
        <Interactable onClick={handleClick}>
          <mesh rotation-y={-Math.PI / 2 + 0.1}>
            <boxBufferGeometry args={[1.9, 2.5, 0.25]} />
            <meshBasicMaterial color="blue" opacity={0} transparent />
          </mesh>
        </Interactable>
      )}
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
        <CardModel mats={mats} />
      </group>
    </group>
  );
};

export default NftCard;
