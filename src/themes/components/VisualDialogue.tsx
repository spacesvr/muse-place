import VisualInteraction from "./VisualInteraction";
import { useSpring, animated } from "react-spring/three";
import { Dialogue } from "layers/basis";

export default function VisualDialogue(props: Dialogue & { enabled: boolean }) {
  const { text, input, decisions, enabled } = props;

  const { posZ, scaleY } = useSpring({
    posZ: enabled ? 0.003 : -0.003,
    scaleY: enabled ? 1 : 0,
  });

  return (
    <animated.group
      name={`slide-${text.substr(0, 8)}`}
      position-z={posZ}
      scale-y={scaleY}
    >
      <VisualInteraction
        text={text}
        input={input}
        decisions={decisions}
        enabled={enabled}
      />
    </animated.group>
  );
}
