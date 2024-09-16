import { useState } from "react";

//Players Page
export default function Players(props) {
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
        <div className="Body">
          <div className="InputBlock">
            {/*Input field to enter a new player to add to the list*/}
            <input
              className="InputBox"
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
            <button className="SubmitButton" onClick={() => {addToPlayers(currentEntry)}}>Add</button>
          </div>
          <div className="EditBlock">
            {/*Table of all players, to allow removals*/}
            <table className="PlayersTable">
              {props.players.map((player) => (
                <tr>
                  <td>{player}</td>
                  <td><button className="RemoveButton" onClick={() => removePlayer(player)}>Remove</button></td>
                </tr>
              ))}
            </table>
            {/*Button to clear players*/}
            <button className="ClearButton" onClick={() => clearPlayers()}>Clear All Players</button>
          </div>
        </div>
      </div>
    )
  }