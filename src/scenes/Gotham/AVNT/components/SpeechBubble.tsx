import { Billboard, Text } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, useState } from "react";
import { Floating } from "spacesvr";

type Props = {
  children: ReactNode;
  direction?: "left" | "right";
  fontSize?: number;
} & GroupProps;

const MAX_WIDTH = 1.5;

const PADDING_X = 0.1;
const PADDING_Y = 0.04;
const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/AcuminProMedium.otf";
const CHAR_SPEED = 0.05;

const SpeechBubble = (props: Props) => {
  const { children, direction = "left", fontSize = 1, ...restProps } = props;

  const FONT_SIZE = 0.07 * fontSize;
  const charWidth = 0.71;
  const width =
    (children as string).length * FONT_SIZE * charWidth + PADDING_X * 2;
  const height = FONT_SIZE * 1.75 + PADDING_Y * 2;

  const [str, setStr] = useState("");
  const startTime = useRef<number>();

  useFrame(({ clock }) => {
    if (!startTime.current) {
      startTime.current = clock.getElapsedTime();
    } else {
      const elapsed = clock.getElapsedTime() - startTime.current;
      const count = Math.floor(elapsed / CHAR_SPEED);
      const newString = (children as string).substr(0, count);
      if (newString !== str) {
        setStr(newString);
      }
    }
  });

  return (
    <group {...restProps}>
      <Floating height={FONT_SIZE * 0.75}>
        <group>
          {/* @ts-ignore */}
          <Text
            maxWidth={MAX_WIDTH}
            fontSize={FONT_SIZE}
            anchorX={direction}
            lineHeight={2}
            font={FILE_URL}
            outlineWidth={FONT_SIZE * 0.1}
            textAlign={direction === "left" ? "left" : "right"}
          >
            {str}
          </Text>
        </group>
      </Floating>
    </group>
  );
};

export default SpeechBubble;
