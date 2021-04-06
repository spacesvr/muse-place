import Gatorhead from "./models/Gatorhead";
import Ghost from "./models/Ghost1";
import Moneycat from "./models/Moneycat1";
import { Floating } from "spacesvr";

const Balloonski = () => {
  return (
    <group>
      <Moneycat
        position={[-4.55, 0, 11.2]}
        rotation-y={2.34}
        scale={[7, 7, 7]}
        name="cat"
      />
      <Gatorhead
        position={[2.32, 0.8, 5]}
        rotation={[-0.3, -2.48, -0.13]}
        scale={[5, 5, 5]}
        name="gator"
      />
      <Floating height={0.15} speed={3}>
        <Ghost
          name="ghost"
          // position={[-4.49, 1.28, -3.26]}
          // rotation={[-0.7, 0.67, 0.5]}
          position={[-4.5, 1.5, -3.3]}
          rotation-y={0.67}
          scale={[10, 10, 10]}
        />
      </Floating>
    </group>
  );
};

export default Balloonski;
