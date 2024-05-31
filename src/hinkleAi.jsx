export const hinkleAi = {
  name: "Hinkle Rules", // a cute name
  icon: "-", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    console.log("The hand is:", hand);
    console.log("The targets are:", targets);
    console.log("Opponent plays are: ", opponentPlays);
    let nextTarget = targets[targets.length - 1];
    if (nextTarget > 10) {
      // Find my highest card and play it...
      let max = hand[0];
      for (let i=1; i<hand.length; i++) {
        if (hand[i] > max) {
          max = hand[i];
        }
      }
      return max;
    }
    return hand[0];
  },
};
