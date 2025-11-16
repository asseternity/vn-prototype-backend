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

// constructs
export class Character {
  id: string;
  name: string;
  portrait: string;
  current_speaker: boolean;

  constructor(id: string, name: string, portrait: string) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.current_speaker = false;
  }

  lastSpokeIndex(script: Script) {
    // scan backwards through the script
    for (let i = script.pastLines.length - 1; i >= 0; i--) {
      if (script.pastLines[i].speaker?.id === this.id) {
        return i;
      }
    }
    return -1; // has literally not spoken before
  }
}

class Player {
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

// nodes
type Line = {
  speaker: Character | null;
  text: string;
};

class Node {
  id: string;
  type: string;

  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
  }
}

class LineChainNode extends Node {
  lines: Line[];
  index: number;
  endingNode: ChoiceNode | SplitNode | null;

  constructor(
    id: string,
    lines: Line[],
    endingNode: ChoiceNode | SplitNode | null
  ) {
    super(id, "line");
    this.lines = lines;
    this.index = 0;
    this.endingNode = endingNode;
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

class ChoiceNode extends Node {
  choices: ChoiceOption[];
  constructor(id: string, choices: ChoiceOption[]) {
    super(id, "choice");
    this.choices = choices;
  }
}

class SplitNode extends Node {
  condition: string;
  true_node_id: string;
  false_node_id: string;

  constructor(
    id: string,
    condition: string,
    true_node_id: string,
    false_node_id: string
  ) {
    super(id, "split");
    this.condition = condition;
    this.true_node_id = true_node_id;
    this.false_node_id = false_node_id;
  }
}

class Script {
  player: Player;
  currentLineChainNode: LineChainNode;
  allNodes: Node[];
  pastLines: Line[];

  constructor(startingNode: LineChainNode, allNodes: Node[]) {
    this.player = new Player();
    this.currentLineChainNode = startingNode;
    this.allNodes = allNodes;
    this.pastLines = [];
  }

  flipLine(): Line | null {
    if (
      this.currentLineChainNode.index >= this.currentLineChainNode.lines.length
    ) {
      if (!this.currentLineChainNode.endingNode) {
        // no follow-up node, story dead-ended
        return null;
      } // check if it's a choice node
      if (this.currentLineChainNode.endingNode instanceof ChoiceNode) {
        return this.handleChoiceNode(this.currentLineChainNode.endingNode);
      }

      // check if it's a split node
      if (this.currentLineChainNode.endingNode instanceof ChoiceNode) {
        return this.handleSplitNode(this.currentLineChainNode.endingNode);
      }
    }

    const line =
      this.currentLineChainNode.lines[this.currentLineChainNode.index];
    this.currentLineChainNode.index++;
    return line;
  }

  handleChoiceNode(node: ChoiceNode): Line {
    // do whatever scripting logic you want
    // return the first line of whatever chain you pick
    throw new Error("not implemented");
  }

  handleSplitNode(node: SplitNode): Line {
    // check condition, pick a node, etc
    throw new Error("not implemented");
  }
}
