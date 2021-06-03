import Speech from "../components/Speech";
import { useEffect, useRef } from "react";
import Button from "../components/Button";
import Key from "../components/Key";
// @ts-ignore
import { useSpring, animated } from "react-spring/three";
import { useEnvironment } from "spacesvr";
import { useFrame } from "@react-three/fiber";
import { analytics } from "../../../utils/analytics";

type Props = { stage: number; setStage: (n: number) => void };

export default function Desktop(props: Props) {
  const { stage, setStage } = props;

  const { paused } = useEnvironment();
  const timestamp = useRef(0);

  useEffect(() => {
    // stage 1
    const walkKeys = [
      "w",
      "a",
      "s",
      "d",
      "arrowup",
      "arrowdown",
      "arrowleft",
      "arrowright",
    ];
    const detectKeypress = (e: KeyboardEvent) => {
      if (
        stage === 1 &&
        walkKeys.includes(e.key.toLowerCase()) &&
        timestamp.current === 0
      ) {
        timestamp.current = new Date().getTime();
      }
    };
    document.addEventListener("keydown", detectKeypress);

    // stage 2
    if (stage === 2 && paused) {
      setStage(3);
    }

    if (stage === 4 && timestamp.current === 0) {
      timestamp.current = new Date().getTime();
    }

    return () => {
      document.removeEventListener("keydown", detectKeypress);
    };
  }, [stage, paused]);

  const { stage0, stage1, stage2, stage3 } = useSpring({
    stage0: stage === 0 ? 1 : 0,
    stage1: stage === 1 ? 1 : 0,
    stage2: stage === 2 ? 1 : 0,
    stage3: stage === 3 ? 1 : 0,
  });

  useFrame(() => {
    if (timestamp.current !== 0) {
      const diff = new Date().getTime() - timestamp.current;
      if (stage === 1 && diff > 2500) {
        setStage(2);
        timestamp.current = 0;
      }
      if (stage === 4 && diff > 1000) {
        setStage(-1);
        timestamp.current = 0;
      }
    }
  });

  return (
    <group name="desktop-onboarding">
      <animated.group name="stage-0" scale-y={stage0} scale-z={stage0}>
        <Speech>Welcome to AWGE Space.</Speech>
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
        <group position-y={1}>
          <Key keyCode="W" keyPress={["W", "arrowup"]} position={[0, 3, 0]} />
          <Key keyCode="A" keyPress={["a", "arrowleft"]} position-x={-3} />
          <Key keyCode="S" keyPress={["s", "arrowdown"]} />
          <Key keyCode="D" keyPress={["d", "arrowright"]} position-x={3} />
        </group>
        <Speech position-y={-3}>Use W/A/S/D or Arrow Keys to walk</Speech>
      </animated.group>
      <animated.group name="stage-2" scale-y={stage2} scale-z={stage2}>
        <group position-y={2}>
          <Key keyCode="esc" />
        </group>
        <Speech position-y={-2}>Press esc to free your mouse</Speech>
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
    </group>
  );
}
