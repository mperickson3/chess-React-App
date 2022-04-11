import React, { useEffect, useState } from "react";
import "./GameList.css";
import axios from "axios";
import Games from "./Games";
import { button } from "aws-amplify";
import UserFunctions from "./userFunctions";

const GameList = (props) => {
  const [gameListVisible, setGameListVisible] = useState(true);
  const toggleGameListVisible = (value) => {
    setGameListVisible(value);
  };

  useEffect(() => {
    getUserGames();
  }, []);

  const [gameLists, setGameLists] = useState([]);

  const getUserGames = async () => {
    const getAPI =
      "https://lqzqanzyeh.execute-api.us-east-2.amazonaws.com/default";
    let retrievedGameState = {
      //   userName: "testUser",
      //   gameNumber: "1",
      //   turn: props.turn,
      //   ...props.gameStateStart,
    };

    let gameNumber = props.gameNumber;
    let turn = "";
    let userName = "";
    let responseGames = [];

    await axios

      //post the desired move and the current gameState to the API to check the move
      // .post(getAPI, { userName: props.username, gameNumber: props.gameNumber })
      .post(getAPI, { userName: props.username, gameNumber: "1" })

      //Get response
      .then((response) => {
        // console.log(response);
        //Checking format and returning response
        retrievedGameState = response["data"]["gameState"];
        // console.log(response["data"]["games"][0]["userName"]);
        responseGames = response["data"]["games"];
        // console.log(response["data"]);
        // gameNumber = response["data"]["gameNumber"];
        // turn = response["data"]["gameState"]["turn"];
        // userName = response["data"]["userName"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
    // delete retrievedGameState["gameNumber"];
    // delete retrievedGameState["turn"];
    // delete retrievedGameState["userName"];

    // console.log(retrievedGameState);
    // props.changeGame(retrievedGameState, userName, gameNumber, turn);
    setGameLists(responseGames);
    props.gameVisible(false);
    // return responseGames;
    console.log(gameLists);
    toggleGameListVisible(true);
  };
  const newGame = () => {
    const newGameNumber = (gameLists.length + 1).toString();
    console.log("New Game");
    console.log((gameLists.length + 1).toString());
    props.saveGame(props.username, "w", newGameNumber, true);
    props.gameVisible(true);
    toggleGameListVisible(false);
  };

  return (
    <div className="column">
      {gameListVisible === false ? (
        <button className="saveGameButton" onClick={getUserGames}>
          Select Games
        </button>
      ) : (
        gameLists.map((gameInfo) => {
          return (
            <Games
              key={gameInfo["userName"] + gameInfo["gameNumber"]}
              userName={gameInfo["userName"]}
              gameNumber={gameInfo["gameNumber"]}
              gameInfo={gameInfo}
              changeGame={props.changeGame}
              gameVisible={props.gameVisible}
              toggleGameListVisible={toggleGameListVisible}
            />
          );
        })
      )}

      {gameListVisible === true ? (
        <div>
          <button className="saveGameButton" onClick={newGame}>
            New Game
          </button>
          <button className="saveGameButton" onClick={props.signOut}>
            Sign out {props.username}
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default GameList;
