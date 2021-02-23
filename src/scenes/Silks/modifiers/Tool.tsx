import React, { ReactNode, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Group, Vector3 } from "three";
import { useSpring } from "react-spring";
import { getSpringValues } from "../utils/spring";
import { useLimiter } from "../utils/limiter";

type Props = {
  children: ReactNode;
  pos?: [number, number];
  face?: boolean;
  distance?: number;
  pinY?: boolean;
};

const SCALE = 0.0025;
const DISTANCE = 0.05;

/**
 * Tool modifier will place its children in constant view of the camera
 *
 * pos will determine relative placement on [x, y] axis
 * face will make item face the player (defaults to true)
 *
 * @param props
 * @constructor
 */
export const Tool = (props: Props) => {
  const {
    children,
    pos,
    face = true,
    pinY = false,
    distance = DISTANCE,
  } = props;

  const { camera, size } = useThree();

  const group = useRef<Group>();
  const parent = useRef<Group>();

  const { current: dummyVector } = useRef(new Vector3());
  const { current: seed } = useRef(Math.random());
  const [t, f] = hashSpringSeed(seed);
  const limiter = useLimiter(70);

  const [spring, setSpring] = useSpring(() => ({
    xyz: [0, 0, 0],
    config: { tension: 120 + t, friction: 24 + f, precision: 0.00001 },
  }));

  useFrame(({ clock }) => {
    if (!group.current || !limiter.isReady(clock)) return;

    if (pos !== undefined) {
      const xPos = (pos[0] * 0.00008 * size.width) / 2;
      const yPos = 0.04 * pos[1];
      dummyVector.set(xPos, yPos, -distance);
      const moveQuaternion = camera.quaternion.clone();
      if (!pinY) {
        moveQuaternion.x = 0;
        moveQuaternion.z = 0;
      }
      dummyVector.applyQuaternion(moveQuaternion);

      setSpring({ xyz: dummyVector.toArray() });
    }

    if (face) {
      group.current.lookAt(camera.position);
    }

    const [x, y, z] = getSpringValues(spring);
    group.current.position.set(x, y, z);
  }, 1);

  useFrame(() => {
    if (parent.current) {
      parent.current.position.copy(camera.position);
    }
  }, 1);

  return (
    <group ref={parent}>
      <group ref={group} scale={[SCALE, SCALE, SCALE]}>
        {children}
      </group>
    </group>
  );
};

const hashSpringSeed = (seed: number): [number, number] => {
  const t = (((seed * 100) % 100) - 50) / 50;
  const f = (((seed * 10000) % 100) - 50) / 50;
  return [t * 40, f * 13];
};