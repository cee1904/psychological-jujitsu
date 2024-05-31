export const brucienAI = {
  name: "Brucien", // a cute name
  icon: "-", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    let nextTarget = targets[targets.length - 1];
    if (nextTarget < 13){
      let play = nextTarget + 1
      return play;
    }
    else{
      let play = hand[0]
      return play;
    }
    }
};