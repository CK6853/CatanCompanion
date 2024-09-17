// Robber Page
// Props needed: returnHome(), settlements[], setSettlements(), players[]
export default function Robber(props) {
  return (
    <div className="Robber">
      <h1>Robber</h1>
      <div className="Body">
        
      </div>
      {/*Button to return home once settlements have been disabled*/}
      <button className="ConfirmButton" onClick={() => props.returnHome()}>Done</button>
    </div>
  )
}