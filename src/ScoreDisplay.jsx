// Sam and Tristan
export const ScoreDisplay = ({ values = [] }) => {
  let sum = 0;
  values.forEach(
    (v)=>{
      sum = sum + v;
    }
  )
  
  return (
    <div>
      {sum}
    </div>
  );
};