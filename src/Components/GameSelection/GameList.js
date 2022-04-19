import React, { useEffect, useState } from "react";
import "./GameList.css";
import axios from "axios";
import Games from "./Games";
import Trash from "../Icons/garbage.png";
import Menu from "../Icons/menu.png";

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
        responseGames = response["data"]["games"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });

    // console.log(retrievedGameState);
    // props.changeGame(retrievedGameState, userName, gameNumber, turn);

    setGameLists(responseGames);
    props.gameVisible(false);
    // return responseGames;
    console.log(gameLists);
    toggleGameListVisible(true);
  };
  const newGame = async () => {
    // let newGameNumber = (gameLists.length + 1).toString();
    let newGameNumber = "0";
    if (gameLists.length > 0) {
      //If there are games in the game list set the new game number to 1 higher than the Highest internal unique gamenumber ID
      newGameNumber = (
        parseInt(gameLists[gameLists.length - 1]["gameNumber"]) + 1
      ).toString();
    }

    console.log("New Game Number: " + newGameNumber);
    // props.changeGame(props.newGameState, props.username, newGameNumber, "w");
    await props.saveGame(props.username, "w", newGameNumber, true); //Save the new game with the newgamenumber
    getUserGames();
    // props.gameVisible(true); //Display the newgame
    // toggleGameListVisible(false); //Turn off the game list menu
  };
  const deleteGame = async () => {
    //In Development!
    console.log("Delete Game to be built!");
    const deleteAPI =
      "https://mudw22xr23.execute-api.us-east-2.amazonaws.com/beta";
    let retrievedGameState = {
      //   userName: "testUser",
      //   gameNumber: "1",
      //   turn: props.turn,
      //   ...props.gameStateStart,
    };

    await axios

      //post the desired move and the current gameState to the API to check the move
      // .post(getAPI, { userName: props.username, gameNumber: props.gameNumber })
      .post(deleteAPI, {
        userName: props.username,
        gameNumber: props.gameNumber,
      })

      //Get response
      .then((response) => {
        console.log(response);
        //Checking format and returning response
        // retrievedGameState = response["data"]["gameState"];
        // responseGames = response["data"]["games"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });

    getUserGames();
    // return responseGames;
    console.log(gameLists);
  };

  return (
    <div className="column">
      {gameListVisible === true ? (
        //Display the new game and sign out button with the Game lsit
        <button className="newGameButton" onClick={newGame}>
          New Game
        </button>
      ) : (
        <div />
      )}
      {gameListVisible === false ? (
        <div>
          <button className="functionGameButton" onClick={getUserGames}>
            <img src={Menu} className="functionIcon" alt="Menu" />
          </button>
          <button className="functionGameButton" onClick={deleteGame}>
            <img src={Trash} className="functionIcon" alt="Trash" />
          </button>
        </div>
      ) : gameLists.length > 0 ? (
        // When there are games to display display the game list
        gameLists.map((gameInfo, index) => {
          return (
            <Games
              key={gameInfo["userName"] + gameInfo["gameNumber"]}
              userName={gameInfo["userName"]}
              //Game Number seen by the user will be the index of the array
              gameNumberDisplayed={index + 1}
              gameInfo={gameInfo}
              changeGame={props.changeGame}
              gameVisible={props.gameVisible}
              toggleGameListVisible={toggleGameListVisible}
            />
          );
        })
      ) : (
        <div />
      )}

      {gameListVisible === true ? (
        //Display the new game and sign out button with the Game lsit
        <button className="signOutButton" onClick={props.signOut}>
          Sign out
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default GameList;
