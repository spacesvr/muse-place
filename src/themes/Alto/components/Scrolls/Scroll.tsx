import ScrollModel from "../../models/Scroll";
import { useFrame, useThree } from "react-three-fiber";
import { Image } from "spacesvr";
import { useRef, useState, Suspense, useEffect } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
// @ts-ignore
import { animated, useSpring } from "react-spring/three";
import { useLimiter } from "spacesvr";

export type ScrollProps = {
  text?: string;
  textColor?: string;
  textSize?: number;
  textY?: number;
  img?: string;
  count: number;
  setCount: (n: number) => void;
};

const Scroll = (props: JSX.IntrinsicElements["group"] & ScrollProps) => {
  const {
    text,
    textY,
    textSize,
    textColor = "black",
    img,
    count,
    setCount,
    ...restProps
  } = props;

  const { camera } = useThree();
  const outer = useRef<THREE.Group>();
  const inner = useRef<THREE.Group>();
  const foundNotice = useRef<THREE.Group>();
  const [open, setOpen] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const [visits, setVisits] = useState<number>(0);
  const [inRange, setRange] = useState<boolean>(false);

  const { scale, posY } = useSpring({
    scale: open ? 1 : 0.1,
    posY: open ? 2 : -0.5,
    config: {
      mass: 1,
      tension: 110,
      friction: 30,
    },
  });
  const { foundY } = useSpring({
    from: { foundY: -3 },
    to: async (next: any) => {
      await next({ foundY: 0 });
      await next({ foundY: -3 });
    },
    config: {
      mass: 1,
      tension: 110,
      friction: 30,
    },
  });

  const limiter = useLimiter(40);

  useFrame(({ clock }) => {
    if (!outer.current || !inner.current || !limiter.isReady(clock)) return;
    setRange(camera.position.distanceTo(outer.current.position) < 5);

    if (inRange) {
      if (!found) {
        setCount(count + 1);
        setFound(true);
      }
      inner.current.lookAt(camera.position);
      if (!open) setOpen(true);
    } else {
      if (open) setOpen(false);
    }
  });

  useEffect(() => {
    if (visits < 2 && inRange) {
      setVisits(visits + 1);
    }
  }, [inRange]);

  return (
    <group name="scroll" ref={outer} {...restProps}>
      <animated.group ref={inner} scale={[2, 2, 2]} position-y={posY}>
        <animated.group ref={foundNotice} position-y={visits < 2 ? foundY : -3}>
          {/* @ts-ignore */}
          <Text color="green" fontSize={0.075} position-x={0.75}>
            {count} SCROLL{count > 1 ? "S" : ""} FOUND!
          </Text>
        </animated.group>
        <group position-y={0.5} name="innerscroll">
          <animated.group position-x={0.015} scale-y={scale} name="content">
            {img && (
              <Image src={img} size={0.45} position-y={text ? -0.3 : -0.45} />
            )}
            {text && (
              <>
                {/* @ts-ignore */}
                <Text
                  color={textColor}
                  maxWidth={0.45}
                  fontSize={textSize ? textSize / 100 : img ? 0.03 : 0.04}
                  anchorY="top"
                  position-x={0.005}
                  position-y={textY || img ? -0.55 : -0.05}
                >
                  {text}
                </Text>
              </>
            )}
          </animated.group>
          <Suspense fallback={null}>
            <ScrollModel open={open} />
          </Suspense>
        </group>
      </animated.group>
    </group>
  );
};

export default Scroll;
