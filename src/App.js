import './App.css';
import { useState, useEffect } from "react";

function App() {
  // Set up state for page
  // Could use routes, but this is a toy application so cbf
  const [currentPageState, setCurrentPageState] = useState("Players")

  // Set up state for name array
  const [nameArray, setNameArray] = useState(() => {
    // Check localStorage to see if this is already initialised
    const saved = localStorage.getItem("nameArray");
    const initialValue = JSON.parse(saved);

    // If it already exists, use that. Otherwise, default to empty array
    if (initialValue) {
      return initialValue
    } else {
      return []
    }
  });

  // Set up Effect to save name array to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem("nameArray", JSON.stringify(nameArray));
  }, [nameArray]);

  switch(currentPageState) {
    case "Players":
      return (<Players returnHome={() => setCurrentPageState("Home")} players={nameArray} setPlayers={setNameArray}/>)

    default: // Should be "Home", but catch-all just in case
      return (<Home setCurrentPageState={setCurrentPageState} players={nameArray}/>)
  }
}

// Home Page
function Home(props) {
  return (
    <div className="Home">
      <div className="NavBar">
        {["Players", "Settlements"].map((pageName) => (
          <button className="NavButton" onClick={() => props.setCurrentPageState(pageName)}>{pageName}</button>
        ))}
      </div>
      
      <h1>List of players</h1>
      {props.players.map((name) => (<p>{name}</p>))}
    </div>
  )
}

//Players Page
function Players(props) {
  // State for name entry field
  const [currentEntry, setCurrentEntry] = useState("")

  // Functions for buttons to call
  // Use form to add a name to the array passed from App and clear the form
  function addToPlayers(addName) {
    if (!addName) return;
    props.setPlayers([...props.players, addName])
    setCurrentEntry("")
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
      <div className="PlayersBody">
        {/*Input field to enter a new name to add to the list*/}
        <input
          className="NameInput"
          type="text"
          /*Use the state set above to hold value*/
          value={currentEntry}
          /*When updated, update the state*/
          onChange={(event) => setCurrentEntry(event.target.value)}
          /*If Enter is pressed, submit*/
          onKeyDown={(event) => {if(event.key==="Enter"){addToPlayers(currentEntry)}}}
          placeholder="Enter Name"
        />
        {/*Manual button click*/}
        <button className="NameSubmit" onClick={() => {addToPlayers(currentEntry)}}>Add</button>
        <div/>

        {/*Button to clear players*/}
        <button className="NameClear" onClick={() => clearPlayers()}>Clear Players</button>
      <div/>
      </div>
      
      {props.players.map((name) => (<p>{name}</p>))}
      
    </div>
  )
}

export default App;
