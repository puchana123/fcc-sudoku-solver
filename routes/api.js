'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      // check input
      const puzzle = req.body.puzzle
      // if no input
      if(!puzzle){
        res.json({error: 'Required field missing'});
      };
      // validate check input
      const validate = solver.validate(puzzle)
      if(!validate.success){
        res.json({error: validate.message})
      }
      // sovle function
      const solved = solver.solve(puzzle);
      if(!solved.success){
        res.json({error: solved.message});
      }else{
        console.log('sovled');
        res.json({solution: solved.solvedString});
      }

    });
};
