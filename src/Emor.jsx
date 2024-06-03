export const emoRAI = {
  name: "emoR", // a cute name
  icon: "-", // an image link
getNextCard: (hand, targets, opponentPlays) => {
  let weight = 0;
  let best;
  let cardsLeft = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  let cardOptions = []
  let nextTarget = targets[targets.length - 1];

  let handA = cardsLeft.filter((card)=>!opponentPlays[0].includes(card))
  let handB = cardsLeft.filter((card)=>!opponentPlays[1].includes(card))

if(opponentPlays.length >= 1) {

  if (nextTarget >= 10) {
    weight += 1;
    
    
      }

 opponentPlays.forEach(opponentCard => {
let cardindex = cardsLeft.findIndex(opponentCard)
cardsLeft = cardsLeft.splice(cardindex,1)

})

hand.forEach(card => {
cardsLeft.forEach(oCard => {

if (card >= nextTarget && weight >= 3){

if (card > oCard){

cardOptions.push(card)

}

}

 




})


});


}

  }
};
