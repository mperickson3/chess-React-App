import React, { useState } from "react";
import "./Boardspace.css";
import GamePiece from "./GamePiece";

const Boardspace = (props) => {
  let color = "";
  const num = parseInt(props.space.charCodeAt(0)) + parseInt(props.space[1]);
  //Used to set the color of the space
  if (num % 2 === 0) {
    color = "spaceBlack";
  } else {
    color = "spaceWhite";
  }

  const [spaceColor, setSpaceColor] = useState(color);

  const clickSpace = (event) => {
    //console.log(props.space);
    props.clickedPieceCheck(props.space);
    console.log(props.currentSpace);

    // if (props.currentSpaceSelected === props.space) {
    //   setSpaceColor("spaceWhiteSelected");
    // } else {
    //   setSpaceColor("spaceBlack");
    // }
  };

  return (
    <div className={spaceColor} onClick={clickSpace}>
      <GamePiece
        piece={props.gameStateTest[props.space]}
        key={props.piece}
        icons={props.icons}
      />
    </div>
  );
};

export default Boardspace;
