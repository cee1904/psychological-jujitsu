import "./App.css";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { CardsPlayed } from "./CardsPlayed";
import { HumanPlayerArea } from "./HumanPlayerArea";
import { AISelector } from "./AISelector";
import { PlayerArea } from "./PlayerArea";
import { TargetArea } from "./TargetArea";
import { useEffect, useState } from "react";
import { orderedDummy, targetDummy } from "./dumbAi";
import { hinkleAi } from "./hinkleAi";
import { brucienAI } from "./brucienAi";
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
  const [availableAIs, setUpdatedAIs] = useState([
    orderedDummy,
    targetDummy,
    brucienAI,
    hinkleAi,
  ]);
  const [ais, setAIs] = useState([orderedDummy, targetDummy]);
  const [trash, setTrash] = useState([]);
  const [humanHand, setHumanHand] = useState(generateHand());
  // generate a hand for each AI -- will need new logic if we actually
  // change the number of AIs
  const [useHumanPlayer, setUseHumanPlayer] = useState(true);
  let players = [null, ...ais];

  const [hands, setHands] = useState(players.map((a) => generateHand()));
  const [targets, setTargets] = useState(generateHand(true));
  const [targetIndex, setTargetIndex] = useState(0);
  const [humanWon, setHumanWon] = useState([]);
  const [playedCards, setPlayedCards] = useState(players.map((a) => []));
  const [wonCards, setWonCards] = useState(players.map((a) => []));

  const handleAIChange = (newAIName, idx) => {
    // Find the new AI object based on the newAIName
    console.log(newAIName);

    let newAI = ais.find((ai) => ai.name === newAIName);
    if (!newAI) newAI = availableAIs.find((ai) => ai.name === newAIName);

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
    // 2. Remove played card from hand
    // Now iterate through the AI to find out the AI plays...
    // AI needs to know what cards we've bid on (targetsSoFar)

    // Make an array to store the decisions of each AI player...
    let humanCards = [humanCard];
    // Get each AI's play
    playAIs(humanCards);
  };

  const playAIs = (humanCards = []) => {
    let cardsPlayedThisRound = [];
    let targetsSoFar = targets.slice(0, targetIndex + 1);
    ais.forEach((ai) => {
      let myHand = hands[cardsPlayedThisRound.length];
      let myPlayed = playedCards[cardsPlayedThisRound.length];
      let card = ai.getNextCard(
        myHand,
        targetsSoFar,
        playedCards.filter((pp) => pp != myPlayed)
      );
      cardsPlayedThisRound.push(card);
    });
    cardsPlayedThisRound = [...cardsPlayedThisRound, ...humanCards];
    setPlayedCards(
      playedCards.map((played, idx) => [...played, cardsPlayedThisRound[idx]])
    );
    // Remove played cards from list of cards
    setHands(
      hands.map((hand, idx) =>
        hand.filter((card) => card !== cardsPlayedThisRound[idx])
      )
    );
    // Finally, let's update the winner and the target...
    // Pick the winner, and update...
    let winner = getWinnerIndex(cardsPlayedThisRound);
    if (winner === -1) {
      setTrash([...trash, targets[targetIndex]]);
    } else {
      const newWon = [...wonCards];
      newWon[winner] = [...newWon[winner], targets[targetIndex]];
      setWonCards(newWon);
    }
    setTargetIndex(targetIndex + 1);
  };

  const resetGame = () => {
    setTargets(generateHand(true));
    setHands(players.map((a) => generateHand()));
    setHumanHand(generateHand());
    setWonCards(players.map((a) => []));
    setPlayedCards(players.map((a) => []));
    setTrash([]);
    setTargetIndex(0);
  };

  useEffect(() => {
    if (useHumanPlayer) {
      setAIs(ais.slice(0, 2));
    } else {
      if (ais.length < 3) {
        setAIs([...ais, availableAIs[0]]);
      }
    }
  }, [useHumanPlayer]);

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

      {ais.map((ai, idx) => (
        <div className={`aiPlayer player-${idx + 1}`}>
          <AISelector
            selected={ai}
            ais={ais}
            onSelect={(newAI) => handleAIChange(newAI, idx)}
            idx={idx}
            allAIS={availableAIs}
          ></AISelector>

          <PlayerArea
            ai={ai}
            suit={otherSuits[idx]}
            hand={hands[idx]}
            playedValues={playedCards[idx]}
            cardsWon={wonCards[idx]}
          />
        </div>
      ))}
      {useHumanPlayer ? (
        <div className="human">
          <h2>Human Area</h2>
          <HumanPlayerArea
            onCardPlayed={onCardPlayed}
            handValues={hands[2]}
            playedValues={playedCards[2]}
            cardsWon={wonCards[2]}
            suit={otherSuits[2]}
          />
        </div>
      ) : (
        <div />
      )}

      <div className="round">
        {targetIndex <= 12 ? (
          <div>Round {targetIndex + 1}</div>
        ) : (
          <button onClick={resetGame}>New Game?</button>
        )}
        <button onClick={() => setUseHumanPlayer(!useHumanPlayer)}>
          Switch to {useHumanPlayer ? "All AI" : "Human player"}
        </button>
        <div class="instructions">
          {useHumanPlayer ? (
            "Click a Card to Play It"
          ) : (
            <button onClick={() => playAIs([])} disabled={targetIndex > 12}>
              Next Turn
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
