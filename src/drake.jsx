
export const drake = {
  name: "Drake", // a cute name
  icon: "drake-icon.png", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    const randomRoyal = () => {
      const royals = hand.filter((card) => card > 10);
      const randomIndex = Math.floor(Math.random() * royals.length);
      return royals[randomIndex];
    }
    let nextTarget = targets[targets.length-1]
    let royalPlacer = 0
    if (nextTarget > 10){
      royalPlacer++;
    }
    if (royalPlacer > 0){

      royalPlacer --;
      return randomRoyal();
    }
    if (nextTarget < 10){
      return hand[0];
    }

  },
};