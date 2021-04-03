import { useEnvironment, useLimiter } from "spacesvr";
import { useThree } from "react-three-fiber";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const Dropoff = () => {
  const { camera } = useThree();
  const { player } = useEnvironment();
  const limiter = useLimiter(45);

  useFrame(() => {
    if (!limiter.isReady) return;
    if (camera.position.y < -15) {
      player.velocity.set(new Vector3(0, -0.2, 0));
      player.position.set(new Vector3(0, 1.5, 36));
      setTimeout(() => player.controls.unlock(), 750);
    }
  });

  return null;
};

export default Dropoff;
