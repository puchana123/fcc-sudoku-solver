class SudokuSolver {

  validate(puzzleString) {
    // match every things with out 1-9 and .
    const regex = /[^1-9.]/g
    const valid_number = regex.test(puzzleString);
    if (valid_number) {
      console.log('not match')
      return { success: false, message: 'Invalid characters in puzzle' };
    }
    // get string and check for 81 valid characters input
    const strings = puzzleString.split('');
    if (strings.length !== 81) {
      console.log('not have 81 char')
      return { success: false, message: 'Expected puzzle to be 81 characters long' };
    }
    console.log('validate pass')
    return { success: true };
  }

  coordinateCheck(coordinate){
    const row = coordinate.match(/^[A-Z]+/gi);
    const col = coordinate.match(/[1-9]+$/g);
    const checkOneNumber = /^[1-9]$/g;
    const checkOneChar = /^[A-I]$/gi;
    const checkcol = checkOneNumber.test(col);
    const checkrow = checkOneChar.test(row);
    if(!checkrow || !checkcol){
      console.log('invalid coordinate');
      return false;
    }
    return true;
  }

  // for check api
  ApiCheck(puzzle,coordinate,num){
    const board = puzzle.split('');
    let [row,col] = coordinate.split('');
    col--;
    const rowToIndex = row.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    let result = {
      valid: true, conflict: []
    }
    // check row
    for(let i= rowToIndex*9; i<rowToIndex *9+9; i++){
      if(board[i] === num){
        result.valid = false
        result.conflict.push('row')
      }
    }
    // check col
    for (let i = col; i < 81; i += 9) {
      if (board[i] === num) {
        result.valid = false
        result.conflict.push('column')
      }
    }
    // check region 3x3
    const regionRowStart = Math.floor(rowToIndex / 3) * 27;
    const regionColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const indexInside = regionRowStart + (i * 9) + regionColStart + j;
        if (board[indexInside] === num) {
          result.valid = false
          result.conflict.push('region')
        };
      };
    };
    // check index if already have num
    const index = col + rowToIndex * 9
    if(board[index] === num){
      result.valid = true;
    }
    if(result.valid){
      delete result.conflict
    }
    return result;
  }

  // this function cover all check with array input
  canPlaceNumber(board, index, num) {
    const row = Math.floor(index / 9);
    const col = index % 9;
    // check row
    for (let i = row * 9; i < row * 9 + 9; i++) {
      if (board[i] === num) {
        return false;
      }
    }
    // check column
    for (let i = col; i < 81; i += 9) {
      if (board[i] === num) {
        return false;
      }
    }
    // check region 3x3
    const regionRowStart = Math.floor(row / 3) * 27;
    const regionColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const indexInside = regionRowStart + (i * 9) + regionColStart + j;
        if (board[indexInside] === num) {
          return false;
        };
      };
    };
    // pass all check
    return true;
  }

  solve(puzzleString, timeout = 10000) {
    // check valid puzzle
    const regex = /[0-9.]/g
    const valid_string = regex.test(puzzleString);
    if(!valid_string){
      return {success: false, message: 'Puzzle cannot be solved'}
    }
    const board = puzzleString.split('');
    // use Stack to manage bracktracking
    let stack = [];
    // fill stack with empty cells (.)
    for (let i = 0; i < 81; i++) {
      if (board[i] === '.') {
        // stack will have all index of empty cell
        stack.push(i);
      };
    };

    // Start time for timeout control
    const startTime = new Date().getTime();

    // sovle until no index in stack
    while (stack.length > 0) {
      // set timeout for handle puzzle solve time
      if (new Date().getTime() - startTime > timeout) {
        console.log("Timeout: Unable to solve Sudoku puzzle within the specified time");
        return { success: false, message: 'Puzzle cannot be solved' }
      }
      let index = stack.pop(); // pop last index
      // recheck if it's empty cell
      if (board[index] === '.') {
        let found = false;
        for (let num = '1'; num <= '9'; num++) {
          if (this.canPlaceNumber(board, index, num)) {
            board[index] = num;
            found = true;
            break; // found number break for loop
          }
        }
        // if not found push back to stack and find agian
        if (!found) {
          board[index] = '.';
          stack.push(index);
        }
      }
    }
    let solvedString = board.join('');

    if (solvedString.includes('.')) {
      console.log('cant solved')
      return { success: false, message: 'Puzzle cannot be solved' }
    }

    return { success: true, solvedString };
  }
}

module.exports = SudokuSolver;

