import { Tool } from "../../modifiers/Tool";
import { useEffect, useState } from "react";
import Mobile from "./platform/Mobile";
import { isMobile } from "react-device-detect";
import Desktop from "./platform/Desktop";
import { useEnvironment } from "spacesvr";

export default function Onboarding() {
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(false);
  const [alreadyDone] = useState(
    localStorage.getItem("musehq-onboarding") === "done"
  );

  const { paused } = useEnvironment();

  useEffect(() => {
    if (!alreadyDone && !paused) {
      setActive(true);
    }
  }, [paused]);

  useEffect(() => {
    if (stage === -1) {
      localStorage.setItem("musehq-onboarding", "done");
      setActive(false);
    }
  }, [stage]);

  if (!active) {
    return null;
  }

  return (
    <Tool pos={[0, 0]} distance={isMobile ? 12 : 7}>
      {isMobile && <Mobile stage={stage} setStage={setStage} />}
      {!isMobile && <Desktop stage={stage} setStage={setStage} />}
    </Tool>
  );
}
