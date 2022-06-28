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
    props.clickedPieceCheck(props.space);

    props.findValidMoves(props.piece, props.space, props.turn);

    if (props.availableMoves.includes(props.space)) {
    }
  };

  let moveradius = 0;
  let borderColor = "";

  if (props.availableMoves.includes(props.space)) {
    moveradius = 30;
    borderColor = "#d1ad6b";
  }

  if (props.piece.includes(props.piecesCheck)) {
    borderColor = "#ff0000";
  }

  return (
    <div
      className={spaceColor}
      onClick={clickSpace}
      style={{ borderColor: borderColor }}
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
