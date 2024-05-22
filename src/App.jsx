import "./App.css";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { CardsPlayed } from "./CardsPlayed";
import { HumanPlayerArea } from "./HumanPlayerArea";
import { AISelector } from "./AISelector";
const App = () => {
  return (
    <main>
      {/* Starter Code provided by teacher 
          -- you can remove this once you've updated this file
       */}
      <AISelector ais={[{ name: "hi" }, { name: "foo" }]} />
      <HumanPlayerArea
        handValues={[3, 5, 10, 12]}
        playedValues={[1, 2, 4, 6, 7, 8, 9, 11, 13]}
        cardsWon={[10, 3, 5]}
        suit="Diamonds"
      />
    </main>
  );
};

export default App;
