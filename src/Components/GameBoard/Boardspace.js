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
    // console.log(props.currentSpace);
    props.findValidMoves(props.piece, props.space);

    if (props.availableMoves.includes(props.space)) {
    }

    //Seeking to impliment a selected space color indicator
    // if (props.currentSpaceSelected === props.space) {
    //   setSpaceColor("spaceWhiteSelected");
    // } else {
    //   setSpaceColor("spaceBlack");
    // }
  };

  let moveradius = 0;
  if (props.availableMoves.includes(props.space)) {
    moveradius = 30;
  }

  return (
    <div
      className={spaceColor}
      onClick={clickSpace}
      style={{ borderRadius: moveradius }}
    >
      <GamePiece
        piece={props.gameStateTest[props.space]}
        key={props.piece}
        icons={props.icons}
      />
    </div>
  );
};

export default Boardspace;
