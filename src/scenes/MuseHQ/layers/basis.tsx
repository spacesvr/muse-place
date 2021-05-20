// @ts-ignore
import * as culori from "culori";

export type Decision = {
  name: string;
  action: (setIndex: (n: number) => void) => void;
};

export type Interaction = {
  text: string;
  input?: [string, (s: string) => void];
  decisions?: Decision[];
};

export type Dialogue = {
  key: string;
  effect?: (setIndex: (n: number) => void) => void;
} & Interaction;

const MAGIC_NUM = 50000; // each char is roughly 100, so loop every ~50 chars

const hashStringToNum = (str: string): number => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count += str.substr(i, 1).charCodeAt(0);
  }
  return count;
};

export class Idea {
  mediation: number; // [0, 1)
  specificity: number; // [0, 1]
  utility: number; // [0, 1]

  constructor(p?: {
    m?: number;
    s?: number;
    u?: number;
    mediation?: number;
    specificity?: number;
    utility?: number;
  }) {
    this.mediation = p?.m || p?.mediation || 0;
    this.specificity = p?.s || p?.specificity || 0;
    this.utility = p?.u || p?.utility || 0.5;
    return this;
  }

  setFromDecision(decision: Decision) {
    const len = decision.name.length;

    this.mediation = (hashStringToNum(decision.name) % 5000) / 5000;
    this.specificity = (1 - (len === 0 ? 1 : 1 / len)) * 0.6;
    this.utility = 1 - 1 / decision.action.toString().length;
  }

  setFromInteraction(interaction: Interaction) {
    const len = interaction.text.length;

    this.mediation =
      (hashStringToNum(interaction.text) % MAGIC_NUM) / MAGIC_NUM;
    this.specificity = (1 - (len == 0 ? 1 : 1 / len)) * 0.5;
    this.utility = interaction.decisions ? 0.75 : 0.5;

    return this;
  }

  getHex(): string {
    const fixedColor = culori.rgb({
      mode: "oklch",
      l: this.utility,
      c: this.specificity * 0.322,
      h: this.mediation * 360,
    });

    return culori.formatHex(fixedColor);
  }
}
