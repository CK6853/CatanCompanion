import { useState } from "react";
import '../CSS/Players.css';

// Players Page
// Props needed: returnHome(), players[], setPlayers()
export default function Players(props) {
  return (
    <div className="Players">
      {/*Nav to return home*/}
      <div className="NavBar">
        <button className="NavButton" onClick={() => props.returnHome()}>Return Home</button>
      </div>
      <h1>Players</h1>
      <div className="Body">
        {/*Block to allow entry of new players*/}
        <PlayerInputBlock players={props.players} setPlayers={props.setPlayers}/>
        {/*Block to display all current players for possible removal - only render if data exists*/}
        {props.players.length === 0 ? (null) : (<PlayerEditBlock players={props.players} setPlayers={props.setPlayers}/>)}
      </div>
    </div>
  )
}

// Form layout for adding a new player
// Props needed: players[], setPlayers()
function PlayerInputBlock(props) {
  // State for player entry field
  const [currentEntry, setCurrentEntry] = useState("")

  // Use form to add a player to the state array passed from App and clear the form
  function addToPlayers(playerName) {
    // Avoid adding from an empty field
    if (!playerName) return
    // Update the list
    props.setPlayers([...props.players, playerName])
    // Reset the field
    setCurrentEntry("")
  }

  return (
    <div className="InputBlock">
      {/*Input field to enter a new player to add to the list*/}
      <input
        id="PlayerName"
        className="InputBox"
        type="text"
        /*Use state to hold value*/
        value={currentEntry}
        /*When updated, update the state*/
        onChange={(event) => setCurrentEntry(event.target.value)}
        /*If Enter is pressed, submit*/
        onKeyDown={(event) => {if(event.key==="Enter"){addToPlayers(currentEntry)}}}
        placeholder="Enter Player Name"
      />
      {/*Manual button click*/}
      <button className="SubmitButton" onClick={() => {addToPlayers(currentEntry)}}>Add</button>
    </div>
  )
}

// Block to display all current players for possible removal
// Props needed: players[], setPlayers()
function PlayerEditBlock(props) {

  // Remove a specific player
  function removePlayer(playerName) {
    // Use an array filter to set players state without modifying the state itself
    props.setPlayers(props.players.filter((player) => player !== playerName))
  }

  // Clear the players
  function clearPlayers() {
    props.setPlayers([])
  }

  return (
    <div className="EditBlock">
      {/*Table to display all players for possible removal*/}
      <table className="PlayersTable">
        <tbody>
          {/*Create a row for each player*/}
          {props.players.map((player) => (
            <tr key={player}>
              <td className="NameCell">{player}</td>
              {/*Dynamically create remove buttons*/}
              <td className="ButtonCell"><button className="RemoveButton" onClick={() => removePlayer(player)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/*Button to clear all players - only render if more than one player*/}
      {props.players.length < 2 ? (null) : (
        <button className="ClearButton" onClick={() => clearPlayers()}>Clear All Players</button>
      )}
    </div>
  )
}