import useStateMachine from "@cassiozen/usestatemachine";
import { useIdentity } from "../../layers/identity";
import { DialogueLogic } from "../../components/VisualDialogueLogic";
import { useProxy } from "valtio";
import { useLoginLogic } from "../../logic/login";
import { useSignupLogic } from "../../logic/signup";
import { useState } from "react";

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

const FACTS = [
  "the mitochondria is the powerhouse of the cell",
  "this website is build with three.js!",
  "this website uses our Muse's custom framework called spacesvr, check it out on npm",
  "before we called ourselves Muse, we called ourselves spaces",
];

export const useDialogs = (): DialogueLogic => {
  const identity = useIdentity();
  const identityRef = useProxy(identity);

  const loginLogic = useLoginLogic("init", "done");
  const signupLogic = useSignupLogic("init", "done");

  const [fact, setFact] = useState(
    "the mitochondria is the powerhouse of the cell"
  );

  return [
    {
      key: "init",
      text:
        "what's up, welcome to muse hq, where we give you all the tools to create a stunning 3D website. ready to go?",
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
        {
          name: "go where? I just got here",
          nextKey: "pitch",
          utility: 0.7,
        },
      ],
    },

    {
      key: "pitch",
      text:
        "as you can see this site is crazy immersive - it lets your brand elevate its story way beyond any 2D site",
      decisions: [
        {
          name: "you have my attention",
          nextKey: "guidance",
        },
      ],
    },
    {
      key: "guidance",
      text:
        "awesome, my friend at the builder table will be able to help you get started building your world",
      decisions: [
        {
          name: "actually, log me in",
          nextKey: "login",
        },
        {
          name: "ok sounds good",
          nextKey: "wait",
        },
      ],
    },
    {
      key: "wait",
      text: "*heavy breathing*",
      decisions: [
        {
          name: `I'm not ${identityRef.name}`,
          nextKey: "logout",
        },
        {
          name: "what's up",
          nextKey: "fact",
        },
      ],
    },
    {
      key: "fact",
      text: fact,
      effect: async () => {
        setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
      },
      decisions: [
        {
          name: "thanks for that",
          nextKey: "wait",
        },
      ],
    },
    {
      key: "done",
      text: `all done! welcome again to muse hq, ${identityRef.name}! feel free to explore`,
      decisions: [
        {
          name: "thanks",
          nextKey: "wait",
        },
      ],
    },
    {
      key: "logout",
      text: `sorry, I haven't coded this yet, i'm currently lost in the metaverse. send help`,
      decisions: [
        {
          name: "nah",
          nextKey: "wait",
        },
      ],
    },
    ...loginLogic,
    ...signupLogic,
  ];
};
