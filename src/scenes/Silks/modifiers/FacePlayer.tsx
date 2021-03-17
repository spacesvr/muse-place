import { ReactNode, useRef } from "react";
import { Group } from "three";
import { useFrame } from "react-three-fiber";
import { useLimiter } from "../utils/limiter";
import { useSpring } from "react-spring";
import { getSpringValues } from "../utils/spring";

type Props = {
  children: ReactNode;
  lockX?: boolean;
  lockY?: boolean;
  lockZ?: boolean;
};

const FacePlayer = (props: Props) => {
  const { children, lockX = false, lockY = false, lockZ = false } = props;

  const group = useRef<Group>();
  const limiter = useLimiter(60);
  const [spring, setSpring] = useSpring(() => ({
    xyz: [0, 0, 0],
    precision: 0.00001,
  }));

  useFrame(({ clock, camera }) => {
    if (!limiter.isReady(clock)) return;

    if (group.current) {
      const prev = {
        x: group.current.rotation.x,
        y: group.current.rotation.y,
        z: group.current.rotation.z,
      };
      group.current.lookAt(camera.position);
      if (lockX) group.current.rotation.x = prev.x;
      if (lockY) group.current.rotation.y = prev.y;
      if (lockZ) group.current.rotation.z = prev.z;
      setSpring({ xyz: group.current.rotation.toArray() });

      const [x, y, z] = getSpringValues(spring);
      group.current.rotation.x = x;
      group.current.rotation.y = y;
      group.current.rotation.z = z;
    }
  }, 1);

  return <group ref={group}>{children}</group>;
};

export default FacePlayer;
