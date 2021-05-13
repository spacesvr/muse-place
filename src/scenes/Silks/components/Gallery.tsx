import { Image } from "spacesvr";
import { useMemo } from "react";
import { MeshStandardMaterial } from "three";
const SILKS_CONTENT_FOLDER =
  "https://d27rt3a60hh1lx.cloudfront.net/content/silksbyvp";

const SIZE = 1.5;

const Gallery = () => {
  const mat = useMemo(() => new MeshStandardMaterial({ color: "black" }), []);

  return (
    <group name="gallery">
      <group
        name="back-wall"
        rotation-y={Math.PI}
        position={[0, SIZE * 0.75, 5.18]}
      >
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/yellow-green-durag.jpg`}
          size={SIZE}
          framed
          position-x={-3.5}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/racks.jpg`}
          size={SIZE}
          framed
          position-x={-1}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/acne.jpg`}
          size={SIZE}
          framed
          position-x={1}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/tough.jpg`}
          size={SIZE}
          framed
          position-x={3}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/eyes.jpg`}
          size={SIZE}
          framed
          position-x={5}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/camo.jpg`}
          size={SIZE}
          framed
          position-x={7.5}
        />
      </group>
      <group name="front-wall" position={[0, SIZE * 0.75, 1.05]}>
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/pink.jpg`}
          size={SIZE}
          framed
          position-x={-8.5}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/sleep.jpg`}
          size={SIZE}
          framed
          position-x={-5}
        />
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/gold.jpg`}
          size={SIZE}
          framed
          position-x={2.75}
        />
      </group>
      <group
        name="left-wall"
        position={[5.04, SIZE * 0.75, 3.15]}
        rotation-y={-Math.PI / 2}
      >
        <Image
          frameMaterial={mat}
          src={`${SILKS_CONTENT_FOLDER}/gallery/vp.jpg`}
          size={SIZE}
          framed
        />
      </group>
      <group
        name="right-wall"
        position={[-10.68, SIZE * 0.75, 3.15]}
        rotation-y={Math.PI / 2}
      />
    </group>
  );
};

export default Gallery;
