import React, { useState } from "react";
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

  // if (props.space === props.currentSpace) {
  //   console.log("Same Thing" + props.space);
  // }

  const [spaceColor, setSpaceColor] = useState(color);

  const clickSpace = (event) => {
    //console.log(props.space);
    props.clickedPieceCheck(props.space);
    console.log(props.currentSpace);
    // props.setCurrentSpaceCheck(props.space);

    // if (props.currentSpaceSelected === props.space) {
    //   setSpaceColor("spaceWhiteSelected");
    // } else {
    //   setSpaceColor("spaceBlack");
    // }
  };

  const clickOffSpace = () => {
    console.log("Off Click");
  };

  return (
    <div className={spaceColor} onClick={clickSpace} onBlur={clickOffSpace}>
      <GamePiece piece={props.gameStateTest[props.space]} key={props.piece} />
    </div>
  );
};

export default Boardspace1;
