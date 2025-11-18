import {
  Line,
  LineChainNode,
  ChoiceNode,
  SplitNode,
  Node,
  Character,
} from "./master_types";

export const characters: Character[] = [
  {
    id: "player",
    name: "You",
    portrait: "portrait_test_1.png",
  },
  {
    id: "jordan",
    name: "Jordan",
    portrait: "portrait_test_2.png",
  },
  {
    id: "riley",
    name: "Riley",
    portrait: "portrait_test_3.png",
  },
  {
    id: "blake",
    name: "Blake",
    portrait: "portrait_test_4.png",
  },
  {
    id: "patel",
    name: "Ms. Patel",
    portrait: "portrait_test_5.png",
  },
];

const introHallway: LineChainNode = {
  id: "intro-hallway",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "First day back at Eastbridge High. Same chipped lockers, same flickering lights, same feeling in your stomach.",
    },
    {
      speakerId: "narrator",
      text: "You look like you’re about to fake your own death to avoid homeroom.",
    },
    {
      speakerId: "player",
      text: "If I disappear, erase my search history.",
    },
    {
      speakerId: "jordan",
      text: "Permission denied. Anyway, lunch plans? You actually deciding who you wanna be this year or just winging it again?",
    },
    {
      speakerId: "narrator",
      text: "The bell shrieks. Crowds surge toward the cafeteria like it’s a battlefield.",
    },
  ],
  endingNodeId: "choice-lunch-table",
};

const choiceLunchTable: ChoiceNode = {
  id: "choice-lunch-table",
  type: "choice",
  choices: [
    {
      id: "choice-study-with-jordan",
      text: "Sit with Jordan and go over notes for Ms. Patel’s class.",
      node_id: "lunch-with-jordan",
      stat: "smarts",
      amount: 2,
    },
    {
      id: "choice-sit-with-riley",
      text: "Sit with Riley and the popular crowd.",
      node_id: "lunch-with-riley",
      stat: "charm",
      amount: 2,
    },
    {
      id: "choice-sit-alone",
      text: "Sit alone in the corner and scroll on your phone.",
      node_id: "lunch-alone",
      stat: "optimismvspessimism",
      amount: -5,
    },
  ],
};

const lunchWithJordan: LineChainNode = {
  id: "lunch-with-jordan",
  type: "line",
  lines: [
    {
      speakerId: "jordan",
      text: "Okay, so Ms. Patel loves trick questions. If the answer looks easy, it’s probably a trap.",
    },
    {
      speakerId: "player",
      text: "So like people, basically.",
    },
    {
      speakerId: "jordan",
      text: "Exactly. Also, rumor is Riley is doing extra credit for her. Guess you’ll have competition.",
    },
    {
      speakerId: "narrator",
      text: "You feel your brain slowly waking up. Maybe you won’t tank this year after all.",
    },
  ],
  endingNodeId: "split-presentation-confidence",
};

const lunchWithRiley: LineChainNode = {
  id: "lunch-with-riley",
  type: "line",
  lines: [
    {
      speakerId: "riley",
      text: "Hey, over here! We saved you a spot.",
    },
    {
      speakerId: "player",
      text: "You… saved me a spot?",
    },
    {
      speakerId: "riley",
      text: "Relax, it’s not a blood pact. Yet. So, are you ready for Ms. Patel? She terrifies half the grade.",
    },
    {
      speakerId: "blake",
      text: "If you mess up the group presentation, we’re not going down with you. Just saying.",
    },
    {
      speakerId: "narrator",
      text: "You laugh it off, but the pressure creeps in under your skin.",
    },
  ],
  endingNodeId: "split-presentation-confidence",
};

const lunchAlone: LineChainNode = {
  id: "lunch-alone",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "You take the empty table by the vending machine, where the light flickers like it’s judging you.",
    },
    {
      speakerId: "player",
      text: "At least my phone can’t be disappointed in me. Yet.",
    },
    {
      speakerId: "narrator",
      text: "You scroll through endless feeds while laughter erupts from the other tables. Notifications: zero. Vibes: also zero.",
    },
    {
      speakerId: "narrator",
      text: "Somewhere across the room, Jordan and Riley are both mid-conversation with other people.",
    },
  ],
  endingNodeId: "split-presentation-confidence",
};

