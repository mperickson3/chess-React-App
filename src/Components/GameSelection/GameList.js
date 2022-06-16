import React, { useEffect, useState } from "react";
import axios from "axios";
import Games from "./Games";
import Trash from "../Icons/garbage.png";
import Menu from "../Icons/menu.png";
import Auth from "aws-amplify";

const GameList = (props) => {
  const newGame = async () => {
    // let newGameNumber = (gameLists.length + 1).toString();
    let newGameNumber = "0";
    if (props.gameListsTest.length > 0) {
      //If there are games in the game list set the new game number to 1 higher than the Highest internal unique gamenumber ID
      newGameNumber = (
        parseInt(
          props.gameListsTest[props.gameListsTest.length - 1]["gameNumber"]
        ) + 1
      ).toString();
    }

    console.log("New Game Number: " + newGameNumber);
    // props.changeGame(props.newGameState, props.username, newGameNumber, "w");
    await props.saveGame(props.username, "w", newGameNumber, true); //Save the new game with the newgamenumber
    props.getUserGamesTest();
    // props.gameVisible(true); //Display the newgame
    // toggleGameListVisible(false); //Turn off the game list menu
  };

  const deleteGameConfirm = () => {
    props.deleteGameModal(props.username, props.gameNumber);
  };

  return (
    <div className="column">
      {props.gameListVisibleTest && (
        <button className="newGameButton" onClick={newGame}>
          New Game
        </button>
      )}
      {props.gameListVisibleTest === false ? (
        <div>
          <button
            className="functionGameButton"
            onClick={props.getUserGamesTest}
          >
            <img src={Menu} className="functionIcon" alt="Menu" />
          </button>
          <button className="functionGameButton" onClick={deleteGameConfirm}>
            <img src={Trash} className="functionIcon" alt="Trash" />
          </button>
        </div>
      ) : props.gameListsTest.length > 0 ? (
        // When there are games to display display the game list
        props.gameListsTest.map((gameInfo, index) => {
          return (
            <Games
              key={gameInfo["userName"] + gameInfo["gameNumber"]}
              userName={gameInfo["userName"]}
              //Game Number seen by the user will be the index of the array
              gameNumberDisplayed={index + 1}
              gameInfo={gameInfo}
              changeGame={props.changeGame}
              gameVisible={props.gameVisible}
              toggleGameListVisible={props.toggleGameListVisibleTest}
            />
          );
        })
      ) : (
        <div />
      )}

      {props.gameListVisibleTest === true ? (
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
