import { Hand } from "./Hand";
import { CardsPlayed } from "./CardsPlayed";
import { ScoreDisplay } from "./ScoreDisplay";

export const HumanPlayerArea = ({
  handValues,
  playedValues,
  cardsWon,
  suit,
  onCardPlayed,
}) => {
  return (
    <div>
      Player: Human!
      [Hand
      <Hand values={handValues} suit={suit} onCardPlayed={onCardPlayed}/>] [Played
      <CardsPlayed values={playedValues} suit={suit} />]
      <ScoreDisplay values = {cardsWon}/>
    </div>
  );
};
