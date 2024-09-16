import './App.css';
import { useState, useEffect } from "react";
import Home from "./Pages/Home.js"
import Players from "./Pages/Players.js"
import Settlements from "./Pages/Settlements.js"

function App() {
  // Set up state for active page
  // Could use routes, but this is a toy application so can't be bothered
  const [currentPageState, setCurrentPageState] = useState("Home")

  // Set up state for player array
  const [playerArray, setPlayerArray] = useState(() => {
    // Check localStorage to see if this is already initialised
    const saved = localStorage.getItem("playerArray");
    const initialValue = JSON.parse(saved);

    // If it already exists, use that. Otherwise, default to empty array
    if (initialValue) {
      return initialValue
    } else {
      return []
    }
  });

  // Set up state for settlements array
  const [settlementArray, setSettlementArray] = useState(() => {
    // Check localStorage to see if this is already initialised
    const saved = localStorage.getItem("settlementArray");
    const initialValue = JSON.parse(saved);

    // If it already exists, use that. Otherwise, default to empty array
    if (initialValue) {
      return initialValue
    } else {
      return []
    }
  });

  // Set up Effect to save player array to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem("playerArray", JSON.stringify(playerArray));
  }, [playerArray]);

  // Set up Effect to save settlement array to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem("settlementArray", JSON.stringify(settlementArray));
  }, [settlementArray]);

  // Function for pages to return home
  function returnHome() {
    setCurrentPageState("Home")
  }

  // Figure out which page to render
  // Again, could set up routes but can't be bothered for an application this small
  switch(currentPageState) {
    case "Players":
      return (<Players returnHome={returnHome} players={playerArray} setPlayers={setPlayerArray}/>)

    case "Settlements":
      return (<Settlements returnHome={returnHome} settlements={settlementArray} setSettlements={setSettlementArray} players={playerArray}/>)

    default: // Should be "Home", but catch-all just in case
      return (<Home setCurrentPageState={setCurrentPageState} settlements={settlementArray}/>)
  }
}

export default App;
