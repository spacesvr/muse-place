import { Suspense } from "react";
import Ghost from "../../models/Ghost1";
import Moneycat from "../../models/Moneycat";
import Gatorhead from "../../models/Gator";
import Spinning from "../../../../Silks/modifiers/Spinning";
import Kiosk from "./Kiosk";
import { Preload } from "@react-three/drei";

export default function Kiosks() {
  return (
    <group name="kiosks" position={[2, 0.65, 4]} rotation-y={-Math.PI / 2}>
      <Kiosk
        position-x={-0.75}
        // productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NDU2MTQ3MzMzNzQ="
        productName="Ghost"
        name="ghost"
      >
        <Spinning>
          <Suspense fallback={null}>
            <Preload all />
            <Ghost scale={[1.5, 1.5, 1.5]} />
          </Suspense>
        </Spinning>
      </Kiosk>
      <Kiosk
        position-x={0}
        // productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NDU2MTUyOTA0MzA="
        productName="Money Cat"
        name="moneycat"
      >
        <Spinning>
          <Suspense fallback={null}>
            <Preload all />
            <Moneycat scale={[1.5, 1.5, 1.5]} position-y={-0.25} />
          </Suspense>
        </Spinning>
      </Kiosk>
      <Kiosk
        position-x={0.75}
        // productId="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NDU2MTUyOTA0MzA="
        productName="Gator"
        name="moneycat"
      >
        <Spinning>
          <Suspense fallback={null}>
            <Preload all />
            <Gatorhead scale={[1.5, 1.5, 1.5]} position-y={0} />
          </Suspense>
        </Spinning>
      </Kiosk>
    </group>
  );
}