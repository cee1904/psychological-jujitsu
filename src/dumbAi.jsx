export const targetDummy = {
  name: "Dummy", // a cute name
  icon: "-", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    let nextTarget = targets[targets.length - 1];
    return nextTarget;
  },
};

export const orderedDummy = {
  name: "Ordered", // a cute name
  icon: "-", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    return hand[0];
  },
};
