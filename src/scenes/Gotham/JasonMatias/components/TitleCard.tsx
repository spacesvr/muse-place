import { Floating, Interactable } from "spacesvr";
import { Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
// @ts-ignore
import { animated, useSpring } from "react-spring/three";
import { useState } from "react";

type ButtonProps = {
  title: string;
  link: string;
  width?: number;
};

type TitleCardProps = {
  title: string;
  buttons?: [ButtonProps] | [ButtonProps, ButtonProps];
  contactUrl?: string;
  visitUrl?: string;
  width?: number;
} & GroupProps;

function Button(props: ButtonProps & GroupProps) {
  const { title, link, width = 0.4, ...rest } = props;

  const FONT_URL =
    "https://d27rt3a60hh1lx.cloudfront.net/fonts/AcuminProMedium.otf";
  const WIDTH = width;
  const HEIGHT = 0.055;
  const DEPTH = 0.0075;

  const [hovered, setHovered] = useState(false);

  const { color, scale, posZ } = useSpring({
    color: hovered ? "#666" : "#000000",
    scale: hovered ? 0.7 : 1,
    posZ: hovered ? (-DEPTH / 8) * 0.7 : 0,
  });

  return (
    <group name="button" {...rest}>
      <Interactable
        onClick={() => window.open(link, "_blank")}
        onHover={() => setHovered(true)}
        onUnHover={() => setHovered(false)}
      >
        <animated.mesh position-z={DEPTH / 2} scale-z={scale}>
          <boxBufferGeometry args={[WIDTH, HEIGHT, DEPTH]} />
          <animated.meshStandardMaterial color={color} />
        </animated.mesh>
      </Interactable>
      <animated.group position-z={posZ} name="label">
        {/* @ts-ignore */}
        <Text
          anchorY="middle"
          anchorX="center"
          textAlign="center"
          color="white"
          fontSize={0.0275}
          font={FONT_URL}
          position-z={DEPTH + 0.001}
        >
          {title}
        </Text>
      </animated.group>
    </group>
  );
}

export default function TitleCard(props: TitleCardProps) {
  const {
    title,
    buttons = [],
    contactUrl,
    visitUrl,
    width = 0.65,
    ...rest
  } = props;

  const BUTTONS: ButtonProps[] =
    !contactUrl || !visitUrl
      ? buttons
      : [
          { title: "Contact", link: contactUrl },
          { title: "Learn More", link: visitUrl },
        ];

  const FONT_URL =
    "https://d27rt3a60hh1lx.cloudfront.net/fonts/AcuminProMedium.otf";
  const WIDTH = width;
  const HEIGHT = 0.2;
  const DEPTH = 0.015;
  const PADDING_X = 0.05;
  const PADDING_Y = 0.02;
  const INDENT = 0.015;
  const FONT_SIZE = 0.065;

  return (
    <group name={`titlecard-${title}`} {...rest}>
      <Floating height={0.01} speed={3}>
        <mesh name="plate" position-y={0} position-z={-DEPTH - 0.001}>
          <boxBufferGeometry args={[WIDTH, HEIGHT, DEPTH]} />
          <meshStandardMaterial />
        </mesh>
        {/* @ts-ignore */}
        <Text
          name="title"
          fontSize={FONT_SIZE}
          position-y={HEIGHT / 2 - PADDING_Y}
          position-x={-WIDTH / 2 + PADDING_X}
          color="black"
          font={FONT_URL}
          anchorY="top"
          anchorX="left"
          textAlign="left"
          maxWidth={WIDTH - PADDING_X * 2 - INDENT}
        >
          {title}
        </Text>
        <group
          name="buttons"
          position-y={-0.05}
          position-x={width === 0.65 ? -0.05 : 0}
        >
          {BUTTONS.map((button, i) => {
            const maxWidth = 0.15;
            let buttonWidth = (WIDTH / BUTTONS.length) * 0.9;
            buttonWidth = buttonWidth > maxWidth ? maxWidth : buttonWidth;

            const x =
              buttonWidth / 2 + (i / (BUTTONS.length - 1)) * buttonWidth * 1.25;

            return <Button position-x={x} width={buttonWidth} {...button} />;
          })}
        </group>
      </Floating>
    </group>
  );
}
