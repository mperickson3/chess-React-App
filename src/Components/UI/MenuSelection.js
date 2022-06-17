import React from "react";
import GameList from "../GameSelection/GameList";
import "./App.css";

const MenuSelection = (props) => {
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

  return (
    <div>
      <button className="newGameButton" onClick={newGame}>
        New Game
      </button>
      <GameList
        username={user.username}
        gameNumber={gameNumber}
        changeGame={changeGame}
        newGameState={newGameState}
        gameVisible={gameVisible}
        saveGame={saveGame}
        signOut={signOut}
        turn={turn}
        getToken={getToken}
        authToken={authToken}
        deleteGameModal={deleteGameModal}
        gameListVisibleTest={gameListVisibleTest}
        toggleGameListVisibleTest={toggleGameListVisibleTest}
        getUserGamesTest={getUserGamesTest}
        gameListsTest={gameListsTest}
      ></GameList>
      <button className="signOutButton" onClick={props.signOut}>
        Sign out
      </button>
    </div>
  );
};

export default MenuSelection;
