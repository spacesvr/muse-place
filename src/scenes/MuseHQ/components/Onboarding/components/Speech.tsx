import { GroupProps, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

type Props = { children: string } & GroupProps;

const FONT = "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

export default function Speech(props: Props) {
  const { children, ...restProps } = props;

  const size = useThree((state) => state.size);

  const SIZE = 1.25;
  const WIDTH = Math.min(size.width * 0.035, 24);

  return (
    <group {...restProps}>
      {/* @ts-ignore */}
      <Text
        fontSize={SIZE}
        font={FONT}
        outlineWidth={SIZE * 0.1}
        maxWidth={WIDTH}
        textAlign="center"
      >
        {children}
      </Text>
    </group>
  );
}
