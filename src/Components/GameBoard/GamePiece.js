import React from "react";
import "./GamePiece.css";

//Displays the piece on the corresponding space
//Last letter is taken out of its name which is used to number the pieces

const GamePiece = (props) => {
  const pieceName = props.piece.slice(0, -1);
  return (
    <div>
      {/* <div className="pieceText">{props.piece.slice(0, -1)}</div> */}

      <img src={props.icons[pieceName]} alt="" className="icon" />
    </div>
  );
};

export default GamePiece;
