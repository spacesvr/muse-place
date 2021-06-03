import InstancedModel from "./components/InstancedModel";
import { Object3D, Vector3 } from "three";

type ImplicitFunc = (r: number, theta: number) => Vector3;

type NatureProps = {
  density: number;
  shape: ImplicitFunc;
};

const TREE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/tree4-1622189140/tree4.glb.gz";

type Piece = {
  model: string;
  clustering: ImplicitFunc;
  count: number;
  transform: Object3D;
};

export default function Nature(props: NatureProps) {
  const { density, shape } = props;

  const pinkObj = new Object3D();
  pinkObj.scale.multiplyScalar(5);
  pinkObj.position.y = -2;
  pinkObj.updateMatrix();

  const pieces: Piece[] = [
    {
      model: TREE_URL,
      clustering: shape,
      count: density / 10,
      transform: pinkObj,
    },
  ];

  return (
    <group name="nature">
      {pieces.map((piece) => (
        <InstancedModel
          key={piece.model}
          model={piece.model}
          count={piece.count}
          generation={piece.clustering}
          transform={piece.transform}
        />
      ))}
    </group>
  );
}
