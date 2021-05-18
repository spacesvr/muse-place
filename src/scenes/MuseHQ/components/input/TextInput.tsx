import { RoundedBox, Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring/three";
import { Interactable, usePlayer } from "spacesvr";

type TextProps = {
  value: string;
  setValue: (s: string) => void;
  enabled: boolean;
} & GroupProps;

const FONT_FILE =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

export default function TextInput(props: TextProps) {
  const { value, setValue, enabled, ...rest } = props;

  const { controls } = usePlayer();
  const inputRef = useRef<HTMLInputElement>();
  const [focused, setFocused] = useState(false);
  const [cursorPos, setCursorPos] = useState<number | null>(null);

  const { color } = useSpring({
    color: focused ? "#000" : "#828282",
  });

  useEffect(() => {
    if (!inputRef.current) {
      inputRef.current = document.createElement("input");
      inputRef.current.setAttribute("type", "text");
      inputRef.current.style.zIndex = "-99";
      inputRef.current.style.opacity = "0.5";
      inputRef.current.style.position = "absolute";
      inputRef.current.style.left = "0";
      inputRef.current.style.top = "0";
      inputRef.current.style.transform = "translateY(-100%)";

      inputRef.current.addEventListener("focus", (data) => {
        setFocused(inputRef.current === document.activeElement);
      });

      inputRef.current.addEventListener("blur", (data) => {
        setFocused(inputRef.current === document.activeElement);
      });

      document.body.appendChild(inputRef.current);

      return () => {
        if (inputRef.current) {
          document.body.removeChild(inputRef.current);
          inputRef.current = undefined;
        }
      };
    }
  }, []);

  useEffect(() => {
    if (focused) controls.lock();
    if (!focused) controls.unlock();
  }, [focused]);

  useEffect(() => {
    if (!enabled && focused && inputRef.current) {
      inputRef.current.blur();
    }
  }, [enabled, focused]);

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (!focused || !inputRef.current) return;
      setCursorPos(inputRef.current.selectionStart);
      setValue(inputRef.current.value);
    };

    document.addEventListener("keyup", onKeyup);

    return () => {
      document.removeEventListener("keyup", onKeyup);
    };
  }, [focused]);

  const focusInput = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const BORDER = 0.005;
  const WIDTH = 0.7;

  const textStyles: Partial<typeof Text.defaultProps> = {
    font: FONT_FILE,
    anchorX: "left",
    maxWidth: WIDTH - 0.05,
    textAlign: "left",
    fontSize: 0.0385,
    outlineWidth: 0.003,
  };

  const currentValue =
    cursorPos !== null && focused
      ? value.substring(0, cursorPos) + "|" + value.substring(cursorPos)
      : value;

  return (
    <group name="input" {...rest}>
      <Text {...textStyles} position-z={0.051} position-x={(-WIDTH + 0.05) / 2}>
        {currentValue}
      </Text>
      <Interactable onClick={() => focusInput()}>
        <RoundedBox args={[0.7, 0.1, 0.1]} radius={0.025} smoothness={4}>
          <meshStandardMaterial color="white" />
        </RoundedBox>
      </Interactable>
      <RoundedBox
        args={[0.7 + BORDER, 0.1 + BORDER, 0.1]}
        radius={0.025}
        smoothness={4}
        position-z={-0.001}
      >
        <animated.meshStandardMaterial color={color} />
      </RoundedBox>
    </group>
  );
}
