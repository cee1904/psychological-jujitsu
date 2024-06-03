export const playFirstCard = (target) => {
  let delta = Math.floor(Math.random() * 10 - 5);
  let value = target + delta;
  if (value < 1) {
    return 1;
  }
  if (value > 13) {
    return 13;
  }
  return value;
};

const inferRoundStrategy = (target, plays) => {
  // which was the higher card?
  let winningPlay = Math.max(...plays);
  // How much bigger was the highest than the target?
  let delta = winningPlay - target;
  return delta;
};

export const hinkleAi = {
  name: "Hinklenator", // a cute name
  icon: "-", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    // Play a random card!
    if (targets.length === 1) {
      // Separate strategy when we have no information
      return playFirstCard(targets[0]);
    }
    let lastTarget = targets[targets.length - 2];
    // strategy will be the "delta" that the opponent
    // added to the previous target...
    let lastRoundStrategy = inferRoundStrategy(
      // last target...
      lastTarget,
      // last card played by each opponent
      opponentPlays.map((plays) => plays[plays.length - 1])
    );
    console.log("Last round was ", lastTarget);
    console.log("The winning strategy was +", lastRoundStrategy);
    let nextTarget = targets[targets.length - 1];
    let idealPlay = nextTarget + lastRoundStrategy + 1;
    console.log("This round is:", nextTarget);
    console.log("I want to play", idealPlay);
    if (hand.includes(idealPlay)) {
      console.log("And I can!");
      return idealPlay;
    } else {
      console.log("But I do not have it, so I will give up");
      console.log("and play my lowest card from ", hand);
      return Math.min(...hand);
    }
  },
};
