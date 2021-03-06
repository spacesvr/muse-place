import { Suspense, useContext, useRef, useState } from "react";
import ValModel from "../../models/ValModel";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import Checkout from "./dialogue/Checkout";
import { ShopContext } from "../../index";
import SpringFace from "./modifiers/SpringFace";
import GoBuy from "./dialogue/GoBuy";
import { useLimiter } from "../../utils/limiter";

const ValPerre = () => {
  const { cart } = useContext(ShopContext);
  const group = useRef<Group>();

  const [talk, setTalk] = useState(false);
  const [look, setLook] = useState(false);
  const limiter = useLimiter(30);

  useFrame(({ clock, camera }) => {
    if (!group.current || !limiter.isReady(clock)) return;

    const dist = camera.position.distanceTo(group.current.position);

    if (dist < 2.75) {
      if (!talk) setTalk(true);
    } else if (talk) {
      setTalk(false);
    }

    if (dist < 5) {
      if (!look) setLook(true);
    } else if (look) {
      setLook(false);
    }
  });

  return (
    <group ref={group} position={[-4.86, 0, -4.65]} name="val">
      <Suspense fallback={null}>
        <SpringFace face={look}>
          <ValModel rotation-y={0} />
        </SpringFace>
      </Suspense>
      {talk && cart.count > 0 && <Checkout position={[0.25, 0, 0.5]} />}
      {talk && cart.count === 0 && <GoBuy position={[0.25, 0, 0.5]} />}
    </group>
  );
};

export default ValPerre;
