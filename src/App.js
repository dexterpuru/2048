import { useState } from "react";
import Panel from "./Panel";

const App = () => {
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)
  return(
    <Panel won={won} setWon={setWon} lost={lost} setLost={setLost}/>
  )
}

export default App;