import { Image, Video } from "spacesvr";
import { Text } from "@react-three/drei";

const url = `https://d27rt3a60hh1lx.cloudfront.net/content/muse.place/nft`;

export default function BenNft() {
  return (
    <group>
      <Image
        rotation-y={(3 * Math.PI) / 2}
        position={[2.5, 1.25, 4.25]}
        scale={1}
        src={`${url}/pfp.png`}
        framed
      />
      <Text rotation-y={(3 * Math.PI) / 2} position={[2.5, 0.5, 4.25]}>
        0x8b873805b19d60e16a53cd30992fef01c007a746
      </Text>
      <Image
        rotation-y={2 * Math.PI}
        position={[-1.5, 1, -3]}
        scale={2}
        src={`${url}/dogenft.png`}
        framed
      />
      <Video
        rotation-y={Math.PI}
        position={[-1.5, 1, 11.5]}
        scale={2}
        src={`${url}/rabbithole.mp4`}
        framed
      />
    </group>
  );
}
