class SudokuSolver {

  validate(puzzleString) {
    // get string and check for 81 valid characters input
    const valid_number = /([1-9]|\.)/g;
    const strings = puzzleString.match(valid_number);
    if (strings.length !== 81) {
      return false;
    } else {
      return true;
    };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // check row already have this number or not
    // row => index / 9 => row no.(0-8)
    const board = puzzleString.match(/([1-9]|\.)/g);
    const row_number = Math.floor((row - 1) / 9);
    // check on this row_number
    // start at i = first number of row (0->8) i++
    for (let i = row_number * 9; i < row_number * 9 + 9; i++) {
      if (board[i] === value) {
        return false;
      }
    }
    // check every index and not found this number
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    // check column already have this number or not
    // if A => index +0 | B => +9
    const board = puzzleString.match(/([1-9]|\.)/g);
    // change Character to index (0-8)
    const columnToindex = column.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    // start at i = first number of column (0-8) until more than last index i+9
    for (let i = columnToindex; i < board.length; i += 9) {
      if (board[i] === value) {
        return false;
      }
    }
    // check every index and not found this number
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // check region 3x3 already have this number or not
    const board = puzzleString.match(/([1-9]|\.)/g);
    // start row,column
    const row_number = Math.floor((row - 1) / 9);
    const columnToindex = column.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    // start of region 3x3
    // 1 region have 3 row = 27 index
    const regionRowStart = Math.floor(row_number / 3) * 27;
    // 1 region have 3 column (0-2)(3-5)(6-8)
    const regionColStart = Math.floor(columnToindex / 3) * 3;
    // loop check through all index 3x3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const indexInside = regionRowStart + (i * 9) + regionColStart + j;
        if (board[indexInside] === value) {
          return false;
        };
      };
    };
    // check every index and not found this number
    return true
  };

  // this function cover all above check with array input
  canPlaceNumber(board, index, num) {
    const row = Math.floor(index / 9);
    const col = index % 9;
    // check row
    for (let i = row * 9; i < row * 9 + 9; i++) {
      if (board[i] === value) {
        return false;
      }
    }
    // check column
    for (let i = col; i < 81; i += 9) {
      if (board[i] === value) {
        return false;
      }
    }
    // check region 3x3
    const regionRowStart = Math.floor(row / 3) * 27;
    const regionColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const indexInside = regionRowStart + (i * 9) + regionColStart + j;
        if (board[indexInside] === value) {
          return false;
        };
      };
    };
    // pass all check
    return true;
  }

  solve(puzzleString) {
    const board = puzzleString.match(/([1-9]|\.)/g);
    // use Stack to manage bracktracking
    let stack = [];
    // fill stack with empty cells (.)
    for (let i = 0; i < 81; i++) {
      if (board[i] === '.') {
        // stack will have all index of empty cell
        stack.push(i);
      };
    };

    // sovle until no index in stack
    while (stack.length > 0) {
      let index = stack.pop(); // pop last index
      // recheck if it's empty cell
      if (board[index] === '.') {
        let found = false;
        for (let num = '1'; num <= '9'; num++) {
          if(this.canPlaceNumber(board, index, num)){
            board[index] = num;
            found = true;
            break; // found number break for loop
          }
        }
        // if not found push back to stack and find agian
        if(!found){
          board[index] = '.';
          stack.push(index);
        }
      }
    }
    return board.join('');
  }
}

module.exports = SudokuSolver;

