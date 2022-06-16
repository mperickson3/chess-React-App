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
};
const newGameState = { ...gameStateStart };

function App() {
  const [gameState, setGameState] = useState(gameStateStart);
  const [turn, setTurn] = useState("w");
  const [gameNumber, setGameNumber] = useState("0");
  const [boardVisible, setboardVisible] = useState(false);
  const [modal, setModalVis] = useState(false);
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

  const [userName1, setUserName1] = useState("");

  const checkValidMove = async (moveFrom, moveTo, pieceName, username) => {
    console.log("apiTest Called");
    const api =
      "https://7zbikadls1.execute-api.us-east-2.amazonaws.com/TestAuthentication";

    const data = {
      piece: pieceName,
      locationTo: moveTo,
      locationFrom: moveFrom,
      userName: username,
      gameNumber: gameNumber,
      turn: turn,
      ...gameState,
    };
    console.log("gameNumber: " + gameNumber);

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
        console.log(response);
        console.log(response["data"]["body"]);
        console.log("Result " + response["data"]["moveLegal"]);
        if (!response["data"]["testSync"]) {
          setModalMessage({
            title: "Desync detected",
            body: "A desync with the database has been detected. You will be brought back to the game selection screen",
          });
          setModalVis(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        return response["data"]["moveLegal"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
  };

  const movePiece = async (moveFrom, moveTo, piece, username) => {
    console.log("movePiece function executed");
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
          console.log("state set");
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
    }
  };

  //This function creates a new game. Game state is defined in serverless function
  async function saveGame(
    username,
    turn,
    newGameNumber = "0",
    newGame = false
  ) {
    const saveAPI =
      "https://k2flzsd971.execute-api.us-east-2.amazonaws.com/dev";
    let data = {}; // Declare the JSON object to be sent to the api
    if (newGame) {
      //If a new game is selected the JSON object will take the starting position of the game state
      data = {
        userName: username,
        gameNumber: newGameNumber,
        turn: turn,
        ...newGameState,
      };
      //Change game function needs to be called for a new game but not when a piece is moved
    } else {
      data = {
        userName: username,
        gameNumber: gameNumber,
        turn: turn,
        ...gameState,
      };
    }

    const token = await Auth.currentSession().then((data) => {
      // console.log(data["idToken"]);
      return data["idToken"]["jwtToken"];
    });

    await axios

      //post the desired move and the current gameState to the API
      .post(saveAPI, data, {
        headers: {
          authorization: token,
        },
      })
      //Get response
      .then((response) => {
        //Checking format and returning response
        console.log("Full Response: ");
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
        // saveGameMessage(response["data"]["body"]);
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
  }

  const changeGame = async (changedGame, userName, gameNumber, turn) => {
    console.log(changedGame);
    setGameState(() => {
      return changedGame;
    });
    setGameNumber(gameNumber);
    console.log(turn);
    setTurn(turn);
  };

  const gameVisible = (value) => {
    //Takes a boolean to define if the gameboard is visibile
    console.log("Game Board Visible Trigger");
    setboardVisible(value);
  };

  const signInTest = async () => {
    await Auth.signIn("testUser", "test1234");
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

    // setTimeout(() => {
    //   setModalVis(false);
    //   setModalButtons(false);
    // }, 2000);
  };

  const deleteResult = async (deleteConfirmed) => {
    setModalVis(false);
    setModalButtons(false);
    setModalButtonsOk(false);
    console.log(deleteConfirmed);
    console.log(userName1 + gameNumber);

    if (deleteConfirmed) {
      deleteGameTest();
    }
  };

  const deleteGameTest = async () => {
    const deleteAPI =
      "https://mudw22xr23.execute-api.us-east-2.amazonaws.com/beta";

    const header = {
      headers: {
        // authorization: await props.getToken().toString(),
        authorization: authToken,
      },
    };

    const data = {
      userName: userName1,
      gameNumber: gameNumber,
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

    getUserGamesTest();

    // return responseGames;
    // console.log(gameLists);
  };

  const getUserGamesTest = async () => {
    const getAPI =
      "https://lqzqanzyeh.execute-api.us-east-2.amazonaws.com/default";
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
            />
            {boardVisible === false ? (
              //Do not display the gameboard if the user is at game selection
              <div />
            ) : (
              <div>
                <Board
                  gameState={gameState}
                  movePiece={movePiece}
                  apiTest={checkValidMove}
                  username={user.username}
                  turn={turn}
                />
                <TurnIndicator turn={turn} />
              </div>
            )}
          </main>
        )}
      </Authenticator>
      <button
        className="button-signIn"
        type="submit"
        // data-variation="primary"
        onClick={signInTest}
      >
        {testSignInUser}
      </button>
    </div>
  );
}

export default App;
