import { GroupProps } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
// @ts-ignore
import { animated, useSpring } from "react-spring/three";
import React, { useEffect, useState } from "react";
import { config } from "react-spring";
import { Floating } from "spacesvr";

type Props = {
  keyCode: string;
  keyPress?: string[];
} & GroupProps;

export default function Key(props: Props) {
  const { keyCode, keyPress = [keyCode], ...restProps } = props;

  const [pressed, setPressed] = useState(false);

  const { color, scale } = useSpring({
    color: pressed ? "#aaa" : "#fff",
    scale: pressed ? 0.5 : 1,
    ...config.stiff,
  });

  useEffect(() => {
    const detectPress = (e: KeyboardEvent) => {
      if (keyPress.map((k) => k.toLowerCase()).includes(e.key.toLowerCase())) {
        setPressed(true);
      }
    };

    const detectUnPress = (e: KeyboardEvent) => {
      if (keyPress.map((k) => k.toLowerCase()).includes(e.key.toLowerCase())) {
        setPressed(false);
      }
    };

    document.addEventListener("keydown", detectPress);
    document.addEventListener("keyup", detectUnPress);

    return () => {
      document.removeEventListener("keydown", detectPress);
      document.removeEventListener("keyup", detectUnPress);
    };
  }, []);

  return (
    <group {...restProps}>
      <Floating speed={1.5}>
        <group position-z={-0.5}>
          <animated.group rotation-x={-0.55} scale-z={scale}>
            <group position-z={0.5}>
              {/* @ts-ignore */}
              <RoundedBox
                args={[2, 2, 1]} // Width, Height and Depth of the box
                radius={0.25} // Border-Radius of the box
                smoothness={4} // Optional, number of subdivisions
                position-z={-0.5 - 0.01}
              >
                <animated.meshStandardMaterial color={color} />
              </RoundedBox>
              {/* @ts-ignore */}
              <Text color="black" fontSize={1}>
                {keyCode}
              </Text>
            </group>
          </animated.group>
        </group>
      </Floating>
    </group>
  );
}
