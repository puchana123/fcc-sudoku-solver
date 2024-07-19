'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body;
      // check input value
      if(!puzzle || !coordinate|| !value){
        console.log('check: field(s) missing')
        res.json({error: 'Required field(s) missing'});
        return;
      };
      // check value not 1-9
      const value_regex = /^[1-9]$/g
      const isValidValue = value_regex.test(value);
      if(!isValidValue){
        console.log('check: invalid value')
        res.json({ error: 'Invalid value' });
        return;
      }
      // validate check puzzle input
      const validate = solver.validate(puzzle)
      if(!validate.success){
        res.json({error: validate.message})
        return;
      }
      // coordinate check
      const coordinate_check = solver.coordinateCheck(coordinate);
      if(!coordinate_check){
        console.log('check: invalid coordinate')
        res.json({error: 'Invalid coordinate'});
        return;
      }
      // can place check
      const placeResult = solver.ApiCheck(puzzle,coordinate,value);
      res.json(placeResult);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      // check input
      const puzzle = req.body.puzzle
      // if no input
      if(!puzzle){
        console.log('solve: no input field')
        return res.json({error: 'Required field missing'});
      };

      // sovle function
      const solvedPuzzle = solver.solveSudoku(puzzle);

      return res.json(solvedPuzzle);
    });
};
