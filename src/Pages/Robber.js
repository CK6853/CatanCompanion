// Robber Page
// Props needed: returnHome(), settlements[], setSettlements(), players[]
export default function Robber(props) {
  return (
    <div className="Robber">
      {/*Nav to return home*/}
      <div className="NavBar">
        <button className="NavButton" onClick={() => props.returnHome()}>Return Home</button>
      </div>
      <h1>Robber</h1>
      <div className="Body">
        
      </div>
    </div>
  )
}