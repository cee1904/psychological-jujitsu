import {Card} from './Card.jsx';

export const Hand = ({values = [], suit = "hearts"}) => {

  
  return (
    <div>
      
    {
    values.map(
      (value)=>(
        <Card  
          suit = {suit}
          value = {value}
        />
      ))
    
    }
    </div>
    );     
}