import React from "react";
import "./GamePiece.css";

//Displays the piece on the corresponding space
//Last letter is taken out of its name which is used to number the pieces
const GamePiece = (props) => {
  return <div className="pieceText">{props.piece.slice(0, -1)}</div>;
};

export default GamePiece;
