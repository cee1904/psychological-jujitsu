export const Card = ({
  suit="heart", value=4, onClick=()=>{}
}) => {
  //  if (value === "K") {
 //   value = 13;
 // } else if (value === "Q") {
   // value = 12;
//  } else if (value === "J") {
  //  value = 11;
 // } else if (value === "A") {
  //  value = 1;
  //} else {
  //  value = value;} 
  
  return (
    <div onClick={onClick}>
      {suit} {value} {onClick}
    </div>
  )
}