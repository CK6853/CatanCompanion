import './CSS/App.css';
import { useState, useEffect } from "react";
import Home from "./Pages/Home.js"
import Players from "./Pages/Players.js"
import Settlements from "./Pages/Settlements.js"
import Resources from "./Pages/Resources.js"
import Robber from "./Pages/Robber.js"

function App() {
  // Set up state for active page
  // Could use routes, but this is a toy application so can't be bothered
  const [currentPageState, setCurrentPageState] = useState("Home")
  // State for Home to pass dice rolls through to Resources or Robber pages
  const [rolledValue, setRolledValue] = useState(null)

  // Set up state for player and settlement arrays - default to empty arrays if not found in localStorage
  const [playerArray, setPlayerArray] = useState(getLocalStorage("playerArray"));
  const [settlementArray, setSettlementArray] = useState(getLocalStorage("settlementArray"));

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
  function getCurrentPage() {
    switch(currentPageState) {
      case "Players":
        return (<Players returnHome={returnHome} players={playerArray} setPlayers={setPlayerArray}/>)
  
      case "Settlements":
        return (<Settlements returnHome={returnHome} settlements={settlementArray} setSettlements={setSettlementArray} players={playerArray}/>)
  
      case "Resources":
        return (<Resources returnHome={returnHome} settlements={settlementArray} rolledValue={rolledValue} players={playerArray}/>)
  
      case "Robber":
        return (<Robber returnHome={returnHome} settlements={settlementArray} setSettlements={setSettlementArray} players={playerArray}/>)
  
      default: // Should be "Home", but catch-all just in case
        return (<Home setCurrentPageState={setCurrentPageState} settlements={settlementArray} setRolledValue={setRolledValue}/>)
    }
  }

  // Render this page inside a div so we can have application-wide css
  return (
    <div className="App">
      {getCurrentPage()}
    </div>
  )
}

function getLocalStorage(getKey) {
    // Check localStorage to see if this is already initialised
    const saved = localStorage.getItem(getKey);
    const initialValue = JSON.parse(saved);

    // If it already exists, use that. Otherwise, default to empty array
    if (initialValue) {
      return initialValue
    } else {
      return []
    }
}

export default App;