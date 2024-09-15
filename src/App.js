import './App.css';
import { useState, useEffect } from "react";

function App() {
  // Set up state for page
  // Could use routes, but this is a toy application so cbf
  const [currentPageState, setCurrentPageState] = useState("Names")

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
    case "Names":
      return (<Names returnHome={() => setCurrentPageState("Home")} names={nameArray} setNames={setNameArray}/>)

    default: // Should be "Home", but catch-all just in case
      return (<Home setCurrentPageState={setCurrentPageState} names={nameArray}/>)
  }
}

// Home Page
function Home(props) {
  return (
    <div className="Home">
      <button onClick={() => props.setCurrentPageState("Names")}>Go To Names</button>
      <h1>List of names</h1>
      {props.names.map((name) => (<p>{name}</p>))}
    </div>
  )
}

//Names Page
function Names(props) {
  // State for name entry field
  const [currentEntry, setCurrentEntry] = useState("")

  // Functions for buttons to call
  // Use form to add a name to the array passed from App and clear the form
  function addToNames(addName) {
    if (!addName) return;
    props.setNames([...props.names, addName])
    setCurrentEntry("")
  }

  // Clear the names from App
  function clearNames() {
    props.setNames([])
  }

  return (
    <div className="Names">
      {/*Button to return home*/}
      <button onClick={() => props.returnHome()}>Return Home</button>
      <div />
      {/*Input field to enter a new name to add to the list*/}
      <input
        type="text"
        /*Use the state set above to hold value*/
        value={currentEntry}
        /*When updated, update the state*/
        onChange={(event) => setCurrentEntry(event.target.value)}
        /*If Enter is pressed, submit*/
        onKeyDown={(event) => {if(event.key==="Enter"){addToNames(currentEntry)}}}
        placeholder="Enter Name"
      />
      {/*Manual button click*/}
      <button onClick={() => {addToNames(currentEntry)}}>Add</button>
      <div/>
      {/*Button to clear names*/}
      <button onClick={() => clearNames()}>Clear Names</button>
      <div/>
      {props.names.map((name) => (<p>{name}</p>))}
      
    </div>
  )
}

export default App;
