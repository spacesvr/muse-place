import { RoundedBox, Text } from "@react-three/drei";
import { animated, useSpring, config } from "react-spring/three";
import { useEffect, useState } from "react";
import { Interactable } from "spacesvr";
import { GroupProps } from "@react-three/fiber";
import { Idea } from "layers/basis";

const FONT_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

type ButtonProps = {
  children?: string;
  textStyles?: Partial<React.ComponentProps<typeof Text>>;
  size?: number;
  onClick?: () => void;
  width?: number;
  idea?: Idea;
} & GroupProps;

export default function Button(props: ButtonProps) {
  const {
    children,
    textStyles,
    onClick,
    width = 1,
    size = 1,
    idea,
    ...rest
  } = props;

  const HEIGHT = 0.1;
  const WIDTH = 0.1 * width;
  const DEPTH = 0.05;
  const RADIUS = Math.min(WIDTH, HEIGHT, DEPTH) * 0.5;

  const TEXT_STYLES: Partial<React.ComponentProps<typeof Text>> = {
    color: "black",
    font: FONT_URL,
    fontSize: 0.05,
    outlineWidth: 0.0055,
    outlineColor: "white",
    anchorY: "middle",
    ...textStyles,
  };

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const restColor = idea ? idea.getHex() : "#aaa";
  const hoverColor = idea
    ? new Idea({
        s: idea.specificity * 1.3,
        u: idea.utility * 1.3,
        m: idea.mediation,
      }).getHex()
    : "#fff";

  const { color, scale } = useSpring({
    color: hovered ? restColor : hoverColor,
    scale: clicked ? 0.75 : 1,
    ...config.stiff,
  });

  // spring animation on click
  useEffect(() => {
    if (clicked) {
      setTimeout(() => setClicked(false), 150);
    }
  }, [clicked]);

  const onButtonClick = () => {
    if (onClick) {
      onClick();
    }
    setClicked(true);
  };

  return (
    <group name={`button-${children}`} {...rest}>
      <group name="button-wrapper" scale={size}>
        <animated.group scale={scale}>
          {children && (
            <Text {...TEXT_STYLES} position-z={DEPTH / 2 + 0.001}>
              {children}
            </Text>
          )}
          <Interactable
            onClick={onButtonClick}
            onHover={() => setHovered(true)}
            onUnHover={() => setHovered(false)}
          >
            <RoundedBox
              args={[WIDTH, HEIGHT, DEPTH]}
              radius={RADIUS}
              smoothness={4}
            >
              <animated.meshStandardMaterial color={color} />
            </RoundedBox>
          </Interactable>
        </animated.group>
      </group>
    </group>
  );
}
