import { Suspense } from "react";
import { Text, Interactable } from "spacesvr";

type NftProps = {
  title: string;
  owner: string;
  link: string;
  color?: string;
} & JSX.IntrinsicElements["group"];

export default function NftPlacard(props: NftProps) {
  const { title, owner, link, color = "red", ...restProps } = props;

  return (
    <group {...restProps}>
      <mesh>
        <boxBufferGeometry args={[1.25, 1, 0.15]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <Suspense fallback={null}>
        <Text text={title} position={[0, 0.25, 0.01]} color={color} />
      </Suspense>
      <Suspense fallback={null}>
        <Text text={`Owner: ${owner.substr(0, 8)}`} position={[0, 0, 0.01]} />
      </Suspense>
      <Interactable onClick={() => window.open(`${link}`, "_blank")}>
        <group position={[0, -0.3, 0.075]}>
          <mesh>
            <boxBufferGeometry args={[0.5, 0.25, 0.075]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position-z={0.005}>
            <boxBufferGeometry args={[0.45, 0.2, 0.1]} />
            <meshBasicMaterial color="white" />
          </mesh>
          <Suspense fallback={null}>
            <Text position-y={0.025} text="Buy" color={color} />
          </Suspense>
        </group>
      </Interactable>
    </group>
  );
}
