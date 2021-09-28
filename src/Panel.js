import Board from "./Board";
import { useEffect, useState } from "react";
import {generateInitialBoard, handleLeft, handleRight, handleUp, handleDown, addNewCell, checkBoardUpdate, checkWon, checkLost} from "./helper";
import { useRef } from "react";


const Panel = ({won, setWon, lost, setLost}) => {
  const scoreRef = useRef(0)
  const bestScoreRef = useRef(0)
  // eslint-disable-next-line
  const [score, setScore] = useState(0);
  // eslint-disable-next-line
  const [best, setBest] = useState(0);
  const [boardMatrix, setBoardMatrix] = useState(generateInitialBoard())

  console.log("Render")

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (won === true || lost === true) return
      var newBoard = JSON.parse(JSON.stringify(boardMatrix))
      
      console.log(newBoard);
      console.log("updating");
      var updatedBoard = 0;
      if (event.keyCode === 37) {
        console.log("Left Arrow");
        updatedBoard = handleLeft(newBoard, scoreRef);
      }

      if (event.keyCode === 38) {
        console.log("Up Arrow");
        updatedBoard = handleUp(newBoard, scoreRef);
      }

      if (event.keyCode === 39) {
        console.log("Right Arrow");
        updatedBoard = handleRight(newBoard, scoreRef);
      }

      if (event.keyCode === 40) {
        console.log("Down Arrow");
        updatedBoard = handleDown(newBoard, scoreRef);
      }

      if (updatedBoard !== 0) {
        if(checkBoardUpdate(boardMatrix, updatedBoard)) {
          if(checkWon(updatedBoard)){
            setWon(true);
          }
          addNewCell(updatedBoard);
        } else {
          if(checkLost(updatedBoard)){
            setLost(true);
          }
        }
        
        setBoardMatrix(updatedBoard);
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
    // eslint-disable-next-line
  }, [boardMatrix])


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%", fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{ margin: "10px", border: "1px solid", borderRadius: "20px"}}>
          <p>
            <b>Score:</b> <span style={{ color: "green" }}>{scoreRef.current}</span>
          </p>
        </div>
        <div style={{ margin: "10px", border: "1px solid", borderRadius: "20px"}}>
          <p>
            <b>Best:</b> <span style={{ color: "green" }}>{bestScoreRef.current}</span>
          </p>
        </div>
      </div>
      <Board boardMatrix={boardMatrix} />
      {won && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%"}}>Victory</div>
      )}
      {lost && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%"}}>Lost</div>
      )}
      <button onClick={() => {
        setBoardMatrix(generateInitialBoard());
        bestScoreRef.current = Math.max(scoreRef.current, bestScoreRef.current)
        scoreRef.current = 0;
        // if(score > best) setBest(score);
        //setScore(0);
        setWon(false);
        setLost(false);
      } } style={{ marginTop: "10px",backgroundColor: "#3184ca", borderRadius: "10px"}}>
        Restart
      </button>
    </div>
  );
}

export default Panel;