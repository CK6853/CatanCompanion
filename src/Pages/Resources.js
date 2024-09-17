export default function Resources(props) {
    return (
      <div className="Resources">
        {/*Nav to return home*/}
        <div className="NavBar">
          <button className="NavButton" onClick={() => props.returnHome()}>Return Home</button>
        </div>
        <h1>Resources</h1>
        <div className="Body">
          Rolled value: {props.rolledValue}
        </div>
      </div>
    )
  }