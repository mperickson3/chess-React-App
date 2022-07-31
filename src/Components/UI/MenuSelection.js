import React, { useState, useEffect } from "react";
import GameList from "../GameSelection/GameList";
import lPawn from "../Icons/largePawn.png";
import MultiPlayer from "./multiplayer";
import Solo from "./solo";
import Signout from "../Icons/signout.png";
import "./MenuSelection.css";
import MenuTitle from "./MenuTitle";
import Board from "../GameBoard/Board";

const MenuSelection = (props) => {
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
      // console.log("MODAL");
      props.setModalVis(true);
      props.setModalButtonsOk(true);
    }
  }, []);

  const newGameMenu = () => {
    props.setMenuScreen("newGame");
  };
  const mainMenu = () => {
    props.setMenuScreen("main");
  };
  const newMultiplayer = () => {
    props.setMenuScreen("multiplayer");
    // props.setModalVis(true);
    // props.setModalButtonsOk(true);
  };
  const newGameLocal = async () => {
    // console.log("New Game Number: " + newGameNumber);
    // props.changeGame(props.newGameState, props.username, newGameNumber, "w");
    let newGameNumber = await props.saveGame(props.username); //Save the new game with the newgamenumber
    await props.getUserGamesTest();
    // props.gameVisible(true); //Display the newgame
    // toggleGameListVisible(false); //Turn off the game list menu
    await props.setMenuScreen("main");
    await console.log(props.gameListsTest);
    let ghostGame = {
      ...props.gameStateStart,
      whitePlayer: props.username,
      blackPlayer: props.username,
    };
    await props.changeGame(ghostGame, props.username, newGameNumber, "w");
    // props.changeGame(props.gameStateStart, props.userName, newGameNumber, "w");
    props.setMenuScreen("game");
  };

  const newNetworkGame = async () => {
    let newGameNumber = await props.saveGame(
      props.username,
      gameInput["enteredGameNumber"],
      false,
      true
    );
    await props.getUserGamesTest();
    let ghostGame = {
      ...props.gameStateStart,
      whitePlayer: props.username,
      blackPlayer: "",
    };
    await props.changeGame(ghostGame, props.username, newGameNumber, "w");
    // props.changeGame(props.gameStateStart, props.userName, newGameNumber, "w");
    await props.setMenuScreen("game");
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
    props.setMenuScreen("current");
  };

  const gameBackHandler = async () => {
    await props.getUserGamesTest();
    await props.setMenuScreen("current");
  };

  const menuOff = () => {};
  return (
    <div>
      {props.menuScreen === "newGame" && (
        <div className="column">
          <MenuTitle MenuTitle={"New Game"} backSelect={mainMenu}></MenuTitle>
          <Solo newGameLocal={newGameLocal}></Solo>
          <MultiPlayer setMenuScreen={props.setMenuScreen}></MultiPlayer>

          {/* <button className="signOutButton" onClick={mainMenu}>
            Back
          </button> */}
        </div>
      )}

      {props.menuScreen === "multiplayer" && (
        <div className="column">
          <MenuTitle
            MenuTitle={"Multiplayer"}
            backSelect={newGameMenu}
          ></MenuTitle>

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
          {/* <button className="signOutButton" onClick={newGameMenu}>
            Back
          </button> */}
        </div>
      )}

      {props.menuScreen === "joinNetwork" && (
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

      {props.menuScreen === "main" && props.gameListVisibleTest && (
        <div>
          <button className="signOut" onClick={signOutHandler}>
            <img src={Signout} className="functionIcon"></img>
          </button>
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
        </div>
      )}
      {props.menuScreen === "current" && (
        <div>
          <MenuTitle
            MenuTitle={"Current Games"}
            backSelect={mainMenu}
          ></MenuTitle>

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
            setMenuScreen={props.setMenuScreen}
            setboardVisible={props.setboardVisible}
          ></GameList>
          {/* {!props.boardVisible && (
            <button className="signOutButton" onClick={mainMenu}>
              Back
            </button>
          )} */}
        </div>
      )}
      {props.menuScreen === "game" && (
        <div>
          <MenuTitle
            MenuTitle={"Game " + props.gameNumber}
            backSelect={gameBackHandler}
            deleteGameModal={props.deleteGameModal}
            menuScreen={props.menuScreen}
          ></MenuTitle>
        </div>
      )}
    </div>
  );
};

export default MenuSelection;
