import { GroupProps } from "react-three-fiber";
import SpeechBubble from "../../../components/SpeechBubble";
import { Interactable, useEnvironment } from "spacesvr";
import { Text } from "@react-three/drei";
import FacePlayer from "../../../modifiers/FacePlayer";

const WhatsUp = (props: GroupProps) => {
  const { setPaused } = useEnvironment();

  return (
    <group {...props}>
      <group position-y={1} position-z={0.2}>
        <SpeechBubble>
          yeah I know the owner. give me your email and I'll hook you up
        </SpeechBubble>
        <group position={[0.5, -0.25, 0]}>
          <FacePlayer>
            <Interactable onClick={() => setPaused(true, "emailcollection")}>
              <mesh position-z={0.05 / -2}>
                <boxBufferGeometry args={[0.5, 0.125, 0.05]} />
                <meshStandardMaterial color="red" transparent opacity={0.7} />
              </mesh>
            </Interactable>
            {/* @ts-ignore */}
            <Text color="white" fontSize={0.05} position-z={0.01}>
              ok bro
            </Text>
          </FacePlayer>
        </group>
      </group>
    </group>
  );
};

export default WhatsUp;
