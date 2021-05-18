import { RangeTool } from "../modifiers/RangeTool";
import VisualDialogue from "./VisualDialogue";
import { Dialogue } from "layers/basis";
import { useEffect, useMemo, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import { DoubleSide } from "three";
import FacePlayer from "../../scenes/MuseHQ/modifiers/FacePlayer";
import { animated, useSpring } from "react-spring/three";

type PopupProps = {
  dialogue: Dialogue;
  timeout: number; //ms
};

export default function Popup(props: PopupProps) {
  const { dialogue, timeout } = props;

  const [enabled, setEnabled] = useState(false);
  const [shown, setShown] = useState(false);

  const WIDTH = 1;
  const HEIGHT = 0.35;
  const DEPTH = 0.125;
  const RADIUS = Math.min(WIDTH, HEIGHT, DEPTH) * 0.5;

  const { scale } = useSpring({
    scale: enabled ? 17 : 0,
  });

  useEffect(() => {
    if (!enabled && !shown) {
      setTimeout(() => {
        setEnabled(true);
        setShown(true);
      }, timeout);
    }
  }, [enabled, shown]);

  const newDialogue: Dialogue = useMemo(() => {
    const newD: Dialogue = JSON.parse(JSON.stringify(dialogue));
    newD.decisions?.map((decision, i) => {
      // @ts-ignore
      newD.decisions[i].action = () => {
        setEnabled(false);
        // @ts-ignore
        dialogue.decisions[i].action();
      };
    });
    return newD;
  }, [dialogue]);

  return (
    <group name="popup">
      <RangeTool pos={[0, 0]} distance={6}>
        <animated.group scale={scale}>
          <FacePlayer>
            <RoundedBox
              args={[WIDTH, HEIGHT, DEPTH]}
              radius={RADIUS}
              smoothness={4}
              name="base"
            >
              <meshStandardMaterial side={DoubleSide} />
            </RoundedBox>
            <group name="content" position-z={DEPTH / 2 + 0.003}>
              <VisualDialogue {...newDialogue} enabled={enabled} />
            </group>
          </FacePlayer>
        </animated.group>
      </RangeTool>
    </group>
  );
}
