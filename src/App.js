import React, { useState } from "react";
import "./App.css";
import "./Components/Board";
import Board from "./Components/Board";
import axios from "axios";
import SaveGame from "./Components/UserInterface/saveGame";

//Matthew

const gameStateStart = {
  a1: "bRook1",
  b1: "bKnight1",
  c1: "bBishop1",
  d1: "bQueen1",
  e1: "bKing1",
  f1: "bBishop2",
  g1: "bKnight2",
  h1: "bRook2",
  a2: "bPawn1",
  b2: "bPawn2",
  c2: "bPawn3",
  d2: "bPawn4",
  e2: "bPawn5",
  f2: "bPawn6",
  g2: "bPawn7",
  h2: "bPawn8",

  a8: "wRook1",
  b8: "wKnight1",
  c8: "wBishop1",
  d8: "wQueen1",
  e8: "wKing1",
  f8: "wBishop2",
  g8: "wKnight2",
  h8: "wRook2",
  a7: "wPawn1",
  b7: "wPawn2",
  c7: "wPawn3",
  d7: "wPawn4",
  e7: "wPawn5",
  f7: "wPawn6",
  g7: "wPawn7",
  h7: "wPawn8",

  a3: "",
  b3: "",
  c3: "",
  d3: "",
  e3: "",
  f3: "",
  g3: "",
  h3: "",
  a4: "",
  b4: "",
  c4: "",
  d4: "",
  e4: "",
  f4: "",
  g4: "",
  h4: "",
  a5: "",
  b5: "",
  c5: "",
  d5: "",
  e5: "",
  f5: "",
  g5: "",
  h5: "",
  a6: "",
  b6: "",
  c6: "",
  d6: "",
  e6: "",
  f6: "",
  g6: "",
  h6: "",
};

function App() {
  const checkValidMove = async (moveFrom, moveTo, pieceName) => {
    console.log("apiTest Called");
    const api = "https://7zbikadls1.execute-api.us-east-2.amazonaws.com/dev";

    const data = {
      piece: pieceName,
      locationTo: moveTo,
      locationFrom: moveFrom,
      ...gameState,
    };

    //Return Axios call from the server
    return await axios

      //post the desired move and the current gameState to the API to check the move
      .post(api, data)
      //Get response
      .then((response) => {
        //Checking format and returning response
        console.log(response["data"]["body"]);
        console.log("Result " + response["data"]["moveLegal"]);
        return response["data"]["moveLegal"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
  };

  const [gameState, setGameState] = useState(gameStateStart);
  const [turn, setTurn] = useState("w");

  const movePiece = async (moveFrom, moveTo, piece) => {
    console.log("movePiece");
    // console.log(turn);
    if (turn === piece[0]) {
      const isValidMove = await checkValidMove(moveFrom, moveTo, piece);
      console.log(isValidMove);
      if (isValidMove) {
        setGameState((prevGameState) => {
          const newGameState = prevGameState;
          newGameState[moveFrom] = "";
          newGameState[moveTo] = piece;
          console.log("state set");
          return { ...newGameState };
        });
        setTurn((previousTurn) => {
          if (previousTurn === "w") {
            return "b";
          } else {
            return "w";
          }
        });
      }
    }
  };

  const changeGame = async (changedGame, userName, gameNumber, turn) => {
    console.log(changedGame);
    setGameState(() => {
      return changedGame;
    });
    console.log(turn);
    setTurn(turn);
  };

  return (
    <div className="App-header">
      {/*render board*/}
      <Board
        gameState={gameState}
        movePiece={movePiece}
        apiTest={checkValidMove}
      ></Board>
      <SaveGame
        gameState={gameState}
        turn={turn}
        changeGame={changeGame}
        gameStateStart={gameStateStart}
      />
    </div>
  );
}

export default App;
