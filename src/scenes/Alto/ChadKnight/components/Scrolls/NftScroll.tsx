import ScrollModel from "themes/Alto/models/Scroll";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Image, Video } from "spacesvr";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import Nifty from "themes/components/SocialButton/models/Nifty";
// @ts-ignore
import { useLimiter, Interactable } from "spacesvr";

export type NftScrollProps = {
  text?: string;
  textColor?: string;
  textSize?: number;
  textY?: number;
  textAlign?: "left" | "center" | "right" | "justify" | undefined;
  img?: string;
  vid?: string;
  font?: string;
  title?: string;
  nft?: string;
} & GroupProps;

const Scroll = (props: NftScrollProps) => {
  const {
    text,
    textY,
    title,
    textSize,
    textColor = "black",
    textAlign = "left",
    img,
    vid,
    font,
    nft,
    ...restProps
  } = props;

  const { camera } = useThree();
  const outer = useRef<THREE.Group>();
  const inner = useRef<THREE.Group>();
  const scroll = useRef<THREE.Group>();

  const limiter = useLimiter(40);
  useFrame(({ clock }) => {
    if (!outer.current || !limiter.isReady(clock)) return;
    outer.current.lookAt(0, outer.current.position.y, 0);
  });

  useMemo(() => {
    if (scroll.current) {
      // @ts-ignore
      scroll.current.children[0].children[0].children[1].material.metalness = 0.77;
    }
  }, [scroll.current]);

  const handleClick = () => {
    window.open(nft, "_blank");
  };

  return (
    <group name="scroll" ref={outer} {...restProps}>
      <group ref={inner} scale={[2, 2, 2]} position-y={2}>
        <group position-y={0.5} name="innerscroll">
          <group position-x={0.015} name="content">
            {/* ~2 DrawCalls */}
            {img && (
              <Image src={img} size={0.45} position-y={text ? -0.3 : -0.45} />
            )}
            {vid && (
              <Video
                src={vid}
                size={0.65}
                position={[0.01, text ? -0.3 : -0.475, -0.01]}
                volume={3}
              />
            )}
            {title && (
              <Text
                color={textColor}
                textAlign="center"
                maxWidth={0.45}
                font={font ? font : ""}
                fontSize={0.125}
                anchorY="top"
                position-y={-0.1}
              >
                {title}
              </Text>
            )}
            {text && (
              <group name="text">
                {/* @ts-ignore */}
                <Text
                  color={textColor}
                  textAlign={textAlign}
                  maxWidth={0.45}
                  font={font ? font : ""}
                  fontSize={
                    textSize ? textSize / 100 : img ? 0.03 : vid ? 0.03 : 0.04
                  }
                  anchorY="top"
                  position-x={0.005}
                  position-y={textY ? textY : img ? -0.55 : vid ? -0.55 : -0.05}
                >
                  {text}
                </Text>
              </group>
            )}
            {nft && (
              <group name="nft" position-y={-0.875}>
                <Interactable onClick={handleClick}>
                  <mesh position-x={0.155} scale={[0.115, 0.115, 0.05]}>
                    <boxBufferGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="blue" visible={false} />
                  </mesh>
                </Interactable>
                <Nifty />
              </group>
            )}
          </group>
          <Suspense fallback={null}>
            <group name="scrollModel" ref={scroll}>
              <ScrollModel open={true} />
            </group>
          </Suspense>
        </group>
      </group>
    </group>
  );
};

export default Scroll;
