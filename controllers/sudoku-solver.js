class SudokuSolver {

  validate(puzzleString) {
    // match every things with out 1-9 and .
    const regex = /^[1-9.]+$/g
    if (!regex.test(puzzleString)) {
      console.log('validate: string not match')
      return { success: false, message: 'Invalid characters in puzzle' };
    }
    // get string and check for 81 valid characters input
    if (puzzleString.length !== 81) {
      console.log('validate: not have 81 char')
      return { success: false, message: 'Expected puzzle to be 81 characters long' };
    }
    // must not be all numbers
    const allNumberRegex = /^[1-9]+$/
    if (allNumberRegex.test(puzzleString)) {
      console.log('validate: all are numbers')
      return { success: false, message: 'Puzzle cannot be solved' }
    }
    // valid puzzle check
    if(this.IsInvalidPuzzle(puzzleString)){
      console.log('validate: invalid puzzle');
      return { success: false, message: 'Puzzle cannot be solved'};
    }
    console.log('validate: pass')
    return { success: true };
  }

  coordinateCheck(coordinate) {
    const row = coordinate.match(/^[A-Z]+/gi);
    const col = coordinate.match(/[1-9]+$/g);
    const checkOneNumber = /^[1-9]$/g;
    const checkOneChar = /^[A-I]$/gi;
    const checkcol = checkOneNumber.test(col);
    const checkrow = checkOneChar.test(row);
    if (!checkrow || !checkcol) {
      console.log('invalid coordinate');
      return false;
    }
    return true;
  }

  // for check api
  ApiCheck(puzzle, coordinate, num) {
    const board = puzzle.split('');
    let [row, col] = coordinate.split('');
    col--;
    const rowToIndex = row.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    let result = {
      valid: true, conflict: []
    }
    // check row
    for (let i = rowToIndex * 9; i < rowToIndex * 9 + 9; i++) {
      if (board[i] === num) {
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
        const indexInside = regionRowStart + i * 9 + regionColStart + j;
        if (board[indexInside] === num) {
          result.valid = false
          result.conflict.push('region')
          break;
        };
      };
    };
    // check index if already have num
    const index = col + rowToIndex * 9
    if (board[index] === num) {
      result.valid = true;
    }
    if (result.valid) {
      delete result.conflict
    }
    return result;
  }
  // check if the number is dupicate at row col and region
  IsInvalidPuzzle(puzzle) {
    const board = puzzle.split('');

    // dupicate row
    for (let row = 0; row < 9; row++) {
      let rowSet = new Set();
      for (let col = 0; col < 9; col++) {
        let num = board[row * 9 + col];
        if (num !== '.') {
          if (rowSet.has(num)) {
            return true // found duplicate
          }
          rowSet.add(num);
        }
      }
    }

    // dupicate col
    for (let col = 0; col < 9; col++) {
      let colSet = new Set();
      for (let row = 0; row < 9; row++) {
        let num = board[row * 9 + col];
        if (num !== '.') {
          if (colSet.has(num)) {
            return true // found duplicate
          }
          colSet.add(num);
        }
      }
    }

    // dupicate in region 3x3
    for (let regionRowStart = 0; regionRowStart < 9; regionRowStart += 3) {
      for (let regionColStart = 0; regionColStart < 9; regionColStart += 3) {
        let regionSet = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let index = (regionRowStart + i) * 9 + (regionColStart + j)
            let num = board[index];
            if(num !== '.'){
              if(regionSet.has(num)){
                return true // found duplicate
              }
              regionSet.add(num);
            }
          }
        }
      }
    }

    return false; // not found duplicate = valid puzzle
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
    // check col
    for (let i = col; i < 81; i += 9) {
      if (board[i] === num) {
        return false
      }
    }
    // check region 3x3
    const regionRowStart = Math.floor(row / 3) * 27;
    const regionColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const indexInside = regionRowStart + i * 9 + regionColStart + j;
        if (board[indexInside] === num) {
          return false
        };
      };
    };
    // pass all check
    return true;
  }

  solve(board) {
    // already validate check
    for (let i = 0; i < 81; i++) {
      if (board[i] === '.') {
        for (let num = '1'; num <= '9'; num++) {
          if (this.canPlaceNumber(board, i, num.toString())) {
            board[i] = num.toString()
            if (this.solve(board)) {
              return true;
            }
            board[i] = '.'
          }
        }
        return false;
      }
    }
    return true;
  }

  solveSudoku(puzzleString) {
    // validate check input
    const validateResult = this.validate(puzzleString)
    if(!validateResult.success){
      return {error: validateResult.message}
    }
    
    // change string to array
    let board = puzzleString.split('');
    if (!this.solve(board)) {
      console.log('solve: cannot solved')
      return { error: 'Puzzle cannot be solved' }
    }
    let solved = board.join('');
    console.log('solve: solved')
    return { 'solution': solved }
  }
}

module.exports = SudokuSolver;

