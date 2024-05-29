import "./card.css";

export const Card = ({ suit = "heart", value = 4, onClick = () => {} }) => {
let displayValue = value;
if (value === 13){
  displayValue = "K"
}
if (value === 12){
  displayValue = "Q"
}
if (value === 11){
  displayValue = "J"
}
if (value === 1){
  displayValue = "A"
}
  return (
    <div className="card" onClick={onClick}>
            <div className='top'>
                <div className='number'>{displayValue}</div>
                <div className='symbol'><img className='symbol bottom' src={suitImages[suit]} alt={suit} /></div>
            </div>
            <div className='bottom'>
                <div className='number bottom'>{displayValue}</div>
                <div className='symbol bottom'><img className='symbol bottom' src={suitImages[suit]} alt={suit} /></div>
            </div>
    </div>
  );
};
const suitImages = {
  'hearts': 'hearts.png',
  'spades': 'spades.png',
  'diamonds': 'diamonds.png',
  'clubs': 'clubs.png'
};
