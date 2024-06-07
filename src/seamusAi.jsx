let kingSeen = false;
export const seamusAi = {
  name: "Seamus", // a cute name
  icon: "", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    // Play a random card!
    let currentTarget = targets[targets.length - 1];
    let maxHand = hand[hand.length - 1];
    let minHand = hand[0];
    const randomNumber = (multiplier) => {
      return Math.floor(Math.random() * multiplier);
    };
    if (currentTarget == 13) {
      kingSeen = true;
      //If both opponents played their king already, play your king
      if (opponentPlays[0].includes(13) && opponentPlays[1].includes(13)) {
        return maxHand;
      }
      //If only one opponent played their king, flip a coin to play your king or play your lowest card
      else if (opponentPlays[0].includes(13) || opponentPlays[1].includes(13)) {
        let coinflip = randomNumber(2);
        if (coinflip == 0) {
          console.log("won coinflip, playing king");
          return maxHand;
        } else {
          console.log("lost coinflip, playing lowest card");
          return minHand;
        }
      }
      //If both opponents have their king, play your lowest card
      else {
        return minHand;
      }
    } else {
      if (targets[targets.length - 1] >= 10) {
        if (kingSeen == false) {
          return hand[hand.length - 2];
        } else if (kingSeen == true) {
          return maxHand;
        }
      } else {
        let choice = randomNumber(3);
        let counter = 3;
        let returnFound = false;
        while (counter > 0) {
          if (hand.includes(currentTarget + choice)) {
            returnFound = true;
            return currentTarget + choice;
          } else {
            counter -= 1;
            choice -= 1;
          }
        }
        if (returnFound == false) {
          return minHand;
        }
      }
    }
  },
};
