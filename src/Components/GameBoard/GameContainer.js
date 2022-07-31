import { React, useState } from "react";
import TurnIcon from "../GameSelection/turnIcon";
import TurnIndicator from "../GameSelection/TurnIndicator";
import Board from "./Board";
import CapturedPieces from "./CapturedPieces";
import "./GameContainer.css";

const GameContainer = (props) => {
  let colorBottom = "";
  let colorTop = "";
  if (props.gameState["whitePlayer"] === props.username) {
    colorBottom = "whitePlayer";
    colorTop = "blackPlayer";
  } else {
    colorBottom = "blackPlayer";
    colorTop = "whitePlayer";
  }

  const [isActive, setIsActive] = useState(true);
  let borderSize = 0.25;

  setTimeout(() => {
    if (borderSize === 0) {
      borderSize = 25;
    } else {
      borderSize = 0;
    }
  }, 1000);

  return (
    <div>
      <div className="row">
        <div className="turnIconBalnce" />

        <div className="column">
          <div className="margin"> </div>

          <Player
            player={props.gameState[colorTop]}
            gameState={props.gameState}
            color={colorTop}
          ></Player>

          <Board
            gameState={props.gameState}
            boardVisible={props.boardVisible}
            movePiece={props.movePiece}
            apiTest={props.checkValidMove}
            username={props.username}
            getUserGamesTest={props.getUserGamesTest}
            turn={props.turn}
            setModalButtonsOk={props.setModalButtonsOk}
            setModalMessage={props.setModalMessage}
            setModalVis={props.setModalVis}
            deleteGameTest={props.deleteGameTest}
            setGameState={props.setGameState}
            setTurn={props.setTurn}
            authToken={props.authToken}
            gameNumber={props.gameNumber}
          ></Board>

          <Player
            player={props.gameState[colorBottom]}
            borderSize={borderSize}
            gameState={props.gameState}
            color={colorBottom}
          ></Player>
        </div>
        <TurnIndicator turn={props.turn}></TurnIndicator>
      </div>
    </div>
  );
};

export default GameContainer;

const Player = (props) => {
  return (
    <div
      className="playerInfo"
      // style={{ marginBottom: "10vh" }}
    >
      {/* <ActivePlayerIcon borderSize={props.borderSize} /> */}

      <div className="playerName">{props.player}</div>
      <CapturedPieces
        gameState={props.gameState}
        color={props.color}
      ></CapturedPieces>
    </div>
  );
};

const ActivePlayerIcon = (props) => {
  return (
    <div
      className="activePlayerIcon"
      style={{ border: props.borderSize }}
    ></div>
  );
};
