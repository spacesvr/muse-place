import { GroupProps, useFrame } from "@react-three/fiber";
import Bubbles from "./components/Bubbles";
import { createContext, useMemo, useState } from "react";
import Dialogues from "./components/Dialogues";
import { MathUtils } from "three";
import { Dialogue, Idea } from "../../layers/basis";

export type DialogueLogic = Dialogue[];

type VisualDialogueLogicProps = {
  source?: [number, number, number];
  numStops?: number;
  enabled?: boolean;
  dialogueLogic: DialogueLogic;
};

type DialogueState = {
  index: number;
  setIndex: (n: number) => void;
  source: [number, number, number];
  numStops: number;
  enabled: boolean;
  currentIdea: Idea;
  dialogueLogic: DialogueLogic;
};

export const DialogueContext = createContext<DialogueState>(
  {} as DialogueState
);

export default function VisualDialogueLogic(
  props: VisualDialogueLogicProps & GroupProps
) {
  const {
    source = [0.9, -0.5, -0.2],
    numStops = 5,
    enabled = false,
    children,
    dialogueLogic,
    ...rest
  } = props;

  const [index, setIndex] = useState(0);
  const currentIdea = useMemo(() => new Idea(), []);
  const targetIdea = useMemo(() => new Idea(), []);

  useFrame(() => {
    if (!deepCompareObjects(currentIdea, targetIdea)) {
      currentIdea.mediation = MathUtils.lerp(
        currentIdea.mediation,
        targetIdea.mediation,
        0.05
      );
      currentIdea.utility = MathUtils.lerp(
        currentIdea.utility,
        targetIdea.utility,
        0.05
      );
      currentIdea.specificity = MathUtils.lerp(
        currentIdea.specificity,
        targetIdea.specificity,
        0.05
      );
    }
  });

  return (
    <group name="dialogue" {...rest}>
      <DialogueContext.Provider
        value={{
          index,
          setIndex,
          source,
          numStops,
          enabled,
          currentIdea,
          dialogueLogic,
        }}
      >
        <Bubbles />
        <Dialogues />
      </DialogueContext.Provider>
    </group>
  );
}

const deepCompareObjects = (o1: any, o2: any) => {
  for (var p in o1) {
    if (o1.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  for (var p in o2) {
    if (o2.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  return true;
};
