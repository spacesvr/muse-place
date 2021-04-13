import { usePlayer } from "spacesvr";
import { useThree } from "react-three-fiber";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const Dropoff = () => {
  const { camera } = useThree();
  const { velocity, position, controls } = usePlayer();

  useFrame(() => {
    if (camera.position.y < -15) {
      velocity.set(new Vector3(0, -0.2, 0));
      position.set(new Vector3(0, 1.5, 36));
      setTimeout(() => controls.unlock(), 750);
    }
  });

  return null;
};

export default Dropoff;
