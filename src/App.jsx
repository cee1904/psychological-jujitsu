import "./App.css";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { CardsPlayed } from "./CardsPlayed";
import { HumanPlayerArea } from "./HumanPlayerArea";
import { AISelector } from "./AISelector";
import { PlayerArea } from "./PlayerArea";
import { TargetArea } from "./TargetArea";
import { useState } from "react";
import { orderedDummy, targetDummy } from "./dumbAi";

const generateHand = (shuffle = false) => {
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



const App = () => {
  const targetSuit = "hearts";
  const otherSuits = [
    "diamonds",
    "spades",
    "clubs",
    "lizards",
    "fruit",
    "tshirts",
    "robots",
  ];
  const [numberOfAIs, setNumberOfAIs] = useState(2); // may never change
  const [availableAIs,setUpdatedAIs] = useState([orderedDummy,targetDummy]);
  const [ais, setAIs] = useState([orderedDummy, targetDummy]);
  const [trash, setTrash] = useState([]);
  const [humanHand, setHumanHand] = useState(generateHand());
  // generate a hand for each AI -- will need new logic if we actually
  // change the number of AIs
  const [aiHands, setAIHands] = useState(ais.map((a) => generateHand()));
  const [targets, setTargets] = useState(generateHand(true));
  const [targetIndex, setTargetIndex] = useState(0);
  const [humanPlayed, setHumanPlayed] = useState([]);
  const [humanWon, setHumanWon] = useState([]);
  const [aiPlayed, setAIPlayed] = useState(ais.map((a) => []));
  const [aiWon, setAIWon] = useState(ais.map((a) => []));

  const handleAIChange = ( newAIName,idx) => {
    // Find the new AI object based on the newAIName
console.log(newAIName)

    let newAI = ais.find(ai => ai.name === newAIName);
    if (!newAI) newAI = availableAIs.find(ai => ai.name === newAIName);
  
    // Create a new list with the updated AI at the specified index
    const updatedAIs = [...ais];
    updatedAIs[idx] = newAI;
  
    // Update the state with the new AI list
    setAIs(updatedAIs);
  };
  /*
   * @return the index of winner, or -1 if no one wins
   */
  const getWinnerIndex = (bids) => {
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

  /*
   * onCardPlayed takes a single human play and then uses it to
   * trigger our AI plays which in turn trigger the update to the
   * game for the next round. Basically all the logic for each
   * round of the game is contained in onCardPlayed :-)
   */
  const onCardPlayed = (humanCard) => {
    // Update the human player first:
    // 1. add played card to "played" list
    setHumanPlayed([...humanPlayed, humanCard]);
    // 2. Remove played card from hand
    setHumanHand(humanHand.filter((v) => v !== humanCard));
    // Now iterate through the AI to find out the AI plays...
    // AI needs to know what cards we've bid on (targetsSoFar)
    let targetsSoFar = targets.slice(0, targetIndex + 1);
    // Make an array to store the decisions of each AI player...
    let aiCards = [];
    // Get each AI's play
    for (let idx = 0; idx < ais.length; idx++) {
      let hand = aiHands[idx];
      let played = aiPlayed[idx];
      let won = aiWon[idx];
      let ai = ais[idx];
      let card = ai.getNextCard(hand, targetsSoFar, [
        humanPlayed,
        // List all other AI plays except our own
        ...aiPlayed.filter((pp) => pp != played),
      ]);
      aiCards.push(card);
    }
    // Now we know all the cards being played!
    // Let's update the AI hands and played lists with their decisions
    // Add AI cards to played list...
    setAIPlayed(aiPlayed.map((played, idx) => [...played, aiCards[idx]]));
    // Remove played cards from list of cards
    setAIHands(
      aiHands.map((hand, idx) => hand.filter((card) => card !== aiCards[idx]))
    );
    // Finally, let's update the winner and the target...
    // Pick the winner, and update...
    let winner = getWinnerIndex([humanCard, ...aiCards]);
    if (winner === -1) {
      setTrash([...trash, targets[targetIndex]]);
    } else {
      if (winner === 0) {
        // human wins!
        setHumanWon([...humanWon, targets[targetIndex]]);
      } else {
        const newAiWon = [...aiWon];
        newAiWon[winner - 1] = [...newAiWon[winner - 1], targets[targetIndex]];
        setAIWon(newAiWon);
      }
    }
    setTargetIndex(targetIndex + 1);
  };

  const resetGame = () => {
    setTargets(generateHand(true));
    setAIHands(ais.map((a) => generateHand()));
    setHumanHand(generateHand());
    setHumanPlayed([]);
    setHumanWon([]);
    setAIWon(ais.map((a) => []));
    setAIPlayed(ais.map((a) => []));
    setTrash([]);
    setTargetIndex(0);
  };

  return (
    <main>
      <h1 className="header">Psychological Jujitsu</h1>
      <div className="target">
        <TargetArea
          target={targets[targetIndex]}
          trash={trash}
          suit={targetSuit}
        />
      </div>
      <div className="human">
        <h2>Human Area</h2>
        <HumanPlayerArea
          onCardPlayed={onCardPlayed}
          handValues={humanHand}
          playedValues={humanPlayed}
          cardsWon={humanWon}
          suit={otherSuits[0]}
        />
      </div>
      {ais.map((ai, idx) => (
        <div className={`aiPlayer player-${idx + 1}`}>
          
<AISelector
selected = {ai}
ais = {ais}
onSelect = {(newAI) => handleAIChange(newAI,idx)}
idx = {idx}
allAIS = {availableAIs}
>

  
</AISelector>

          <PlayerArea
            ai={ai}
            suit={otherSuits[idx + 1]}
            hand={aiHands[idx + 1]}
            playedValues={aiPlayed[idx]}
            cardsWon={aiWon[idx]}
          />
        </div>
      ))}

      <div className="round">
        {targetIndex <= 12 ? (
          <div>Round {targetIndex + 1}</div>
        ) : (
          <button onClick={resetGame}>New Game?</button>
        )}
      </div>
    </main>
  );
};

export default App;
