export const sortOfSmart = {
  name: "Brad", // a cute name
  icon: "https://generated.photos/human-generator/66572613aa0e81000fb3b298", // an image link
  getNextCard: (hand, targets, opponentPlays) => {
    // Function to evaluate card value (you can customize this based on your game's rules)
    const evaluateCardValue = (card) => {
      // Example: assume higher number cards are better
      return card.value; 
    };

    // Function to find the best card to play
    const findBestCard = (hand, targets, opponentPlays) => {
      let bestCard = null;
      let bestValue = -1;

      hand.forEach(card => {
        let cardValue = evaluateCardValue(card);

        // Additional strategy can be added here
        // Example: prioritize playing a card that matches the suit of the opponent's last play
        if (opponentPlays.length > 0 && card.suit === opponentPlays[opponentPlays.length - 1].suit) {
          cardValue += 10; // Giving higher priority to same suit
        }

        if (cardValue > bestValue) {
          bestValue = cardValue;
          bestCard = card;
        }
      });

      return bestCard;
    };

    // Get the best card from the hand
    return findBestCard(hand, targets, opponentPlays);
  },
};

