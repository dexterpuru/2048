export const generateInitialBoard = () => {
  var initialBoard = [
    [[0, 0], [0, 1], [0, 2]],
    [[0, 3], [0, 4], [0, 5]],
    [[0, 6], [0, 7], [0, 8]],
  ]

  const firstEntry = getRandomArbitrary(0, 4);
  const secondEntry = getRandomArbitrary(5, 8);

  initialBoard[Math.floor(firstEntry/3)][firstEntry%3][0] = 2;
  initialBoard[Math.floor(secondEntry/3)][secondEntry%3][0] = 2;

  return JSON.parse(JSON.stringify(initialBoard));
}

export const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const handleRight = (board, scoreRef) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = board.length-1; j > 0; j--) {
      if (board[i][j][0] === 0) {
        
        board[i][j][0] = board[i][j-1][0]
        board[i][j-1][0] = 0
      }
    }
    
    for (let j = board.length - 1; j >= 1; j--) {
      if (board[i][j - 1][0] === board[i][j][0]) {
        board[i][j][0] = board[i][j][0] * 2;
        scoreRef.current += board[i][j][0]
        // setScore(score+board[i][j][0])
        // move all numbers on the left to the right by one
        if (j > 1) {
          for (let k = j - 1; k > 0; k--) {
            board[i][k][0] = board[i][k - 1][0];
          }
        }
        board[i][0][0] = 0;
      }
    }
    
    for (let j = board.length-1; j > 0; j--) {
      if (board[i][j][0] === 0) {
        board[i][j][0] = board[i][j-1][0]
        board[i][j-1][0] = 0
      }
    }
  }
  return board;
}

export const handleLeft = (board, scoreRef) => {
  for (var i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length-1; j++) {
      if (board[i][j][0] === 0) {
        
        board[i][j][0] = board[i][j+1][0]
        board[i][j+1][0] = 0
      }
    }

    for (var j = 0; j < board.length - 1; j++) {
      //console.log(board[i][j], board[i][j+1])
      if (board[i][j][0] === board[i][j + 1][0] && board[i][j][0] !== 0) {
        //console.log("match")
        board[i][j][0] = board[i][j][0] * 2;
        scoreRef.current += board[i][j][0]
        // setScore(score+board[i][j][0])
        // move all numbers on the left to the right by one
        if (j < 1) {
          for (let k = j+1; k < board.length-1; k++) {
            board[i][k][0] = board[i][k + 1][0];
          }
        }
        board[i][board.length-1][0] = 0;
      }
    }
    
    for (let j = 0; j < board.length-1; j++) {
      if (board[i][j][0] === 0) {
        
        board[i][j][0] = board[i][j+1][0]
        board[i][j+1][0] = 0
      }
    }
}
    return board;
}

export const handleUp = (board, scoreRef) => {
  for (var i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length-1; j++) {
      if (board[j][i][0] === 0) {
        board[j][i][0] = board[j+1][i][0]
        board[j+1][i][0] = 0
      }
    }

    for (var j = 0; j < board.length - 1; j++) {
      if (board[j][i][0] === board[j+1][i][0] && board[j][i][0] !== 0) {
        board[j][i][0] = board[j][i][0] * 2;
        scoreRef.current += board[j][i][0]
        // setScore(score+board[j][i][0])
        // move all numbers on the left to the right by one
        if (j < 1) {
          for (let k = j+1; k < board.length-1; k++) {
            board[k][i][0] = board[k+1][i][0];
          }
        }
        board[board.length-1][i][0] = 0;
      }
    }
    
    for (let j = 0; j < board.length-1; j++) {
      if (board[j][i][0] === 0) {
        board[j][i][0] = board[j+1][i][0]
        board[j+1][i][0] = 0
      }
    }
}
    return board;
}

export const handleDown = (board, scoreRef) => {
  for (var i = 0; i < board.length; i++) {
  
    for (let j = board.length-1; j > 0; j--) {
      if (board[j][i][0] === 0) {
        board[j][i][0] = board[j-1][i][0]
        board[j-1][i][0] = 0
      }
    }
    
    for (var j = board.length-1; j >= 1; j--) {
      //console.log(board[j][i], board[j+1][i])
      if (board[j][i][0] === board[j-1][i][0]) {
        //console.log("match")
        board[j][i][0] = board[j][i][0] * 2;
        scoreRef.current += board[j][i][0]
        // setScore(score+board[j][i][0])
        // move all numbers on the left to the right by one
        if (j > 1) {
          for (let k = j-1; k > 0; k--) {
            board[k][i][0] = board[k-1][i][0];
          }
        }
        board[0][i][0] = 0;
      }
    }
    
    for (let j = board.length-1; j > 0; j--) {
      if (board[j][i][0] === 0) {
        board[j][i][0] = board[j-1][i][0]
        board[j-1][i][0] = 0
      }
    }
}
    return board;
}

export const addNewCell = (board) => {
  var zeros = [];
  for (let i=0; i<board.length; i++) {
    for (let j=0; j<board.length; j++) {
      if (board[i][j][0] === 0) {
        zeros.push(board[i][j][1]);
      }
    }
  }
  
  if(zeros.length === 0){
    console.log("No Zeros")
    return
  }


  var newCellIndex = getRandomArbitrary(0, zeros.length-1);
  board[Math.floor(zeros[newCellIndex]/3)][zeros[newCellIndex]%3][0] = 2;
}

export const checkBoardUpdate = (oldBoard, newBoard) => {
  for (let i=0; i<oldBoard.length; i++) {
    for (let j= 0; j < oldBoard.length; j++) {
      if(oldBoard[i][j][0] !== newBoard[i][j][0]) {
        return true
      }
    }
  }
  return false
}

export const checkWon = (board) => {
  for (let i=0; i<board.length; i++) {
    for (let j =0; j < board.length; j++){
      if(board[i][j][0] === 128){
        return true
      }
    }
  }
  return false
}

export const checkLost = (board) => {
  // If any 0 found then not lost
  for (let i=0; i<board.length; i++) {
    for (let j=0; j<board.length; j++) {
      if (board[i][j][0] === 0) {
        return false
      }
    }
  }

  var newBoard = JSON.parse(JSON.stringify(board))
  var updatedBoard = 0;

  updatedBoard = handleUp(newBoard);
  if(checkBoardUpdate(board, updatedBoard)){
    return false
  }
  updatedBoard = handleDown(newBoard);
  if(checkBoardUpdate(board, updatedBoard)){
    return false
  }
  updatedBoard = handleLeft(newBoard);
  if(checkBoardUpdate(board, updatedBoard)){
    return false
  }
  updatedBoard = handleRight(newBoard);
  if(checkBoardUpdate(board, updatedBoard)){
    return false
  }

  return true

}