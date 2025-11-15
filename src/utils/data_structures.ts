// - Player class that holds an empty array of strings and every stat as public field
// - Script inits a this.Player instance in constructor
// - Lines are an array of nodes: line, choice, split.
// Script walks forward through nodes and returns a chain of sequential lines until it hits a choice or split node.
// o choice node:
//     - Each choice option updates player stats.
//     - Script auto-creates a string per choice (e.g. chose_X).
//     - Each choice leads to a new chain start index.
// o split node:
//     - Checks player booleans/stats.
//     - Picks the correct next index.
//     - Ends the current chain.
//     - FE sends user choices to BE; BE handles all state updates and next-node logic.
//     - FE never predicts story flow; BE computes next chain every time.

export class Player {
  stat1: number;
  stat2: number;
  stat3: number;

  trait1: number;
  trait2: number;
  trait3: number;

  choices: string[];

  constructor() {
    this.stat1 = 0;
    this.stat2 = 0;
    this.stat3 = 0;

    this.trait1 = 50;
    this.trait2 = 50;
    this.trait3 = 50;

    this.choices = [];
  }
}

class Node {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}

export class LineNode extends Node {
  text: string;

  constructor(text: string) {
    super("line");
    this.text = text;
  }
}

class ChoiceOption {
  text: string;
  node_id: string;

  constructor(text: string, node_id: string) {
    this.text = text;
    this.node_id = node_id;
  }
}

export class ChoiceNode extends Node {
  choices: ChoiceOption[];
  constructor(choices: ChoiceOption[]) {
    super("choice");
    this.choices = choices;
  }
}

export class SplitNode extends Node {
  condition: string;
  true_node_id: string;
  false_node_id: string;

  constructor(condition: string, true_node_id: string, false_node_id: string) {
    super("split");
    this.condition = condition;
    this.true_node_id = true_node_id;
    this.false_node_id = false_node_id;
  }
}
