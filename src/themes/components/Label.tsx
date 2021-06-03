import { Text } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

type LabelProps = {
  text: string;
  width?: number;
  size?: number;
} & GroupProps;

export default function Label(props: LabelProps) {
  const { text, width, size = 1, ...restProps } = props;

  const PADDING_X = 0.05;
  const PADDING_Y = 0.03;
  const WIDTH = width || text.length * 0.05;
  const HEIGHT = 0.1 + PADDING_Y * 2;

  const textAttrs = {
    color: "black",
    fontSize: 0.1,
    anchorY: "middle",
    anchorX: "center",
    position: [0, 0, 0.005],
  };

  return (
    <group name={`label-${text}`} {...restProps}>
      <group scale={[size, size, size]}>
        {/* @ts-ignore */}
        <Text {...textAttrs}>{text}</Text>
        <mesh>
          <planeBufferGeometry
            args={[WIDTH + PADDING_X * 2, HEIGHT + PADDING_Y * 2]}
          />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </group>
  );
}
