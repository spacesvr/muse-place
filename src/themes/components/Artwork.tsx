import Link from "./Link";
import { Vector3 } from "three";

export type ArtworkProps = {
  artwork: {
    src: string;
    link?: string;
    audio?: boolean;
    size?: number;
    blank?: boolean;
    volume?: number;
  }[];
  linkPositions: {
    p: Vector3;
    r: number;
  }[];
};

const Artwork = (props: ArtworkProps) => {
  const { artwork, linkPositions } = props;

  return (
    <group>
      {artwork.map(
        (piece, i) =>
          !piece.blank && (
            <Link
              position={linkPositions[i].p}
              rotY={linkPositions[i].r}
              {...piece}
              key={i}
            />
          )
      )}
    </group>
  );
};

export default Artwork;
