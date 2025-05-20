export const jimminyCricketAI = {
  name: "Jimminy Cricket", // a cute name
  icon: "-", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    let nextTarget = targets[targets.length - 1];

    // Sort the hand in ascending order to easily find the lowest and highest cards
    hand.sort((a, b) => a - b);

    // Strategy based on next target value
    if (nextTarget >= 8) {
      // Play the highest card
      return hand[hand.length - 1];
    } else {
      // Play the lowest card that is greater than the next target
      for (let card of hand) {
        if (card > nextTarget) {
          return card;
        }
      }
      // If no such card, play the lowest card in hand
      return hand[0];
    }
  }
};


