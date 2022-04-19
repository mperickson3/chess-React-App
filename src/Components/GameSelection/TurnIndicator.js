import "./TurnIndicator.css";
const TurnIndicator = (props) => {
  let turnHighlight = "";
  if (props.turn === "w") {
    turnHighlight = "turnWhite";
  } else {
    turnHighlight = "turnBlack";
  }
  return <div className={turnHighlight}></div>;
};

export default TurnIndicator;
