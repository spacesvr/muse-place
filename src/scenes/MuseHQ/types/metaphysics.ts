export type Idea = {
  mediation: number; // [0, 1)
  specificity: number; // [0, 1]
  utility: number; // [0, 1]
};

export type Decision = {
  name: string;
  action: (setIndex: (n: number) => void) => void;
};

export type Interaction = {
  text: string;
  decisions?: Decision[];
};
