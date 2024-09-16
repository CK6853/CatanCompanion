//import { useState } from "react";

//Settlements Page
export default function Settlements(props) {

    return (
      <div className="Settlements">
        {/*Nav to return home*/}
        <div className="NavBar">
          <button className="NavButton" onClick={() => props.returnHome()}>Return Home</button>
        </div>
        <h1>Settlements</h1>
        <div className="Body">

        </div>
      </div>
    )
  }