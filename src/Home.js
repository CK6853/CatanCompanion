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
        <h1>List of players</h1>
        {props.players.map((player) => (<p>{player}</p>))}
      </div>
    )
  }