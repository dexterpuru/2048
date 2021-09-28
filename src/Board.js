const Board = ({boardMatrix}) => {
  //console.log("Inside Board", boardMatrix);
  return (
       <div style={{backgroundColor: "#bbada0", borderRadius: "10px", height: "250px", width: "250px",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
           <div style={{display: "flex", flexDirection: "column"}}>
                {boardMatrix.map((row, index) => {
                    return (
                        <div key={row} style={{display: "flex", flexDirection: "row"}}>
                            {row.map((cell) => {
                                console.log("cell", cell)
                                return (
                                    <div key={cell[1]} style={{ backgroundColor: cell[0] === 0 ? "#cdc1b4" : cell[0] === 2 ? "#eee4da" : cell[0] === 4 ? "#eee1c9" : cell[0] === 8 ? "#f3b27a" : cell[0] === 16 ? "#f69664" : cell[0] === 32 ? "#f77c5f" : cell[0] === 64 ? "#f75f3b" : cell[0] === 128 ? "#edd073" : "white", 
                                        margin: "5px", textAlign: "center", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "10px"}}>
                                        <p>
                                            <b>{cell[0] === 0 ? "" : cell[0]}</b>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
           </div>
       </div>
   );
}

export default Board;