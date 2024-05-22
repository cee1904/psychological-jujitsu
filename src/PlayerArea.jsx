//Lil Diego and Lucien stuff
import { Card } from "./Card"
import {CardsPlayed} from "./CardsPlayed"
import {Hand} from "./Hand"
import {ScoreDisplay} from "./ScoreDisplay"


export const PlayerArea = ({playedValues = [5,6,7], cardsWon=[6,11,9], suit="heart", ai}) =>{
  return(<div>
    <CardsPlayed values={playedValues} suit={suit}/>
    <ScoreDisplay values={cardsWon}/>
    </div>
  )
}