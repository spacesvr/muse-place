import { Suspense } from "react";
import YellowGreenDurag from "../models/YellowGreenDurag";
import BlueYellowDurag from "../models/BlueYellowDurag";
import Spinning from "../modifiers/Spinning";
import Kiosk from "./Kiosk";
import { Preload } from "@react-three/drei";

export default function Kiosks() {
  return (
    <group name="kiosks" position={[0, 0.6, -5.32]}>
      <Suspense fallback={null}>
        <Preload all />
        <Kiosk
          position-x={-0.5}
          productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ4MTQzMTA0NDEwMjI="
          name="pink-green-durag"
        >
          <Spinning>
            <BlueYellowDurag />
          </Spinning>
        </Kiosk>
      </Suspense>
      <Suspense fallback={null}>
        <Preload all />
        <Kiosk
          position-x={2.5}
          productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ4MTQzMTA3Njg3MDI="
          name="pink-white-durag"
        >
          <Spinning>
            <YellowGreenDurag />
          </Spinning>
        </Kiosk>
      </Suspense>
    </group>
  );
}