const splitPresentationConfidence: SplitNode = {
  id: "split-presentation-confidence",
  type: "split",
  // This is a string the backend can parse and evaluate against the User:
  // e.g., "smarts >= 2" (after lunch-with-jordan you should pass this easily)
  condition: "smarts >= 2",
  trueNodeId: "class-presentation-confident",
  falseNodeId: "class-presentation-panic",
};

const classPresentationConfident: LineChainNode = {
  id: "class-presentation-confident",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "Ms. Patel’s classroom smells like dry-erase markers and stress.",
    },
    {
      speakerId: "patel",
      text: "Group three, you’re up.",
    },
    {
      speakerId: "riley",
      text: "Ready?",
    },
    {
      speakerId: "player",
      text: "I was born ready. Or at least, lunch-ready.",
    },
    {
      speakerId: "narrator",
      text: "You start speaking. The words actually line up with the thoughts in your head for once.",
    },
    {
      speakerId: "patel",
      text: "Solid structure. You clearly prepared. I expect to see this level of effort all semester.",
    },
    {
      speakerId: "narrator",
      text: "You catch Riley’s tiny smile and Jordan’s thumbs-up from the back row.",
    },
  ],
  endingNodeId: "choice-after-class",
};

const classPresentationPanic: LineChainNode = {
  id: "class-presentation-panic",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "Ms. Patel’s classroom feels ten degrees hotter than the hallway.",
    },
    {
      speakerId: "patel",
      text: "Group three, let’s hear it.",
    },
    {
      speakerId: "narrator",
      text: "Your brain decides that now is the perfect time to blue-screen.",
    },
    {
      speakerId: "player",
      text: "So… uh… our project is…",
    },
    {
      speakerId: "blake",
      text: "(whispering) Seriously?",
    },
    {
      speakerId: "riley",
      text: "We analyzed how social expectations shape identity…",
    },
    {
      speakerId: "narrator",
      text: "Riley swoops in, covering the gaps while you stare at the floor and pretend it’s part of the performance.",
    },
    {
      speakerId: "patel",
      text: "This would have been stronger with even basic preparation from everyone.",
    },
  ],
  endingNodeId: "choice-after-class",
};

const choiceAfterClass: ChoiceNode = {
  id: "choice-after-class",
  type: "choice",
  choices: [
    {
      id: "choice-talk-to-riley",
      text: "Catch up with Riley after class and actually talk about the project.",
      node_id: "corridor-with-riley",
      stat: "heartvsmind",
      amount: 5,
    },
    {
      id: "choice-stand-up-to-blake",
      text: "Confront Blake about their attitude in front of your locker.",
      node_id: "locker-confrontation",
      stat: "power",
      amount: 3,
    },
    {
      id: "choice-walk-home-with-jordan",
      text: "Ignore the drama and walk home with Jordan.",
      node_id: "walk-home-with-jordan",
      stat: "forcefulvsaccomodating",
      amount: -3,
    },
  ],
};

const corridorWithRiley: LineChainNode = {
  id: "corridor-with-riley",
  type: "line",
  lines: [
    {
      speakerId: "player",
      text: "Hey, about the presentation… thanks for saving it from spontaneous combustion.",
    },
    {
      speakerId: "riley",
      text: "You were nervous. That’s not illegal. But you’re smarter than you acted back there.",
    },
    {
      speakerId: "player",
      text: "You barely know me.",
    },
    {
      speakerId: "riley",
      text: "I know you stayed awake in class last week. That already sets you apart.",
    },
    {
      speakerId: "narrator",
      text: "There’s a pause. Not awkward, just loaded.",
    },
    {
      speakerId: "riley",
      text: "Ms. Patel’s doing another project next month. We could partner again, if you, y’know, actually prep this time.",
    },
    {
      speakerId: "narrator",
      text: "Your chest feels annoyingly light. This could actually be something.",
    },
  ],
  endingNodeId: "split-late-night-mood",
};

