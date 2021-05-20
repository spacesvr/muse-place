import { useContext, useMemo } from "react";
import { Floating, Spinning } from "spacesvr";
import { VisualIdea } from "../../VisualIdea";
import { animated, useSpring } from "react-spring/three";
import { DialogueContext } from "../index";
import { useFrame } from "@react-three/fiber";
import { Idea } from "../../../layers/basis";

type Bubble = {
  idea: Idea;
  size: number;
  pos: [number, number, number];
};

type BubbleProps = {
  i: number;
  num: number;
  enabled: boolean;
} & Bubble;

function Bubble(props: BubbleProps) {
  const { i, num, enabled, pos, size, idea } = props;

  const { scale } = useSpring({
    scale: enabled ? 1 : 0,
  });

  useFrame(() => {});

  return (
    <group name={`bubble-${i}`} position={pos}>
      <Floating height={size * 0.25}>
        <Spinning xSpeed={0.1} ySpeed={0.1} zSpeed={0.1}>
          <animated.group scale={scale}>
            <VisualIdea idea={idea} size={size} />
          </animated.group>
        </Spinning>
      </Floating>
    </group>
  );
}

export default function Bubbles() {
  const { numStops, source, enabled, currentIdea } = useContext(
    DialogueContext
  );

  const bubbles: Bubble[] = useMemo(() => {
    const arr: Bubble[] = [];
    for (let i = 0; i < numStops; i++) {
      const perc = i / (numStops - 1);
      arr.push({
        idea: new Idea({
          m: currentIdea.mediation,
          u: currentIdea.utility * perc,
          s: currentIdea.specificity * perc,
        }),
        size: 0.01 + perc * 0.05,
        pos: [
          source[0] * (1 - perc),
          source[1] * (1 - perc),
          source[2] * (1 - perc),
        ],
      });
    }
    return arr;
  }, [numStops, source]);

  return (
    <group name="bubbles">
      {bubbles.map((bubble, i) => (
        <Bubble
          key={i}
          i={i}
          num={bubbles.length}
          enabled={enabled}
          {...bubble}
        />
      ))}
    </group>
  );
}
