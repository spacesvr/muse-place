import { GroupProps } from "react-three-fiber";
import SpeechBubble from "../../../components/SpeechBubble";

const GiveCode = (props: GroupProps) => {
  return (
    <group {...props}>
      <group position-y={1} position-z={0.2}>
        <SpeechBubble>
          good shit, type in this code at checkout: D4VXR3E
        </SpeechBubble>
      </group>
    </group>
  );
};

export default GiveCode;
