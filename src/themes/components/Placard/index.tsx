import { GroupProps } from "react-three-fiber";
import { Text } from "@react-three/drei";
import { useMemo } from "react";
import { DoubleSide, ShaderMaterial, Vector2 } from "three";
import { frag, vert } from "./shaders/plate";

type Props = {
  title?: string;
  subtitle?: string;
  children?: string;
  link?: string;
  width?: number;
} & GroupProps;

export default function Placard(props: Props) {
  const { title, subtitle, children, link, width = 0.65, ...restProps } = props;

  const PADDING_X = 0.06;
  const PADDING_Y = 0.04;
  const HEIGHT = Math.max(0.5, (children || "").length * 0.00115);

  const top = HEIGHT / 2 - PADDING_Y;
  const left = -width / 2 + PADDING_X;
  const maxWidth = width - PADDING_X * 2;

  const allStyles = {
    color: "black",
    textAlign: "left",
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
    fontSize: 0.0275,
    maxWidth,
    position: [left, top - (subtitle ? 0.15 : 0.1), 0],
  };

  const plateMat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          borderRadius: { value: 0.025 },
          dimensions: { value: new Vector2(width, HEIGHT) },
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    []
  );

  return (
    <group name="placard" {...restProps}>
      <mesh name="plate" material={plateMat}>
        <planeBufferGeometry args={[width, HEIGHT]} />
      </mesh>
      <group name="content" position-z={0.02}>
        {/* @ts-ignore */}
        <Text {...titleStyles}>{title}</Text>
        {/* @ts-ignore */}
        <Text {...subtitleStyles}>{subtitle}</Text>
        {/* @ts-ignore */}
        <Text {...bodyStyles}>{children}</Text>
      </group>
    </group>
  );
}
