import { useState, useEffect } from "react";

// Home Page
// Props needed: setCurrentPageState(), settlements[], setRolledValue()
export default function Home(props) {
  // Set up state to store which dice are currently selected for each colour set
  const [selectedRed, setSelectedRed] = useState(null)
  const [selectedYellow, setSelectedYellow] = useState(null)

  // Destructure some of the higher-level state setters to stop the linter complaining about useEffect not having all its dependancies
  // (Even though these functions should never change)
  let setCurrentPageState = props.setCurrentPageState
  let setRolledValue = props.setRolledValue

  // If both a red and a yellow have been selected, load the result for that roll
  useEffect(() => {
    if (selectedRed && selectedYellow) {
      let sum = selectedRed+selectedYellow
      setRolledValue(sum)
      if (sum === 7) {
        setCurrentPageState("Robber")
      } else {
        setCurrentPageState("Resources")
      }
      // Since we're definitely navigating away and reloading this page later the local states should all be reset
      // But, to be on the safe side... 
      setSelectedRed(null)
      setSelectedYellow(null)
    }
  }, [selectedRed, selectedYellow, setCurrentPageState, setRolledValue])

  return (
    <div className="Body">
      {/*Navigation Bar for alternate pages*/}
      <div className="NavBar">
        {/*Could just copy/paste this, but might want to add more in future*/}
        {["Players", "Settlements"].map((pageName) => (
          /*Use this string to set button text and page state function*/
          <button className="NavButton" onClick={() => props.setCurrentPageState(pageName)} key={pageName}>{pageName}</button>
        ))}
      </div>
      <h1>Catan Companion</h1>
      <div className="DiceContainer">
        <table className="DiceSplit"><tbody><tr>
          {/*Put the two sets of dice next to each other, pass their respective colour codes and selection states*/}
          <td><DiceGroup colour="R" selected={selectedRed} setSelected={setSelectedRed}/></td>
          <td><DiceGroup colour="Y" selected={selectedYellow} setSelected={setSelectedYellow}/></td>
        </tr></tbody></table>
      </div>
    </div>
  )
}

// One group of dice - either red or yellow
// Props needed: str colour, int selected, setSelected()
function DiceGroup(props) {
  return (
    <div className="DiceGroup">
      <table className="DiceGroupTable"><tbody>
        {/*Three rows of this colour's dice*/}
        {[1,2,3].map((row) => (
          <tr key={row}>
            {/*Figure out which dice go in this row based on row number, e.g. row 2 has dice 3 and 4*/}
            {[(2*row)-1,(2*row)].map((value) => (<td key={value}> 
              <Die value={value} colour={props.colour} selected={props.selected===value} setSelected={props.setSelected}/>
            </td>))}
          </tr>
        ))}
      </tbody></table>
    </div>
  )
}

// Individual die, displayed within a table cell
// Props needed: int value, str colour, int selected, setSelected()
function Die(props) {
  return (
    <img 
      // Formatting needs to be different if this value is selected for this colour, so set className appropriately
      className={props.selected ? "SelectedDiceImage" : "DiceImage"} 

      // Needs to display its own colour and value image
      src={process.env.PUBLIC_URL + `/Dice/${props.colour}${props.value}.png`} 

      // If this die isn't selected, clicking it should set the selected value to this die's value
      // If already selected, selecting again should remove selection
      onClick={props.selected ? () => props.setSelected(null) : () => props.setSelected(props.value)}

      alt="Dice" 
    />
  )
}