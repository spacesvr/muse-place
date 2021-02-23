import { Suspense } from "react";
import { StandardEnvironment } from "spacesvr";
import { Sky } from "@react-three/drei";
import C2ABarbershop from "./models/C2ABarbershop";
import Mirror from "./components/Mirror";
import { Vector3 } from "three";

const Barbershop = () => {
  return (
    <StandardEnvironment player={{ pos: new Vector3(0, 1.25, 0), speed: 0.9 }}>
      <Sky />
      <Suspense fallback={null}>
        <C2ABarbershop />
      </Suspense>
      <Suspense fallback={null}>
        <Mirror />
      </Suspense>
      <ambientLight />
    </StandardEnvironment>
  );
};

export default Barbershop;