import React, { useState, useEffect } from "react";
import GameList from "../GameSelection/GameList";
import lPawn from "../Icons/largePawn.png";
import MultiPlayer from "./multiplayer";
import Solo from "./solo";

const MenuSelection = (props) => {
  const [menuScreen, setMenuScreen] = useState("main");
  const [gameInput, setGameInput] = useState("");

  useEffect(() => {
    props.setSignInTestBool(false);
    props.getUserGamesTest();
    console.log(props.username);
    if (props.username === "multitest") {
      props.setModalMessage({
        title: "You have signed in as a test user",
        body: "Some changes may be overwritten",
      });
      console.log("MODAL");
      props.setModalVis(true);
      props.setModalButtonsOk(true);
    }
  }, []);

  const newGameMenu = () => {
    setMenuScreen("newGame");
  };
  const mainMenu = () => {
    setMenuScreen("main");
  };
  const newMultiplayer = () => {
    setMenuScreen("multiplayer");
    // props.setModalVis(true);
    // props.setModalButtonsOk(true);
  };
  const newGameLocal = async () => {
    // console.log("New Game Number: " + newGameNumber);
    // props.changeGame(props.newGameState, props.username, newGameNumber, "w");
    await props.saveGame(props.username); //Save the new game with the newgamenumber
    props.getUserGamesTest();
    // props.gameVisible(true); //Display the newgame
    // toggleGameListVisible(false); //Turn off the game list menu
    await setMenuScreen("main");

    // props.changeGame(props.gameStateStart, props.userName, newGameNumber, "w");
  };

  const newNetworkGame = async () => {
    await props.saveGame(
      props.username,
      gameInput["enteredGameNumber"],
      false,
      true
    );
    await props.getUserGamesTest();
    await setMenuScreen("main");
    // newMultiplayer("muliplayer");
  };

  const joinNetworkGames = async () => {
    console.log("Join");
    // props.setModalMessage({
    //   title: "Multiplayer games in progress",
    //   body: "Please go back",
    // });
    setMenuScreen("joinNetwork");
  };

  const gamenumberHandler = (event) => {
    // console.log(event.target.value);
    setGameInput((prevState) => {
      return { ...prevState, enteredGameNumber: event.target.value };
    });
    // console.log(gameInput);
  };

  const signOutHandler = async () => {
    props.setGameListsTest([]);
    await props.signOut();
    props.setSignInTestBool(true);
  };

  const joinGame = async () => {
    await props.saveGame(
      props.username,
      gameInput["enteredGameNumber"],
      true,
      true
    );
    await props.getUserGamesTest();
  };

  const currentGamesMenu = () => {
    setMenuScreen("current");
  };

  const menuOff = () => {};
  return (
    <div>
      {menuScreen === "newGame" && (
        <div className="column">
          <Solo newGameLocal={newGameLocal}></Solo>
          <MultiPlayer setMenuScreen={setMenuScreen}></MultiPlayer>

          <button className="signOutButton" onClick={mainMenu}>
            Back
          </button>
        </div>
      )}

      {menuScreen === "multiplayer" && (
        <div className="column">
          <button className="newGameButton" onClick={newNetworkGame}>
            Create Game
          </button>

          <input
            className="GameButton"
            type="text"
            id="gameNumber"
            placeholder="Enter Game Number"
            maxLength={4}
            onChange={gamenumberHandler}
          ></input>
          <button className="newGameButton" onClick={joinGame}>
            Join Game
          </button>
          <button className="signOutButton" onClick={newGameMenu}>
            Back
          </button>
        </div>
      )}

      {menuScreen === "joinNetwork" && (
        <div className="column">
          <button className="GameButton" onClick={joinGame}>
            Join Game
          </button>
          <input
            className="newGameButton"
            type="text"
            id="gameNumber"
            placeholder="Enter Game Number"
            maxLength={4}
            onChange={gamenumberHandler}
          ></input>
          <button className="signOutButton" onClick={newMultiplayer}>
            Back
          </button>
        </div>
      )}

      {menuScreen === "main" && props.gameListVisibleTest && (
        <div className="column">
          <img
            src={lPawn}
            className="pawnGraphic"
            width={150}
            height={196.5}
          ></img>
          <button className="newGameButton" onClick={newGameMenu}>
            New Game
          </button>
          <button className="GameButton" onClick={currentGamesMenu}>
            {" "}
            Current Games
          </button>
        </div>
      )}
      {menuScreen === "current" && (
        <div>
          <GameList
            username={props.username}
            gameNumber={props.gameNumber}
            changeGame={props.changeGame}
            newGameState={props.newGameState}
            boardVisible={props.boardVisible}
            saveGame={props.saveGame}
            signOut={props.signOut}
            turn={props.turn}
            getToken={props.getToken}
            authToken={props.authToken}
            deleteGameModal={props.deleteGameModal}
            gameListVisibleTest={props.gameListVisibleTest}
            toggleGameListVisibleTest={props.toggleGameListVisibleTest}
            getUserGamesTest={props.getUserGamesTest}
            gameListsTest={props.gameListsTest}
            setMenuScreen={setMenuScreen}
            setboardVisible={props.setboardVisible}
          ></GameList>
          {!props.boardVisible && (
            <button className="signOutButton" onClick={mainMenu}>
              Back
            </button>
          )}
        </div>
      )}
      {menuScreen === "main" && props.gameListVisibleTest && (
        <button className="signOutButton" onClick={signOutHandler}>
          Sign out
        </button>
      )}
    </div>
  );
};

export default MenuSelection;
