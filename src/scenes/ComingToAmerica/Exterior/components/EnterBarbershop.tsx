import { useState } from "react";
import Trigger from "../../modifiers/Trigger";
import { Interactable, Image } from "spacesvr";
import { Text } from "@react-three/drei";
import { config } from "react-spring";
// @ts-ignore
import { animated, useSpring } from "react-spring/three";

const CONTENT_FOLDER = "https://d27rt3a60hh1lx.cloudfront.net/content/c2a";

const EnterBarbershop = () => {
  const [show, setShow] = useState(false);

  const { scale } = useSpring({
    scale: show ? 1 : 0,
    config: config.default,
  });

  return (
    <group>
      <group position={[0.407, 0.383, 0.218]}>
        <animated.group scale-x={scale} scale-y={scale} scale-z={scale}>
          {/* @ts-ignore */}
          <Text
            position-y={-0.15}
            color="black"
            textAlign="center"
            maxWidth={0.85}
            fontSize={0.08}
            font={`${CONTENT_FOLDER}/fonts/HelveticaLTStd-Blk.otf`}
          >
            click to enter barbershop
          </Text>
          <Image src={`${CONTENT_FOLDER}/RealMyTSHarpSign.png`} size={0.6} />
        </animated.group>
      </group>
      <Trigger onClick={() => (window.location.href = "barbershop")}>
        <mesh position={[0.407, 0.083, 0.018]}>
          <boxBufferGeometry args={[1.1, 1.34, 0.09]} />
          <meshStandardMaterial color="#999999" transparent opacity={0} />
        </mesh>
        <Interactable
          onHover={() => setShow(true)}
          onUnHover={() => setShow(false)}
        >
          <mesh position={[0.407, 0.083, 0.018]} visible={false}>
            <boxBufferGeometry args={[1.1, 1.34, 0.09]} />
          </mesh>
        </Interactable>
      </Trigger>
    </group>
  );
};

export default EnterBarbershop;