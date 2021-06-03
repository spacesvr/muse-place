import { GroupProps } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Interactable } from "spacesvr";
// @ts-ignore
import { animated, useSpring } from "react-spring/three";
import { useState } from "react";
import { isMobile } from "react-device-detect";

type Props = {
  onClick: () => any;
  children: string;
  width?: number;
} & GroupProps;

const FONT = "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

export default function Button(props: Props) {
  const { onClick, children, width = 6, ...restProps } = props;

  const SIZE = 0.8;
  const [hovered, setHovered] = useState(false);

  const { color } = useSpring({
    color: !isMobile && hovered ? "#878787" : "#f1f6f1",
  });

  return (
    <group {...restProps}>
      <Interactable
        onClick={onClick}
        onHover={() => setHovered(true)}
        onUnHover={() => setHovered(false)}
      >
        <animated.mesh position-z={-0.4}>
          <boxBufferGeometry args={[width, 1.75, 0.5]} />
          <animated.meshStandardMaterial color={color} />
        </animated.mesh>
      </Interactable>
      {/* @ts-ignore */}
      <Text
        color="black"
        fontSize={SIZE}
        font={FONT}
        outlineWidth={SIZE * 0.025}
        textAlign="center"
      >
        {children}
      </Text>
    </group>
  );
}
