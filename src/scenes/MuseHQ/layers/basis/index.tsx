// @ts-ignore
import * as culori from "culori";
import { Decision, Interaction } from "../communication";

const MAGIC_NUM = 50000; // each char is roughly 100, so loop every ~50 chars

const hashStringToNum = (str: string): number => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count += str.substr(i, 1).charCodeAt(0);
  }
  return count;
};

/**
 * an idea is the fundamental atom of the ideal reality.
 * everything is an idea, whether the idea is accurately visualized or not.
 */
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

  setFromDecision(decision: Decision): Idea {
    const len = decision.name.length;

    this.mediation = (hashStringToNum(decision.name) % 5000) / 5000;
    this.specificity = (1 - (len === 0 ? 1 : 1 / len)) * 0.6;
    this.utility = decision.utility || 1 - 1 / decision.name.length;
    return this;
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

export class World {
  userId: number;
  name: string = "World";
  slug: string;
  rootIdea: string;
  rootIdeaVersion: string;

  constructor(obj: any) {
    if (obj.userId) this.userId = obj.userId;
    if (obj.name) this.name = obj.name;
    if (obj.slug) this.slug = obj.slug;
    if (obj.rootIdea) this.rootIdea = obj.rootIdea;
    if (obj.rootIdeaVersion) this.rootIdeaVersion = obj.rootIdeaVersion;
  }

  getIdeas(): Idea[] {
    const ideas: Idea[] = [];
    const NUM = 5000;

    ideas.push(
      new Idea({
        mediation:
          (hashStringToNum(this.name + this.slug + this.rootIdea) % NUM) / NUM,
        specificity: 0.3,
        utility: 0.8,
      })
    );

    if (ideas.length === 0) {
      ideas.push(new Idea());
    }

    return ideas;
  }
}
