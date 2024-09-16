import { useState } from "react";

//Settlements Page
export default function Settlements(props) {

  return (
    <div className="Settlements">
      {/*Nav to return home*/}
      <div className="NavBar">
        <button className="NavButton" onClick={() => props.returnHome()}>Return Home</button>
      </div>
      <h1>Settlements</h1>
      <div className="Body">
        <div className="InputBlock">
          {/*Input fields to enter a new settlement to add to the list*/}
          <SettlementInputBlock settlements={props.settlements} setSettlements={props.setSettlements} players={props.players} />
        </div>
        {/*Only render edit block if data exists*/}
        {props.settlements.length === 0 ? (null) : (<SettlementEditBlock settlements={props.settlements} setSettlements={props.setSettlements} />)}
      </div>
    </div>
  )
}

// Block to display all current settlements for possible removal
function SettlementEditBlock(props) {

  // Remove a specific settlement
  function removeSettlement(removeIndex) {
    // Use an array filter to set settlements state without modifying the state itself
    props.setSettlements(props.settlements.filter((_,index) => index !== removeIndex))
  }

  // Clear all settlements
  function clearSettlements() {
    props.setSettlements([])
  }

  // Up/downgrade a settlement
  function toggleSettlementType(upgradeIndex) {
    // Make a shallow copy to avoid mutating the state directly
    let tempSettlements = [...props.settlements]
    // Change the one we want to change
    tempSettlements[upgradeIndex].type = tempSettlements[upgradeIndex].type === "Settlement" ? "City" : "Settlement"
    // Set the state to the new state
    props.setSettlements(tempSettlements)
  }

  return (
    <div className="EditBlock">
      <h1>Existing</h1>
      {/*Table of all settlements, to allow removals*/}
      <table className="settlementsTable">
        {/*Header row*/}
        <tr>
          <th>Roll</th>
          <th>Player</th>
          <th>Resource</th>
          <th>Type</th>
          <th>Enabled</th>
          <th>Switch Type</th>
          <th>Remove</th>
        </tr>
        {/*Data rows*/}
        {props.settlements.map((settlement, index) => (
          <tr>
            <td>{settlement.roll}</td>
            <td>{settlement.player}</td>
            <td>{settlement.resource}</td>
            <td>{settlement.type}</td>
            <td>{settlement.enabled ? "☑" : "☐"}</td>
            {/*Dynamically create buttons to switch type*/}
            <td><button className="TypeButton" onClick={() => toggleSettlementType(index)}>Switch</button></td>
            {/*Dynamically create remove buttons*/}
            <td><button className="RemoveButton" onClick={() => removeSettlement(index)}>Remove</button></td>
          </tr>
        ))}
      </table>

      {/*Button to clear all settlements - only render if more than one settlement*/}
      {props.settlements.length < 2 ? (null) : (
        <button className="ClearButton" onClick={() => clearSettlements()}>Clear All Settlements</button>
      )}
    </div>
  )
}

// Form layout for adding a new settlement
function SettlementInputBlock(props) {
  //create some states for fields to use
  const [currentRoll, setCurrentRoll] = useState(1)
  const [currentPlayer, setCurrentPlayer] = useState(props.players[0])
  const [currentResource, setCurrentResource] = useState("Gold")
  const [currentType, setCurrentType] = useState("Settlement")
  const [currentEnabled, setCurrentEnabled] = useState(true)

  // Use form to add a settlement to the array passed from App and clear the forms
  function addToSettlements(roll, player, resource, type, enabled) {
    // Avoid adding from empty fields (though this shouldn't be possible in normal use)
    if(!roll || !player || !resource || !type) return

    // Update the list
    let newSettlement = {
      roll: roll,
      player: player,
      resource:resource,
      type:type,
      enabled:enabled
    }
    props.setSettlements([...props.settlements, newSettlement])
  }

  if (props.players.length < 2) return (
    <h1 className="ErrorMessage">Not enough players - return home and go to "Players" to set some up</h1>
  )

  return (
    <div className="InputBlock">
      {/*Input fields to enter a new settlement to add to the list*/}
      <h1>Add New</h1>
      <table className="InputTable">
        <tr>
          <th>Roll</th>
          <th>Player</th>
          <th>Resource</th>
          <th>Type</th>
          <th>Enabled</th>
          <th>Submit</th>
        </tr>
        <tr>
          <td>
            {/*Roll*/}
            <ReactSelect options={[1,2,3,4,5,6, 8,9,10,11,12]} updateValue={setCurrentRoll} />
          </td>
          <td>
            {/*Player*/}
            <ReactSelect options={props.players} updateValue={setCurrentPlayer} />
          </td>
          <td>
            {/*Resource*/}
            <ReactSelect options={["Gold", "Wood", "Stone", "Bricks", "Sheep", "Hay"]} updateValue={setCurrentResource} />
          </td>
          <td>
            {/*Amount*/}
            <ReactSelect options={["Settlement", "City"]} updateValue={setCurrentType} />
          </td>
          <td>
            {/*Enabled*/} 
            <input type="checkbox" checked={currentEnabled} onChange={() => setCurrentEnabled(!currentEnabled)} />
          </td>
          <td>
            {/*Manual submit button*/}
            <button className="SubmitButton" onClick={() => {addToSettlements(currentRoll, currentPlayer, currentResource, currentType, currentEnabled)}}>Add</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

// Boilerplate to render a react-ified HTML select object
function ReactSelect(props) {
  return (
    <select onChange={(event) => props.updateValue(event.target.value)}>
      {props.options.map((option, index) => (
        <option key={index}>
          {option}
        </option>
      ))}
    </select>
  )
}