import { useState } from "react";
import { useIdentity } from "../layers/identity";
import { DialogueLogic } from "../components/VisualDialogueLogic";

export const useSignupLogic = (
  prevKey: string,
  nextKey: string
): DialogueLogic => {
  const identity = useIdentity();

  const [error, setError] = useState<string>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return [
    {
      key: "signup",
      text: "what should I call you?",
      input: {
        value: name,
        setValue: setName,
      },
      decisions: [
        {
          name: "submit",
          nextKey: "signup-email",
        },
        {
          name: "cancel",
          nextKey: prevKey,
        },
      ],
    },
    {
      key: "signup-email",
      text: "what's your email?",
      input: {
        value: email,
        setValue: setEmail,
      },
      decisions: [
        {
          name: "submit",
          nextKey: "signup-password",
        },
        {
          name: "cancel",
          nextKey: prevKey,
        },
      ],
    },
    {
      key: "signup-password",
      text: "what is your password? i won't look, i promise",
      input: {
        value: password,
        setValue: setPassword,
        type: "password",
      },
      decisions: [
        {
          name: "submit",
          nextKey: "signup-signup",
        },
        {
          name: "cancel",
          nextKey: prevKey,
        },
      ],
    },
    {
      key: "signup-signup",
      text: "signing up...",
      effect: async () => {
        if (!identity.exists) {
          setError(undefined);
          const result = await identity.signup(name, email, password);
          if (result.success) {
            return "signup-login";
          } else {
            setError(result.message);
            return "signup-error";
          }
        }
      },
    },
    {
      key: "signup-login",
      text: "logging in...",
      effect: async () => {
        if (!identity.exists) {
          setError(undefined);
          const result = await identity.login(email, password);
          if (result.success) {
            return "signup-background";
          } else {
            setError(result.message);
            return "signup-error";
          }
        }
      },
    },
    {
      key: "signup-background",
      text: "running a background check...",
      effect: async () => {
        setError(undefined);
        const result = await identity.fetch();
        if (result.success) {
          return nextKey;
        } else {
          setError(result.message);
          return "signup-error";
        }
      },
    },
    {
      key: "signup-error",
      text: `error: ${error}`,
      decisions: [
        {
          name: "try again",
          nextKey: "signup",
        },
        {
          name: "nevermind",
          nextKey: prevKey,
        },
      ],
    },
  ];
};
