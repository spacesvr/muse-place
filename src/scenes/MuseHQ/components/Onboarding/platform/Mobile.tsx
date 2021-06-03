import { Suspense, useLayoutEffect } from "react";
import Speech from "../components/Speech";
import { useEffect, useRef } from "react";
import Button from "../components/Button";
import Hand from "../models/Hand";
import Joystick from "../models/Joystick";
// @ts-ignore
import { useSpring, animated } from "react-spring/three";
import { useEnvironment } from "spacesvr";
import { useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { analytics } from "../../../utils/analytics";

type Props = { stage: number; setStage: (n: number) => void };

export default function Mobile(props: Props) {
  const { stage, setStage } = props;

  const { paused } = useEnvironment();
  const timestamp = useRef(0);
  const joystickEl = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const el = document.getElementsByClassName("nipple")[0];
    joystickEl.current = el.children[1] as HTMLDivElement;
  }, []);

  useEffect(() => {
    // stage 1
    const detectTouchMove = () => {
      if (stage === 1 && timestamp.current === 0) {
        timestamp.current = new Date().getTime();
      }
    };
    document.addEventListener("touchmove", detectTouchMove);

    // stage 2

    const detectNippleMove = () => {
      const top = parseInt(
        joystickEl.current?.style?.top.replace("px", "") || "0"
      );
      const left = parseInt(
        joystickEl.current?.style?.left.replace("px", "") || "0"
      );
      if (stage === 2 && (top !== 0 || left !== 0) && timestamp.current === 0) {
        timestamp.current = new Date().getTime();
      }
    };
    document.addEventListener("touchmove", detectNippleMove);

    if (stage === 4 && timestamp.current === 0) {
      timestamp.current = new Date().getTime();
    }

    return () => {
      document.removeEventListener("touchmove", detectTouchMove);
      document.removeEventListener("touchmove", detectNippleMove);
    };
  }, [stage, paused]);

  const { stage0, stage1, stage2, stage3, stage123 } = useSpring({
    stage0: stage === 0 ? 1 : 0,
    stage1: stage === 1 ? 1 : 0,
    stage2: stage === 2 ? 1 : 0,
    stage3: stage === 3 ? 1 : 0,
    stage123: stage === 1 || stage === 2 || stage === 3 ? 1 : 0,
  });

  useFrame(() => {
    if (timestamp.current !== 0) {
      const diff = new Date().getTime() - timestamp.current;
      if (stage === 1 && diff > 4500) {
        setStage(2);
        timestamp.current = 0;
      }
      if (stage === 2 && diff > 4500) {
        setStage(3);
        timestamp.current = 0;
      }
      if (stage === 4 && diff > 1000) {
        setStage(-1);
        timestamp.current = 0;
      }
    }
  });

  return (
    <group name="mobile-onboarding">
      <animated.group name="stage-0" scale-y={stage0} scale-z={stage0}>
        <Speech>welcome to muse.</Speech>
        <Button
          position-y={-3}
          onClick={() => {
            analytics.capture("onboarding-begin");
            setStage(1);
          }}
          width={8}
        >
          how do i use this?
        </Button>
        <Button
          position-y={-5}
          onClick={() => {
            analytics.capture("onboarding-skip");
            setStage(4);
          }}
          width={8}
        >
          begin
        </Button>
      </animated.group>
      <animated.group name="stage-1" scale-y={stage1} scale-z={stage1}>
        <Speech position-y={-3}>Drag the screen to look around</Speech>
      </animated.group>
      <animated.group name="stage-2" scale-y={stage2} scale-z={stage2}>
        <Suspense fallback={null}>
          <Preload all />
          <Joystick position-y={2} />
        </Suspense>
        <Speech position-y={-2}>Drag the joystick to move around</Speech>
      </animated.group>
      <animated.group name="stage-3" scale-y={stage3} scale-z={stage3}>
        <Speech>now go explore to build your site!</Speech>
        <Button
          position-y={-3}
          onClick={() => {
            analytics.capture("onboarding-finish");
            setStage(4);
          }}
        >
          will do
        </Button>
      </animated.group>
      <animated.group name="stage-123" scale-y={stage123} scale-z={stage123}>
        <Suspense fallback={null}>
          <Preload all />
          <Hand stage={stage} />
        </Suspense>
      </animated.group>
    </group>
  );
}
