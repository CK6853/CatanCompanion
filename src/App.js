import './App.css';
import { useState, useEffect } from "react";
import Players from "./Players.js"

function App() {
  // Set up state for page
  // Could use routes, but this is a toy application so cbf
  const [currentPageState, setCurrentPageState] = useState("Players")

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

  // Set up Effect to save player array to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem("playerArray", JSON.stringify(playerArray));
  }, [playerArray]);

  switch(currentPageState) {
    case "Players":
      return (<Players returnHome={() => setCurrentPageState("Home")} players={playerArray} setPlayers={setPlayerArray}/>)

    default: // Should be "Home", but catch-all just in case
      return (<Home setCurrentPageState={setCurrentPageState} players={playerArray}/>)
  }
}

// Home Page
function Home(props) {
  return (
    <div className="Home">
      <div className="NavBar">
        {["Players", "Settlements"].map((pagePlayer) => (
          <button className="NavButton" onClick={() => props.setCurrentPageState(pagePlayer)}>{pagePlayer}</button>
        ))}
      </div>
      
      <h1>List of players</h1>
      {props.players.map((player) => (<p>{player}</p>))}
    </div>
  )
}

export default App;
