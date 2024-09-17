import { useEffect, useState } from "react";

const allowableRolls = [1,2,3,4,5,6, 8,9,10,11,12]
const resourceList = ["Gold", "Wood", "Stone", "Bricks", "Sheep", "Hay"]

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
        {props.settlements.length === 0 ? (null) : (<SettlementEditBlock settlements={props.settlements} setSettlements={props.setSettlements} players={props.players} />)}
      </div>
    </div>
  )
}

// Block to display all current settlements for possible removal
function SettlementEditBlock(props) {
  const [rollFilter, setRollFilter] = useState("Roll Filter")
  const [playerFilter, setPlayerFilter] = useState("Player Filter")
  const [resourceFilter, setResourceFilter] = useState("Resource Filter")
  const [filteredSettlements, setFilteredSettlements] = useState(props.settlements)

  // When filters or the data are updated, update the filtered data
  useEffect(() => {
    setFilteredSettlements(filterSettlements(props.settlements, rollFilter, playerFilter, resourceFilter))
  }, [rollFilter, playerFilter, resourceFilter, props.settlements])

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
        <thead>
          <tr>
            <th>Roll</th>
            <th>Player</th>
            <th>Resource</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Switch Type</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {/*Filters*/}
          <tr>
            <td><ReactSelect options={["Roll Filter", ...allowableRolls]} updateValue={setRollFilter}/></td>
            <td><ReactSelect options={["Player Filter", ...props.players]} updateValue={setPlayerFilter}/></td>
            <td><ReactSelect options={["Resource Filter", ...resourceList]} updateValue={setResourceFilter}/></td>
          </tr>
          {/*Data rows - filtered*/}
          {/*Check for over-filter - have error after table to preserve formatting*/}
          {filteredSettlements.length === 0 ? null :
          filteredSettlements.map((settlement, index) => (
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
        </tbody>
      </table>

      {/*Display error if over-filtered*/}
      {filteredSettlements.length === 0 ? <p>No settlements match your filters</p> : null}

      {/*Button to clear all settlements - only render if more than one settlement*/}
      {props.settlements.length < 2 ? (null) : (
        <button className="ClearButton" onClick={() => clearSettlements()}>Clear All Settlements</button>
      )}
    </div>
  )
}

// Get a filtered list of settlements based on given filters
function filterSettlements(settlementArray, rollFilter, playerFilter, resourceFilter) {
  // Don't mutate state directly - arrays are just pointers
  let shallowCopy = [...settlementArray]

  // Check if default (unfiltered) state
  if (rollFilter !== "Roll Filter") {
    // If not, apply filter
    shallowCopy = shallowCopy.filter((settlement) => {
      return settlement.roll === rollFilter
    })
  }

  if (playerFilter !== "Player Filter") {
    shallowCopy = shallowCopy.filter((settlement) => {
      return settlement.player === playerFilter
    })
  }

  if (resourceFilter !== "Resource Filter") {
    shallowCopy = shallowCopy.filter((settlement) => {
      return settlement.resource === resourceFilter
    })
  }

  return shallowCopy
}

// Form layout for adding a new settlement
function SettlementInputBlock(props) {
  //create some states for fields to use
  const [currentRoll, setCurrentRoll] = useState(1)
  const [currentPlayer, setCurrentPlayer] = useState(props.players[0])
  const [currentResource, setCurrentResource] = useState("Gold")
  const [currentType, setCurrentType] = useState("Settlement")
  const [currentEnabled, setCurrentEnabled] = useState(true)

  // Use form to add a settlement to the array passed from App
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

  // Check if there are enough players to run a game before rendering - also prevents player dropdown showing as empty
  if (props.players.length < 2) return (
    <h1 className="ErrorMessage">Not enough players - return home and go to "Players" to set some up</h1>
  )

  return (
    <div className="InputBlock">
      {/*Input fields to enter a new settlement to add to the list*/}
      <h1>Add New</h1>
      <table className="InputTable">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Player</th>
            <th>Resource</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {/*Roll*/}
              <ReactSelect options={allowableRolls} updateValue={setCurrentRoll} />
            </td>
            <td>
              {/*Player*/}
              <ReactSelect options={props.players} updateValue={setCurrentPlayer} />
            </td>
            <td>
              {/*Resource*/}
              <ReactSelect options={resourceList} updateValue={setCurrentResource} />
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
        </tbody>
      </table>
    </div>
  )
}

// Boilerplate to render a react-ified HTML select object
function ReactSelect(props) {

  // Because select only supports strings
  function getInteger(str) {
    // Get rid of anything that's not purely a number (Because pareseInt will turn "12px" into 12 -_-)
    if (isNaN(str)) return str
    // Attempt to turn it into a number
    let result = parseInt(str)
    // Because isNaN returns false on whitespace str could still be " ", double-check that what we've created is actually a number
    if (isNaN(result)) return str
    return result
  }

  return (
    <select onChange={(event) => props.updateValue(getInteger(event.target.value))}>
      {props.options.map((option, index) => (
        <option key={index}>
          {option}
        </option>
      ))}
    </select>
  )
}

