import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { proxy } from "valtio";
import fetch, { RequestInit } from "node-fetch";
import { analytics } from "../utils/analytics";

const TOKEN_ID = "muse-jwt";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
type Response = { message?: string; success: boolean };

export class Identity {
  exists: boolean;
  name: string | undefined;
  email: string | undefined;
  token: string | undefined;
  groups: string[] | undefined;

  constructor() {
    this.exists = false;
    this.name = undefined;
    this.email = undefined;
    this.groups = undefined;

    this.token = localStorage.getItem(TOKEN_ID) || undefined;
  }

  async login(email: string, password: string): Promise<Response> {
    const params: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`${URL}/auth/sign_in`, params);
    const json = await response.json();

    analytics.capture("login", { email });

    if (response.status === 200) {
      localStorage.setItem(TOKEN_ID, json.token);
      this.token = json.token;
    }

    return { success: response.status === 200, message: json.message };
  }

  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<Response> {
    const params: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        code: "muse-yc-21",
      }),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`${URL}/auth/sign_up`, params);
    const json = await response.json();

    analytics.capture("signup", { name, email });

    return { success: response.status === 200, message: json.message };
  }

  async fetch(): Promise<Response> {
    if (!this.token) {
      return { success: false, message: "not logged in" };
    }

    const params: RequestInit = {
      headers: { Authorization: `bearer ${this.token}` },
    };

    const response = await fetch(`${URL}/auth/user_info`, params);
    const json = await response.json();

    if (response.status === 200) {
      this.name = json.name;
      this.email = json.email;
      this.groups = json.groups;
      console.log(this);
      analytics.identify(json.email, { name: this.name });
    }

    return { success: response.status === 200, message: json.message };
  }
}

type IdentityState = { identity: Identity };

export const IdentityContext = createContext<IdentityState>(
  {} as IdentityState
);

export function useIdentity(): Identity {
  return useContext(IdentityContext).identity;
}

export function IdentityLayer(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;

  const identity = proxy<IdentityState>({ identity: new Identity() });

  return (
    <IdentityContext.Provider value={identity}>
      {children}
    </IdentityContext.Provider>
  );
}
