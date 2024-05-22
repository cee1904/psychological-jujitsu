//AP and AP
import { Card } from "./Card";

export const CardsPlayed = ({
  values = [],
  suit = "hearts",
}) => {
return ( <div>
{values.map(
  (value)=><Card value={value} suit={suit}/>
)
}
 Value= {values} 
 <br></br>
 Suit= {suit}
</div> );

} 