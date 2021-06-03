import { GroupProps, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { ReactNode, useMemo } from "react";
import { DoubleSide, ShaderMaterial, Vector2 } from "three";
import { frag, vert } from "./shaders/plate";
import { useLimiter } from "spacesvr";

type Props = {
  title?: string;
  subtitle?: string;
  children?: string | ReactNode | ReactNode[];
  link?: string;
  width?: number;
  height?: number | "auto";
  size?: number;
} & GroupProps;

export default function Placard(props: Props) {
  const {
    title,
    subtitle,
    children,
    link,
    width = 1,
    size = 1,
    height = "auto",
    ...restProps
  } = props;

  const PADDING_X = 0.03;
  const PADDING_Y = 0.07;
  const HEIGHT =
    height !== "auto"
      ? height + PADDING_Y * 2
      : Math.max(0.5, ((children as string) || "").length * 0.000825) +
        PADDING_Y * 2;
  const WIDTH = 0.65 * width;
  const SIZE = size * 0.65;

  const top = HEIGHT / 2 - PADDING_Y;
  const left = -WIDTH / 2 + PADDING_X;
  const maxWidth = WIDTH - PADDING_X * 2;

  const limiter = useLimiter(30);

  const allStyles = {
    color: "black",
    textAlign: "justify",
    anchorX: "left",
    anchorY: "top",
  };

  const titleStyles = {
    ...allStyles,
    fontSize: 0.05,
    maxWidth,
    position: [left, top, 0],
  };

  const subtitleStyles = {
    ...allStyles,
    color: "#999",
    fontSize: 0.025,
    maxWidth,
    position: [left, top - 0.1, 0],
  };

  const bodyStyles = {
    ...allStyles,
    fontSize: 0.026,
    lineHeight: 1.3,
    maxWidth,
    position: [left, top - (subtitle ? 0.15 : 0.1), 0],
  };

  const plateMat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          seed: { value: Math.random() },
          borderRadius: { value: 0.025 },
          dimensions: { value: new Vector2(WIDTH * SIZE, HEIGHT * SIZE) },
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!plateMat || !limiter.isReady(clock)) return;
    plateMat.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <group name="placard" {...restProps}>
      <group scale={[SIZE, SIZE, SIZE]}>
        <mesh name="plate" material={plateMat}>
          <planeBufferGeometry args={[WIDTH, HEIGHT]} />
        </mesh>
        <group name="content" position-z={0.005}>
          {/* @ts-ignore */}
          <Text {...titleStyles}>{title}</Text>
          {/* @ts-ignore */}
          <Text {...subtitleStyles}>{subtitle}</Text>
          {/* @ts-ignore */}
          <Text {...bodyStyles}>{children}</Text>
        </group>
      </group>
    </group>
  );
}
