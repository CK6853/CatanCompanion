import { useState, useEffect } from "react";
import ReactSelect from "../ReactSelect";
import { allowableRolls, resourceList } from "../Constants";
import '../CSS/Robber.css';

// Robber Page
// Props needed: returnHome(), settlements[], setSettlements(), players[]
export default function Robber(props) {

  return (
    <div className="Robber">
      <h1>Robber</h1>
      {/*Button to return home once settlements have been disabled*/}
      <button className="ConfirmButton" onClick={() => props.returnHome()}>Done</button>
      <div className="Body">
        <SettlementTable settlements={props.settlements} players={props.players}/>
      </div>
      
    </div>
  )
}

// Table of settlements to enable/disable
// Props needed: settlements[], players[]
function SettlementTable(props) {
  // Set up states for filters
  const [rollFilter, setRollFilter] = useState("Roll Filter")
  const [playerFilter, setPlayerFilter] = useState("Player Filter")
  const [resourceFilter, setResourceFilter] = useState("Resource Filter")

  const [filteredSettlements, setFilteredSettlements] = useState(props.settlements)
  const [disabledSettlements, setDisabledSettlements] = useState(props.settlements)

  // UseEffect can't tell when a Settlement class method is run, so we'll just trigger it manually...
  // Hate this, but can't see another way around it
  const [reRender, setReRender] = useState(true)

  // When filters or the data are updated, update the filtered data
  useEffect(() => {
    setFilteredSettlements(filterEnabledSettlements(props.settlements, rollFilter, playerFilter, resourceFilter))
    setDisabledSettlements(props.settlements.filter((settlement) => {return settlement.enabled === false}))
  }, [rollFilter, playerFilter, resourceFilter, props.settlements, reRender])


  return (
    <div className="RobberBlock">
      {/*Table of all settlements, to allow removals*/}
      <table className="RobberTable">
        {/*Header row*/}
        <thead>
          <tr>
            <th>Roll</th>
            <th>Player</th>
            <th>Resource</th>
            <th>Type</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {/*Disabled settlements shown separately*/}
          <RobberTableSection settlements={disabledSettlements} reRender={() => setReRender(!reRender)} enabled={false}/>
          {/*Filters*/}
          <tr className="FilterRow">
            <td><ReactSelect options={["Roll Filter", ...allowableRolls]} updateValue={setRollFilter}/></td>
            <td><ReactSelect options={["Player Filter", ...props.players]} updateValue={setPlayerFilter}/></td>
            <td><ReactSelect options={["Resource Filter", ...resourceList]} updateValue={setResourceFilter}/></td>
          </tr>
          {/*Data rows - filtered*/}
          {/*Check for over-filter - display error after table to preserve formatting*/}
          {filteredSettlements.length === 0 ? null :
          <RobberTableSection settlements={filteredSettlements} reRender={() => setReRender(!reRender)} enabled={true}/>}
        </tbody>
      </table>

      {/*Display error if over-filtered*/}
      {filteredSettlements.length === 0 ? <p>No settlements match your filters</p> : null}
    </div>
  )
}

// One section for disabled settlements, one for enabled. Otherwise identical.
// Props needed: settlements[], reRender(), bool enabled
function RobberTableSection(props) {
  return props.settlements.map((settlement, index) => (<RobberTableEntry key={index} settlement={settlement} reRender={props.reRender} enabled={props.enabled}/>))
}

// Props needed: settlements[], reRender(), bool enabled
function RobberTableEntry(props) {

  function toggleEnabled() {
    // Use the Settlement class method to toggle its enabled state
    props.settlement.toggleEnabled()
    // Also wake up useEffect
    props.reRender()
  }

  return (
    <tr>
      <td>{props.settlement.roll}</td>
      <td>{props.settlement.player}</td>
      <td>{props.settlement.resource}</td>
      <td>{props.settlement.type}</td>
      {/*Just use this section's enabled state to determine if the box is checked - no need to track it separately*/}
      <td><input type="checkbox" checked={props.enabled} onChange={() => toggleEnabled()} /></td>
    </tr>
  )
}

// Get a filtered list of settlements based on given filters - not including disabled settlements
function filterEnabledSettlements(settlementArray, rollFilter, playerFilter, resourceFilter) {
  // Don't mutate state directly - arrays are just pointers
  let shallowCopy = [...settlementArray]

  // Filter out disabled settlements
  shallowCopy = shallowCopy.filter((settlement) => {return settlement.enabled === true})

  // Check if default (unfiltered) state
  if (rollFilter !== "Roll Filter") {
    // If not, apply filter
    shallowCopy = shallowCopy.filter((settlement) => {
      return settlement.roll === rollFilter
    })
  }
  // repeat
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