import InstancedModel from "./components/InstancedModel";
import { Object3D, Vector3 } from "three";

type ImplicitFunc = (x: number, y: number, z: number) => Vector3;

type NatureProps = {
  density: number;
  shape: ImplicitFunc;
};

const WEED_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/WeedPlant-1620877818/weed_plant.glb.gz";

type Piece = {
  model: string;
  clustering: ImplicitFunc;
  count: number;
  transform: Object3D;
};

export default function Nature(props: NatureProps) {
  const { density, shape } = props;

  const pinkObj = new Object3D();
  pinkObj.scale.multiplyScalar(0.0175);
  pinkObj.position.y = 0;
  pinkObj.rotation.x = Math.PI / 2;
  pinkObj.updateMatrix();

  const pieces: Piece[] = [
    {
      model: WEED_URL,
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
