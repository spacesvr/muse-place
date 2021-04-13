import { Suspense } from "react";
import { StandardEnvironment } from "spacesvr";
import { Plane, Sky } from "@react-three/drei";
import Shed from "./models/Shed";
import { Vector3 } from "three";
import { Perf } from "r3f-perf";

const ShedScene = () => {
  return (
    <StandardEnvironment
      canvasProps={{ camera: { far: 200 } }}
      playerProps={{ pos: [1.276, 1.1, 2.543], speed: 0.9, rot: -2 }}
    >
      <Sky />
      <Suspense fallback={null}>
        <Shed />
      </Suspense>
      <ambientLight intensity={4} />
      {/*<Perf />*/}
    </StandardEnvironment>
  );
};

export default ShedScene;
