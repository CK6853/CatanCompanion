import '../CSS/Resources.css';

// Resources Page
// Props needed: returnHome(), settlements[], int rolledValue, players[]
export default function Resources(props) {
  // Filter the settlements list to only contain settlements triggered on this value of dice roll
  let filteredSettlements = props.settlements.filter((settlement) => settlement.roll === props.rolledValue && settlement.enabled === true)

  return (
    <div className="Resources">
      <h1>Resources</h1>
      <div className="Body">
        {/*Give a resource list for each player*/}
        {props.players.map((player) => (<PlayerResources player={player} settlements={filteredSettlements}/>))}
      </div>
      {/*Button to return home once resources are handed out*/}
      <button className="ConfirmButton" onClick={() => props.returnHome()}>Done</button>
    </div>
  )
}

// Display the resources gathered for a specific player
// Props needed: str player, settlements[]
function PlayerResources(props) {
  // Further filter settlements to only contain settlements owned by this player
  let filteredSettlements = props.settlements.filter((settlement) => settlement.player === props.player)
  let gatheredResources = {}

  // Aggregate all the settlements owned by this player to create a sum total of each resource
  for (let settlement of filteredSettlements) {
    if (settlement.resource in gatheredResources) {
      // If we already have a count for this resource, add to it
      gatheredResources[settlement.resource] += typeToInt(settlement.type)
    } else {
      // If not, make it
      gatheredResources[settlement.resource] = typeToInt(settlement.type)
    }
  }
  // Transform this object into an array of formatted strings saying how many of each resource were gathered
  let gatheredArray = Object.entries(gatheredResources).map(([resource, amount]) => `${amount} ${resource}`)
  // Join those strings together in a readable form
  let gatheredString = gatheredArray.join(", ")

  // If a player got no resources, explicitly say that. Otherwise, list the resources
  return (
    <div className="PlayerResources">
      {props.player} gets{gatheredString === "" ? " nothing!" : `: ${gatheredString}`}
    </div>
  )
}

// Transforms a settlement type into a number of resources granted
function typeToInt(type) {
  switch(type) {
    case "Settlement":
      return 1
    case "City":
      return 2
    // Should only ever be "Settlement" or "City", but just to be thorough...
    default: 
      return 0
  }
}

