import { Suspense } from "react";
import Builder from "../models/Builder";
import { GroupProps } from "react-three-fiber";
import { Spinning } from "spacesvr";

export default function SpinningBuilder(props: GroupProps) {
  return (
    <group {...props}>
      <Spinning xSpeed={1} ySpeed={1.25} zSpeed={1.4}>
        <Suspense fallback={null}>
          <Builder />
        </Suspense>
      </Spinning>
    </group>
  );
}
