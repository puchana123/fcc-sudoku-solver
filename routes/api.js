'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body;
      // check input value
      if(!puzzle || !coordinate|| !value){
        res.json({error: 'Required field(s) missing'});
        return;
      };
      // validate check puzzle input
      const validate = solver.validate(puzzle)
      if(!validate.success){
        res.json({error: validate.message})
        return;
      }
      // check value not 1-9
      const value_regex = /^[1-9]$/g
      const isValidValue = value_regex.test(value);
      if(!isValidValue){
        res.json({ error: 'Invalid value' });
        return;
      }
      // coordinate check
      const coordinate_check = solver.coordinateCheck(coordinate);
      if(!coordinate_check){
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
        res.json({error: 'Required field missing'});
        return;
      };
      // validate check input
      const validate = solver.validate(puzzle)
      if(!validate.success){
        res.json({error: validate.message})
        return;
      }
      // sovle function
      const solved = solver.solve(puzzle);
      if(!solved.success){
        res.json({error: solved.message});
        return;
      }
      console.log('sovled');
      return res.json({solution: solved.solvedString});
    });
};