const lockerConfrontation: LineChainNode = {
  id: "locker-confrontation",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "Blake slams their locker shut so hard it echoes.",
    },
    {
      speakerId: "player",
      text: "You wanna keep glaring or actually say what your problem is?",
    },
    {
      speakerId: "blake",
      text: "My problem is I’m not trying to fail because you froze up.",
    },
    {
      speakerId: "player",
      text: "I messed up. You could’ve helped instead of making it worse.",
    },
    {
      speakerId: "narrator",
      text: "Blake looks away, jaw tight.",
    },
    {
      speakerId: "blake",
      text: "Whatever. Next time, just don’t fold.",
    },
    {
      speakerId: "narrator",
      text: "You walk away shaking, but weirdly lighter. Maybe power isn’t about winning, just not shrinking.",
    },
  ],
  endingNodeId: "split-late-night-mood",
};

const walkHomeWithJordan: LineChainNode = {
  id: "walk-home-with-jordan",
  type: "line",
  lines: [
    {
      speakerId: "jordan",
      text: "So, how bad was the academic crime scene?",
    },
    {
      speakerId: "player",
      text: "Could’ve been worse. Nobody cried. Out loud.",
    },
    {
      speakerId: "jordan",
      text: "Progress. Tiny, tragic progress.",
    },
    {
      speakerId: "narrator",
      text: "You fall into step together, sneakers hitting the cracked sidewalk in sync.",
    },
    {
      speakerId: "jordan",
      text: "You don’t have to impress anyone, you know. You just have to not give up on yourself.",
    },
    {
      speakerId: "player",
      text: "Since when did you become emotionally competent?",
    },
    {
      speakerId: "jordan",
      text: "Don’t spread it around. I’ve got a reputation.",
    },
    {
      speakerId: "narrator",
      text: "The day ends softer than it started. Maybe tomorrow won’t be a disaster.",
    },
  ],
  endingNodeId: "split-late-night-mood",
};

const lateNightSplit: SplitNode = {
  id: "split-late-night-mood",
  type: "split",
  condition: "optimismvspessimism >= 50",
  trueNodeId: "late-night-hopeful",
  falseNodeId: "late-night-dreading",
};

const lateNightHopeful: LineChainNode = {
  id: "late-night-hopeful",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "Lying in bed, you replay the day. It wasn’t perfect, but it wasn’t hopeless either.",
    },
    {
      speakerId: "player",
      text: "Maybe this year doesn’t have to be a repeat.",
    },
  ],
  endingNodeId: null,
};

const lateNightDreading: LineChainNode = {
  id: "late-night-dreading",
  type: "line",
  lines: [
    {
      speakerId: "narrator",
      text: "The ceiling stares back at you, glowing faintly with streetlight shadows.",
    },
    {
      speakerId: "player",
      text: "New year, same chaos.",
    },
  ],
  endingNodeId: null,
};

// Export a lookup map
export const nodesById: Record<string, Node> = {
  [introHallway.id]: introHallway,
  [choiceLunchTable.id]: choiceLunchTable,
  [lunchWithJordan.id]: lunchWithJordan,
  [lunchWithRiley.id]: lunchWithRiley,
  [lunchAlone.id]: lunchAlone,
  [splitPresentationConfidence.id]: splitPresentationConfidence,
  [classPresentationConfident.id]: classPresentationConfident,
  [classPresentationPanic.id]: classPresentationPanic,
  [choiceAfterClass.id]: choiceAfterClass,
  [corridorWithRiley.id]: corridorWithRiley,
  [lockerConfrontation.id]: lockerConfrontation,
  [walkHomeWithJordan.id]: walkHomeWithJordan,
  [lateNightSplit.id]: lateNightSplit,
  [lateNightHopeful.id]: lateNightHopeful,
  [lateNightDreading.id]: lateNightDreading,
};
