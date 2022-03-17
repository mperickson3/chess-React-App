import React from "react";
import "./Boardspace.css";
import GamePiece from "./GamePiece";

const Boardspace1 = (props) => {
  let color = "";
  const num = parseInt(props.space.charCodeAt(0)) + parseInt(props.space[1]);
  if (num % 2 === 0) {
    color = "spaceBlack";
  } else {
    color = "spaceWhite";
  }

  const clickSpace = () => {
    //console.log(props.space);
    props.clickedPieceCheck(props.space);
  };

  return (
    <div className={color} onClick={clickSpace}>
      <GamePiece piece={props.gameStateTest[props.space]} key={props.piece} />
    </div>
  );
};

export default Boardspace1;
