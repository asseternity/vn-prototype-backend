// frontend:
// - shows line nodes, line by line, as the player clicks
// - shows choices
// - sends which choice was made

// backend:
// - sends line nodes holds the "player" object
// - updates the player object on the DB based on choice made
// - sends choices
// - sends the next line node based on choice made or split node condition

/* ==========================================
 |             LINES AND NODES              |
 ========================================== */
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
  id: string;
  text: string;
  node_id: string;
  affected_stat: string;
  affected_amount: number;

  constructor(
    id: string,
    text: string,
    node_id: string,
    affected_stat: string,
    affected_amount: number
  ) {
    this.id = id;
    this.text = text;
    this.node_id = node_id;
    this.affected_stat = affected_stat;
    this.affected_amount = affected_amount;
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

/* ==========================================
 |               CONSTRUCTS                 |
 ========================================== */
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
    // apply stat changes to the player instance within script
    // add choice id to player.choices
    // assign the LineChainNode to script
    // return first Line
    throw new Error("not implemented");
  }

  handleSplitNode(node: SplitNode): Line {
    // check condition
    // pick a LineChainNode
    // assign it to script
    // return first Line
    throw new Error("not implemented");
  }
}
