import React, { useState } from "react";
import "./GameList.css";

const GameList = (props) => {
  const [navVisibile, setNavVisible] = useState(false);

  const toggleNav = () => {
    if (navVisibile ? setNavVisible(false) : setNavVisible(true));
  };

  return <div></div>;
};

export default GameList;
