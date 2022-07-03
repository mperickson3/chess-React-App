import React, { useEffect, useState } from "react";
import axios from "axios";
import Games from "./Games";
import Trash from "../Icons/garbage.png";
import Menu from "../Icons/menu.png";
import Auth from "aws-amplify";

const GameList = (props) => {
  const deleteGameConfirm = () => {
    props.deleteGameModal(props.username, props.gameNumber);
  };

  return (
    <div className="column">
      {!props.gameListVisibleTest && (
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
      )}
      {props.gameListVisibleTest &&
        props.gameListsTest.length > 0 &&
        props.gameListsTest.map((gameInfo, index) => {
          return (
            <Games
              key={gameInfo["userName"] + gameInfo["gameNumber"]}
              userName={gameInfo["userName"]}
              //Game Number seen by the user will be the index of the array
              gameNumberDisplayed={gameInfo["gameNumber"]}
              gameInfo={gameInfo}
              changeGame={props.changeGame}
              gameVisible={props.gameVisible}
              toggleGameListVisible={props.toggleGameListVisibleTest}
            />
          );
        })}
    </div>
  );
};

export default GameList;
