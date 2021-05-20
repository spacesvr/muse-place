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
  const [engaged, setEngaged] = useState(false);
  const curString = useRef("");

  const { color } = useSpring({
    color: engaged ? "#000" : "#828282",
  });

  useEffect(() => {
    if (engaged) controls.lock();
    if (!engaged) controls.unlock();
  }, [engaged]);

  useEffect(() => {
    if (!enabled && engaged) {
      setEngaged(false);
    }
  }, [enabled, engaged]);

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (!engaged) return;
      if (
        e.key.match(/(\w|\s|[.,@\/#!$%\^&\*;:{}=\-_`~()])/g) &&
        e.key.length === 1
      ) {
        curString.current = curString.current + e.key;
        setValue(curString.current);
      } else {
        if (e.key === "Backspace") {
          curString.current = curString.current.substr(
            0,
            curString.current.length - 1
          );
          setValue(curString.current);
        }
      }
    };

    document.addEventListener("keyup", onKeyup);

    return () => {
      document.removeEventListener("keyup", onKeyup);
    };
  }, [engaged, value]);

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

  return (
    <group name="input" {...rest}>
      <Text {...textStyles} position-z={0.051} position-x={(-WIDTH + 0.05) / 2}>
        {value + "|"}
      </Text>
      <Interactable onClick={() => setEngaged(!engaged)}>
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
