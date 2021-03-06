import { Text } from "@react-three/drei";
import { ReactNode } from "react";
import Button from "./Button";
import { Idea, Interaction } from "layers/basis";
import FacePlayer from "../modifiers/FacePlayer";

const FONT_FILE =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

export default function VisualInteraction(
  props: Interaction & { enabled: boolean; children?: ReactNode }
) {
  const { text, decisions, enabled, input, children } = props;

  const textStyles: Partial<typeof Text.defaultProps> = {
    font: FONT_FILE,
    maxWidth: 0.8,
    textAlign: "center",
    fontSize: 0.06,
    outlineWidth: 0.0065,
  };

  return (
    <group name={`interaction-${text}`}>
      <Text
        {...textStyles}
        anchorY={input ? "bottom" : "middle"}
        position-y={input ? 0.025 : 0}
      >
        {text}
      </Text>
      {decisions && (
        <group name="decisions" position-y={-0.35 / 2 - 0.1}>
          {decisions.map((decision, i) => {
            const perc =
              decisions.length === 1 ? 0 : i / (decisions.length - 1);
            const width = decision.name.length * 0.28 + 0.25;
            const posY = -perc * 0.125;

            const idea = new Idea();
            idea.setFromDecision(decision);

            return (
              <FacePlayer key={`${decision.name}-${i}`}>
                <Button
                  width={width}
                  onClick={() => decision.action()}
                  position-z={0.15}
                  position-y={posY}
                  idea={idea}
                >
                  {decision.name}
                </Button>
              </FacePlayer>
            );
          })}
        </group>
      )}
      {children}
    </group>
  );
}
