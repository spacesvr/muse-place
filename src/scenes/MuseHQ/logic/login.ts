import { useState } from "react";
import { useIdentity } from "../layers/identity";
import { DialogueLogic } from "../components/VisualDialogueLogic";

export const useLoginLogic = (
  prevKey: string,
  nextKey: string
): DialogueLogic => {
  const identity = useIdentity();

  const [error, setError] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return [
    {
      key: "login",
      text: "what's your email?",
      input: {
        value: email,
        setValue: setEmail,
      },
      decisions: [
        {
          name: "submit",
          nextKey: "login-password",
        },
        {
          name: "cancel",
          nextKey: prevKey,
        },
      ],
    },
    {
      key: "login-password",
      text: "what is your password? i won't look, i promise",
      input: {
        value: password,
        setValue: setPassword,
        type: "password",
      },
      decisions: [
        {
          name: "submit",
          nextKey: "login-login",
        },
        {
          name: "cancel",
          nextKey: prevKey,
        },
      ],
    },
    {
      key: "login-login",
      text: "logging in...",
      effect: async () => {
        if (!identity.exists) {
          setError(undefined);
          const result = await identity.login(email, password);
          if (result.success) {
            return "login-background";
          } else {
            setError(result.message);
            return "login-error";
          }
        }
      },
    },
    {
      key: "login-background",
      text: "running a background check...",
      effect: async () => {
        setError(undefined);
        const result = await identity.fetch();
        if (result.success) {
          return nextKey;
        } else {
          setError(result.message);
          return "error";
        }
      },
    },
    {
      key: "login-error",
      text: `error: ${error}`,
      decisions: [
        {
          name: "try again",
          nextKey: "login-email",
        },
        {
          name: "nevermind",
          nextKey: prevKey,
        },
      ],
    },
  ];
};
