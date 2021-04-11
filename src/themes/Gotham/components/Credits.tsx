import { Text } from "@react-three/drei";
import { Interactable } from "spacesvr";
import { useMemo } from "react";
import { MeshStandardMaterial } from "three";

const FONT =
  "https://use.typekit.net/af/6d4bb2/00000000000000003b9acafc/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3";

type Props = { night?: boolean };

export default function Credits(props: Props) {
  const { night } = props;

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: night ? 0xffffff : 0x000000,
        metalness: 0.2,
        roughness: 0.1,
      }),
    [night]
  );

  return (
    <group position={[2.49, 0.165, 3.2]} rotation={[0, -Math.PI / 2, 0]}>
      {/* @ts-ignore */}
      <Text anchorY="middle" fontSize={0.15} material={material} font={FONT}>
        MADE BY MUSE{"      "}|
      </Text>
      <Interactable
        onClick={() =>
          (window.location.href = "https://musevr.typeform.com/to/yjALZqVp")
        }
      >
        <group position-x={1.8}>
          {/* @ts-ignore */}
          <Text
            anchorY="middle"
            fontSize={0.15}
            material={material}
            font={FONT}
          >
            Want Your Own? Click Here
          </Text>
        </group>
      </Interactable>
    </group>
  );
}
