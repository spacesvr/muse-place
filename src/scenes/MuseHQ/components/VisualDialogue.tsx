import VisualInteraction from "./VisualInteraction";
import { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring/three";
import { Dialogue } from "../layers/basis";
import { DialogueContext } from "./VisualDialogueLogic";

export default function VisualDialogue(props: Dialogue & { enabled: boolean }) {
  const { effect, text, input, decisions, enabled } = props;

  const { setKey } = useContext(DialogueContext);

  const { posZ, scaleY } = useSpring({
    posZ: enabled ? 0.003 : -0.003,
    scaleY: enabled ? 1 : 0,
  });

  const [prevEnabled, setPrevEnabled] = useState(false);

  useEffect(() => {
    if (prevEnabled !== enabled) {
      setPrevEnabled(enabled);
      if (enabled && effect) {
        effect().then((newKey: string) => {
          if (newKey) {
            setKey(newKey);
          }
        });
      }
    }
  }, [prevEnabled, enabled]);

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
