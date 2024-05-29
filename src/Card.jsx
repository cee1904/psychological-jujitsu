import "./card.css";

export const Card = ({ suit = "heart", value = 4, onClick = () => {} }) => {
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
    <div className="card" onClick={onClick}>
      <div class="num top">{value} </div>
      <div class="value">{suit[0]}</div>
      <div class="num bottom">{value} </div>
    </div>
  );
};
