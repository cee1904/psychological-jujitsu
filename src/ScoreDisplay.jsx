import { Card } from "./Card";

// Sam and Tristan

export const ScoreDisplay = ({ values = [], suit= "hearts"}) => {
  let sum = 0;
  values.forEach(
    (v)=>{
      sum = sum + v;
    }
  )
  
  return (
    <div style={{display:"flex"}}>
      <div style={{position:"relative", width:400}}> 
      {values.map(
      (value,idx)=><div style={{left:30*idx, position:"absolute"}}><Card value={value} suit={suit}/></div>
)
}
</div>
<div>Score: {sum}</div>
    </div>
  );
};