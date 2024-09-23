// Boilerplate to render a react-ified HTML select object
// Props needed: options[], updateValue(), str id
export default function ReactSelect(props) {

  // Because select only supports strings
  function getInteger(str) {
    // Get rid of anything that's not purely a number (Because pareseInt will turn "12px" into 12 -_-)
    if (isNaN(str)) return str
    // Attempt to turn it into a number
    let result = parseInt(str)
    // Because isNaN returns false on whitespace str could still be " ", double-check that what we've created is actually a number
    if (isNaN(result)) return str
    return result
  }

  return (
    <select onChange={(event) => props.updateValue(getInteger(event.target.value))} id={props.id}>
      {props.options.map((option, index) => (
        <option key={index}>
          {option}
        </option>
      ))}
    </select>
  )
}