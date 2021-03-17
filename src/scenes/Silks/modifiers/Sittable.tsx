import { ReactNode, useEffect, useRef, useState } from "react";
import { Box3, Group, Mesh, Object3D, Sphere, Vector3 } from "three";
import { useFrame } from "react-three-fiber";

type Props = {
  children: ReactNode;
};

const RADIUS = 0.3;

const Sittable = (props: Props) => {
  const { children } = props;

  const group = useRef<Group>();
  const boxes = useRef<Box3[]>([]);
  const sphere = useRef<Sphere>(new Sphere(new Vector3(100, 100, 100), RADIUS));
  const [sit, setSit] = useState(false);

  useEffect(() => {
    if (group.current) {
      boxes.current = [];
      group.current.traverse((child: Object3D) => {
        if ((child as Mesh).geometry) {
          (child as Mesh).geometry.computeBoundingBox();
          const box = (child as Mesh).geometry.boundingBox;
          if (box) {
            boxes.current.push(box.applyMatrix4((child as Mesh).matrixWorld));
          }
        }
      });
    }
  }, [children]);

  useFrame(({ camera }) => {
    if (sphere.current) {
      sphere.current.center.copy(camera.position);
      sphere.current.center.y = RADIUS;

      if (sphere.current && boxes.current.length > 0) {
        for (const box of boxes.current) {
          if (box.intersectsSphere(sphere.current)) {
            setSit(true);
          }
        }
      }
    }
  });

  return <group ref={group}>{children}</group>;
};

export default Sittable;
