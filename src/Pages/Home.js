// Home Page
export default function Home(props) {
    return (
      <div className="Body">
        {/*Navigation Bar for alternate pages*/}
        <div className="NavBar">
          {/*Could just copy/paste this, but might want to add more in future*/}
          {["Players", "Settlements"].map((pagePlayer) => (
            /*Base button text and page state function on this string*/
            <button className="NavButton" onClick={() => props.setCurrentPageState(pagePlayer)}>{pagePlayer}</button>
          ))}
        </div>
        <h1>Catan Companion</h1>
        




        {/*TEMP - FOR TESTING*/}
        <h1>List of settlements</h1>
        <table className="settlementsTable">
          {/*Header row*/}
          <tr>
            <th>Roll</th>
            <th>Player</th>
            <th>Resource</th>
            <th>Type</th>
            <th>Enabled</th>
          </tr>
          {/*Data rows*/}
          {props.settlements.map((settlement, index) => (
            <tr>
              <td>{settlement.roll}</td>
              <td>{settlement.player}</td>
              <td>{settlement.resource}</td>
              <td>{settlement.type}</td>
              <td>{settlement.enabled ? "☑" : "☐"}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }