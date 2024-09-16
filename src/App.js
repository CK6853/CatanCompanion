import './App.css';
import { useState, useEffect } from "react";

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

//Players Page
function Players(props) {
  // State for player entry field
  const [currentEntry, setCurrentEntry] = useState("")

  // Functions for buttons to call
  // Use form to add a player to the array passed from App and clear the form
  function addToPlayers(playerName) {
    // Avoid adding from an empty field
    if (!playerName) return;
    // Update the list
    props.setPlayers([...props.players, playerName])
    // Reset the field
    setCurrentEntry("")
  }

  // Remove a specific player
  function removePlayer(playerName) {
    // Use an array filter to set players state without modifying the state itself
    props.setPlayers(props.players.filter((player) => player !== playerName))
  }

  // Clear the players from App
  function clearPlayers() {
    props.setPlayers([])
  }

  return (
    <div className="Players">
      {/*Nav to return home*/}
      <div className="NavBar">
        <button className="NavButton" onClick={() => props.returnHome()}>Return Home</button>
      </div>
      <div className="PlayersBody">
        <div className="PlayerInputBlock">
          {/*Input field to enter a new player to add to the list*/}
          <input
            className="PlayersInput"
            type="text"
            /*Use the state set above to hold value*/
            value={currentEntry}
            /*When updated, update the state*/
            onChange={(event) => setCurrentEntry(event.target.value)}
            /*If Enter is pressed, submit*/
            onKeyDown={(event) => {if(event.key==="Enter"){addToPlayers(currentEntry)}}}
            placeholder="Enter Player Name"
          />
          {/*Manual button click*/}
          <button className="PlayersInputSubmitButton" onClick={() => {addToPlayers(currentEntry)}}>Add</button>
        </div>
        <div className="PlayersEditBlock">
          {/*Table of all players, to allow removals*/}
          <table className="PlayersTable">
            {props.players.map((player) => (
              <tr>
                <td>{player}</td>
                <td><button className="PlayersRemoveButton" onClick={() => removePlayer(player)}>Remove</button></td>
              </tr>
            ))}
          </table>
          {/*Button to clear players*/}
          <button className="PlayersClearButton" onClick={() => clearPlayers()}>Clear All Players</button>
        </div>
      </div>
    </div>
  )
}

export default App;
