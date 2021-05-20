import { RoundedBox } from "@react-three/drei";
import { DoubleSide, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring/three";
import { DialogueContext } from "../index";
import FacePlayer from "../../../modifiers/FacePlayer";
import VisualDialogue from "../../VisualDialogue";

export default function Dialogues() {
  const { enabled, currentIdea, index, setIndex, dialogueLogic } = useContext(
    DialogueContext
  );

  const WIDTH = 1;
  const HEIGHT = 0.35;
  const DEPTH = 0.125;
  const RADIUS = Math.min(WIDTH, HEIGHT, DEPTH) * 0.5;

  const material = useRef<MeshStandardMaterial>();

  useFrame(() => {
    if (!material.current) return;
    material.current.color.set(currentIdea.getHex());
  });

  const { scale } = useSpring({
    scale: enabled ? 1 : 0,
  });

  useEffect(() => {
    setIndex(0);
  }, []);

  return (
    <group position-x={WIDTH / 2 + 0.1} position-y={0}>
      <animated.group scale={scale}>
        <FacePlayer>
          <RoundedBox
            args={[WIDTH, HEIGHT, DEPTH]}
            radius={RADIUS}
            smoothness={4}
            name="base"
          >
            <meshStandardMaterial ref={material} side={DoubleSide} />
          </RoundedBox>
          <group name="content" position-z={DEPTH / 2 + 0.001}>
            {dialogueLogic.map((dialogue, i) => (
              <VisualDialogue {...dialogue} enabled={i === index} />
            ))}
          </group>
        </FacePlayer>
      </animated.group>
    </group>
  );
}
