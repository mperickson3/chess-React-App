import React, { useEffect, useState } from "react";
import "./App.css";
import "./Components/GameBoard/Board";
import Board from "./Components/GameBoard/Board";
import axios from "axios";
import { withAuthentication, Authenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth, AuthState } from "aws-amplify";
import config from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import GameList from "./Components/GameSelection/GameList";
import TurnIndicator from "./Components/GameSelection/TurnIndicator";
import ErrorModal from "./Components/UI/ErrorModal";
import MenuSelection from "./Components/UI/MenuSelection";
Amplify.configure(config);

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
  wKing: "e8",
  bKing: "e1",
};
const newGameState = { ...gameStateStart };

function App() {
  const [gameState, setGameState] = useState(gameStateStart);
  const [turn, setTurn] = useState("w");
  const [gameNumber, setGameNumber] = useState("0");
  const [boardVisible, setboardVisible] = useState(false);
  const [modal, setModalVis] = useState(false);
  const [menuScreen, setMenuScreen] = useState("main");
  const [modalMessage, setModalMessage] = useState({
    title: "",
    body: "",
  });
  const [modalButtons, setModalButtons] = useState(false);
  const [modalButtonsOk, setModalButtonsOk] = useState(false);

  const [testSignInUser, setTestSignInUser] = useState(
    "Sign in as a test user"
  );
  const [waterMark, setWaterMark] = useState("");
  const [gameListsTest, setGameListsTest] = useState([]);
  const [gameListVisibleTest, setGameListVisibleTest] = useState(true);

  const authToken = Auth.currentSession().then((data) => {
    // console.log(data["idToken"]);
    return data["idToken"]["jwtToken"];
  });
  const [signInTestBool, setSignInTestBool] = useState(true);

  const [userName1, setUserName1] = useState("");

  const checkValidMove = async (moveFrom, moveTo, pieceName, username) => {
    // console.log("apiCheckMove Called");
    console.log(gameState);
    const api =
      "https://fvhal8jc98.execute-api.us-east-2.amazonaws.com/multiplayerTest";

    const data = {
      piece: pieceName,
      locationTo: moveTo,
      locationFrom: moveFrom,
      userName: username,
      gameNumber: gameNumber,
      turn: turn,
      ...gameState,
    };
    // console.log("gameNumber: " + gameNumber);

    const token = await Auth.currentSession().then((data) => {
      // console.log(data["idToken"]);
      return data["idToken"]["jwtToken"];
    });
    //Return Axios call from the server
    return await axios

      //post the desired move and the current gameState to the API to check the move
      .post(api, data, {
        headers: {
          authorization: token,
        },
      })
      //Get response
      .then((response) => {
        //Checking format and returning response
        console.log(response["data"]);
        console.log(response["data"]["body"]);
        console.log("Result " + response["data"]["moveLegal"]);
        if (!response["data"]["testSync"]) {
          setModalMessage({
            title: "Desync detected",
            body: "You will be brought back to the game selection screen",
          });
          setModalVis(true);
          setTimeout(() => {
            window.location.reload();
          }, 10000);
        }
        if (!response["data"]["Turn"]) {
          setModalMessage({
            title: "It is not your turn",
            body: "Please wait your turn",
          });
          setModalButtonsOk(true);
          setModalVis(true);
        }
        return response["data"]["moveLegal"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
  };

  const movePiece = async (moveFrom, moveTo, piece, username) => {
    // console.log("movePiece function executed");
    console.log(username);
    //check to see if the current turn is the same color as the piece being moved
    if (turn === piece[0]) {
      //Calls the check valid move function This function will return a promise object until a response is recieved
      //Await is needed to ensure the checks do not execute prior to recieving the response
      const isValidMove = await checkValidMove(
        moveFrom,
        moveTo,
        piece,
        username
      );
      // console.log(isValidMove);
      if (isValidMove) {
        //If the move is valid from the server set the game state to the new game state
        setGameState((prevGameState) => {
          //Create newGameState clone and upate the object to respect the moved piece
          const newGameState = prevGameState;
          newGameState[moveFrom] = "";
          newGameState[moveTo] = piece;
          if (turn === "w") {
            // saveGame(username, "b");
            newGameState["turn"] = "b";
          } else {
            // saveGame(username, "w");
            newGameState["turn"] = "w";
          }

          return { ...newGameState };
        });
        setTurn((previousTurn) => {
          //Update the player turn
          if (previousTurn === "w") {
            // saveGame(username, "b");
            return "b";
          } else {
            // saveGame(username, "w");
            return "w";
          }
        });
      }
      // return true;
    }
  };

  //This function creates a new game. Game state is defined in serverless function
  async function saveGame(
    username,
    newGameNumber = "0",
    joinGame = false,
    multiPlayer = false
  ) {
    const saveAPI =
      "https://vyhkeclbph.execute-api.us-east-2.amazonaws.com/Create-Game-API";

    //If a new game is selected the JSON object will take the starting position of the game state

    let data = {
      userName: username,
      gameNumber: newGameNumber,
      joinGame: joinGame,
      multiPlayer: multiPlayer,
    };

    // console.log(data);
    //Change game function needs to be called for a new game but not when a piece is moved

    const token = await Auth.currentSession().then((data) => {
      // console.log(data["idToken"]);
      return data["idToken"]["jwtToken"];
    });

    return await axios

      //post the desired move and the current gameState to the API
      .post(saveAPI, data, {
        headers: {
          authorization: token,
        },
      })
      //Get response
      .then((response) => {
        //Checking format and returning response
        // console.log("Full Response: ");
        console.log(response["data"]);
        console.log("Response from Lamda Save: " + response["data"]["body"]);
        if (response["data"]["statusCode"] === 201) {
          // console.log("No New Game");
          setModalMessage({
            title: "New game could not be created",
            body: "Each user is limited to six games",
          });
          setModalVis(true);
          setModalButtonsOk(true);
        }
        if (response["data"]["gameType"] === "joined") {
          setModalMessage({
            title: "You have joined the game",
            body: "Have Fun!",
          });
          setModalVis(true);
          setModalButtonsOk(true);
        } else if (response["data"]["gameType"] === "notFound") {
          setModalMessage({
            title: "The game could not be found",
            body: "Please try another game number",
          });
          setModalVis(true);
          setModalButtonsOk(true);
        } else if (response["data"]["gameType"] === "full") {
          setModalMessage({
            title: "This game is already full",
            body: "Please try another game number",
          });
          setModalVis(true);
          setModalButtonsOk(true);
        }
        return response["data"]["newGameNumber"];
        // saveGameMessage(response["data"]["body"]);
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
  }

  const changeGame = async (changedGame, userName, gameNumber, turn) => {
    console.log("Change Game Called");
    // console.log(changedGame);
    setGameState(() => {
      return changedGame;
    });
    setGameNumber(gameNumber);
    gameVisible(true);
    toggleGameListVisibleTest(false);
    // console.log(turn);
    setTurn(turn);
  };

  const gameVisible = (value) => {
    //Takes a boolean to define if the gameboard is visibile
    console.log("Game Board Visible Trigger");
    setboardVisible(value);
  };

  const signInTest = async () => {
    await Auth.signIn("multiTest", "test1234");
    setTestSignInUser("Signed In");
    setWaterMark("This is a test session");
    window.location.reload();
    // Authenticator.SetAuthState(AuthState.SignedIn);
  };

  const getToken = async () => {
    const token = await Auth.currentSession().then((data) => {
      // console.log(data["idToken"]);
      return data["idToken"]["jwtToken"];
    });
    return token;
  };

  const deleteGameModal = async (userName, gameNumber) => {
    setModalMessage({
      title: "Are you sure you want to delete?",
      body: "",
    });
    setModalVis(true);
    setModalButtons(true);
    const thisUserName = await Auth.currentUserInfo().then((data) => {
      return data["username"];
    });
    setUserName1(thisUserName);
  };

  const deleteResult = async (deleteConfirmed) => {
    setModalVis(false);
    setModalButtons(false);
    setModalButtonsOk(false);
    // console.log(deleteConfirmed);

    if (deleteConfirmed) {
      await deleteGameTest();
      await setMenuScreen("current");
    }
  };

  const deleteGameTest = async () => {
    const deleteAPI =
      "https://b62dmtbp99.execute-api.us-east-2.amazonaws.com/multiplayerTest";

    const header = {
      headers: {
        // authorization: await props.getToken().toString(),
        authorization: authToken,
      },
    };

    const data = {
      userName: userName1,
      gameNumber: gameNumber,
      whitePlayer: gameState["whitePlayer"],
      blackPlayer: gameState["blackPlayer"],
    };
    // console.log(props.authToken);

    await axios

      //post the desired move and the current gameState to the API to check the move
      // .post(getAPI, { userName: props.username, gameNumber: props.gameNumber })
      .post(deleteAPI, data, header)

      //Get response
      .then((response) => {
        console.log(response);
        //Checking format and returning response
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });

    await getUserGamesTest();

    // return responseGames;
    // console.log(gameLists);
  };

  const getUserGamesTest = async () => {
    // console.log("Test");
    const getAPI =
      "https://4aobk66o27.execute-api.us-east-2.amazonaws.com/multiplayerTest";
    let retrievedGameState = {};

    let turn = "";
    let userName = await Auth.currentAuthenticatedUser();
    userName = userName["username"];
    let responseGames = [];

    const header = {
      headers: {
        authorization: authToken,
      },
    };
    // console.log(userName["username"]);
    // console.log("userName: " + userName1);

    await axios

      //post the desired move and the current gameState to the API to check the move
      // .post(getAPI, { userName: props.username, gameNumber: props.gameNumber })
      .post(getAPI, { userName: userName, gameNumber: "1" }, header)

      //Get response
      .then((response) => {
        // console.log(userName);

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
    // console.log("Response HERE");
    // console.log(responseGames);

    setGameListsTest(responseGames);

    gameVisible(false);
    // return responseGames;
    // console.log(gameLists);
    toggleGameListVisibleTest(true);
  };

  useEffect(() => {
    getUserGamesTest();
    // console.log(userName1);
    // if (userName1 === "multitest") {
    //   setModalMessage({
    //     title: "You have signed in as a test user",
    //     body: "Some changes may not be overwritten",
    //   });
    //   console.log("MODAL");
    //   setModalVis(true);
    //   setModalButtonsOk(true);
    // }
  }, []);

  const toggleGameListVisibleTest = (value) => {
    console.log("Toggle Game List");
    setGameListVisibleTest(value);
  };

  return (
    <div className="signInScreen">
      {/* Sign in to Play Chess */}
      <Authenticator>
        {({ signOut, user }) => (
          <main className="App-header">
            {modal && (
              <ErrorModal
                title={modalMessage["title"]}
                body={modalMessage["body"]}
                modalButtons={modalButtons}
                deleteResult={deleteResult}
                modalButtonsOk={modalButtonsOk}
              />
            )}
            <div>{waterMark}</div>
            <MenuSelection
              username={user.username}
              gameStateStart={gameStateStart}
              gameNumber={gameNumber}
              changeGame={changeGame}
              newGameState={newGameState}
              boardVisible={boardVisible}
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
              setGameListsTest={setGameListsTest}
              setModalVis={setModalVis}
              setModalButtonsOk={setModalButtonsOk}
              setModalMessage={setModalMessage}
              setSignInTestBool={setSignInTestBool}
              setboardVisible={setboardVisible}
              menuScreen={menuScreen}
              setMenuScreen={setMenuScreen}
            ></MenuSelection>
            {boardVisible && (
              <div>
                <Board
                  gameState={gameState}
                  boardVisible={boardVisible}
                  movePiece={movePiece}
                  apiTest={checkValidMove}
                  username={user.username}
                  getUserGamesTest={getUserGamesTest}
                  turn={turn}
                  setModalButtonsOk={setModalButtonsOk}
                  setModalMessage={setModalMessage}
                  setModalVis={setModalVis}
                  deleteGameTest={deleteGameTest}
                  setGameState={setGameState}
                  setTurn={setTurn}
                  authToken={authToken}
                  gameNumber={gameNumber}
                />
                <TurnIndicator turn={turn} />
              </div>
            )}
          </main>
        )}
      </Authenticator>
      {signInTestBool && (
        <button
          className="button-signIn"
          type="submit"
          // data-variation="primary"
          onClick={signInTest}
        >
          {testSignInUser}
        </button>
      )}
    </div>
  );
}

export default App;
