export const generateHand = (shuffle = false) => {
  const hand = [];
  for (let i = 1; i <= 13; i++) {
    hand.push(i);
  }
  if (shuffle) {
    for (let i = 0; i < hand.length; i++) {
      let j = Math.floor(Math.random() * hand.length);
      let temp = hand[j];
      hand[j] = hand[i];
      hand[i] = temp;
    }
  }
  return hand;
};

export const getWinnerIndex = (bids) => {
  let maxCard = -1;
  // First determine the maximum bid
  for (let b of bids) {
    if (b > maxCard) {
      maxCard = b;
    }
  }
  let idx = null; // not found
  // Iterate through each bid to see if it
  // is the max card...
  for (let i = 0; i < bids.length; i++) {
    let bid = bids[i];
    // If this matches the max bid...
    if (bid === maxCard) {
      if (idx !== null) {
        // Duplicate -- if there are more than one
        // winning bid, then nobody wins!
        return -1;
      } else {
        // Otherwise, winning index will be this one
        // (unless we hit another winning bid as we
        // iterate through)
        idx = i;
      }
    }
  }
  return idx;
};
