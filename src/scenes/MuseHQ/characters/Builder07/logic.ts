import useStateMachine from "@cassiozen/usestatemachine";
import { useIdentity } from "../../layers/identity";
import { DialogueLogic } from "../../components/VisualDialogueLogic";
import { useProxy } from "valtio";
import { useLoginLogic } from "../../logic/login";
import { useSignupLogic } from "../../logic/signup";
import { useEffect, useState } from "react";

export const useBuilder00Logic = () =>
  useStateMachine()({
    initial: "waiting",
    states: {
      waiting: {
        on: { INRANGE: "seeyou", SPEAK: "welcome" },
        effect() {
          console.log("entered waiting");
        },
      },
      seeyou: {
        on: { OUTRANGE: "waiting", SPEAK: "welcome" },
        effect() {
          console.log("entered seeyou");
        },
      },
      welcome: {
        on: { OUTRANGE: "waiting" },
        effect() {
          console.log("entered welcome");
        },
      },
    },
  });

export const useDialogs = (): DialogueLogic => {
  const identity = useIdentity();
  const identityRef = useProxy(identity);

  const loginLogic = useLoginLogic("init", "done");
  const signupLogic = useSignupLogic("init", "done");

  return [
    {
      key: "init",
      text:
        "before we move forward with world building, we'll need some details. what would you like to do?",
      decisions: [
        {
          name: "log me in",
          nextKey: "login",
          utility: 0.6,
        },
        {
          name: "sign me up",
          nextKey: "signup",
          utility: 0.95,
        },
      ],
    },

    {
      key: "done",
      text:
        "congratulations! now that you're a checked in, you can start building. that is, if our devs got off their ass",
    },
    ...loginLogic,
    ...signupLogic,
  ];
};
