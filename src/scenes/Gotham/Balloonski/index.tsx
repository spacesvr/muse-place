import Gatorhead from "./models/Gatorhead";
import Ghost from "./models/Ghost1";
import Moneycat from "./models/Moneycat1";
import { Floating } from "spacesvr";

export default function Balloonski() {
  return (
    <group>
      <Moneycat
        position={[-4.55, 0, 11.2]}
        rotation-y={2.34}
        scale={[7, 7, 7]}
        name="cat"
      />
      <Gatorhead
        position={[2.21, 1.38, 3.94]}
        rotation={[2.772, -0.482, 2.502]}
        scale={[7, 7, 7]}
        name="gator"
      />
      <Floating height={0.15} speed={3}>
        <Ghost
          name="ghost"
          position={[-4.5, 1.5, -3.3]}
          rotation-y={0.67}
          scale={[10, 10, 10]}
        />
      </Floating>
    </group>
  );
}
