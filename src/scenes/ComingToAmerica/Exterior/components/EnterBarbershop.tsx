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
      <group position={[0.407, 0.383, 0.15]}>
        <animated.group scale-x={scale} scale-y={scale} scale-z={scale}>
          {/* @ts-ignore */}
          <Text
            position-y={-0.15}
            color="black"
            textAlign="center"
            maxWidth={0.85}
            fontSize={0.05}
            font={`${CONTENT_FOLDER}/fonts/HelveticaLTStd-Blk.otf`}
          >
            click to go inside
          </Text>
          <Image
            src={`${CONTENT_FOLDER}/C2A_My-T-Sharp_1581_alpha-small.jpg`}
            size={0.6}
            position-z={-0.005}
          />
          <mesh position-z={-0.01} position-y={-0.025}>
            <planeBufferGeometry args={[0.65, 0.4]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </animated.group>
      </group>
      <Trigger onClick={() => (window.location.href = "barbershop")}>
        <mesh position={[0.407, 0.083, -0.04]}>
          <boxBufferGeometry args={[1.1, 1.34, 0.09]} />
          <meshStandardMaterial color="#999999" transparent opacity={0} />
        </mesh>
        <Interactable
          onHover={() => setShow(true)}
          onUnHover={() => setShow(false)}
        >
          <mesh position={[0.407, 0.083, -0.04]} visible={false}>
            <boxBufferGeometry args={[1.1, 1.34, 0.09]} />
          </mesh>
        </Interactable>
      </Trigger>
    </group>
  );
};

export default EnterBarbershop;
