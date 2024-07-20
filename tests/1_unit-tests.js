const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const Puzzle = require('../controllers/puzzle-strings.js');
let solver = new Solver();
let validPuzzle = Puzzle.puzzlesAndSolutions[0];
let InvalidPuzzle = {
    'invalidStr':'1b5a.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    'not81': '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3',
    'invalidPuzzle':'115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    'incompletePuzzle':'1357629849463812577284596136945178328129367453578241964732985615816....926914.37.'
}

suite('Unit Tests', () => {
    // #1
    test('handle a valid puzzle string of 81 characters', () => {
        const output = solver.solveSudoku(validPuzzle[0]);
        assert.isObject(output, 'return result is Object');
        assert.isString(output.solution, 'solution should be string');
    });
    // #2
    test('handle a puzzle string with invalid characters (not 1-9 or .)', () => {
        const output = solver.solveSudoku(InvalidPuzzle.invalidStr);
        assert.isObject(output, 'return result is Object');
        assert.isString(output.error, 'error should be string');
        assert.equal(output.error, 'Invalid characters in puzzle');
    });
    // #3
    test('handle a puzzle string that is not 81 characters in length', () => {
        const output = solver.solveSudoku(InvalidPuzzle.not81);
        assert.isObject(output, 'return result is Object');
        assert.isString(output.error, 'error should be string');
        assert.equal(output.error, 'Expected puzzle to be 81 characters long');
    });
    // #4 
    test('handle a valid row placement', () => {
        const output = solver.ApiCheck(validPuzzle[0], 'A2', '3');
        assert.isObject(output, 'return result is Object');
        assert.propertyVal(output, 'valid', true, 'return {valid:true}');
    });
    // #5
    test('handle an invalid row placement', () => {
        const output = solver.ApiCheck(validPuzzle[0], 'A7', '1');
        assert.isObject(output, 'return result is Object');
        assert.propertyVal(output, 'valid', false, 'return {valid:false}')
        assert.deepPropertyVal(output, 'conflict', ['row'], 'return {conflict:[ "row" ]}')
    });
    // #6
    test('handle a valid column placement', () => {
        const output = solver.ApiCheck(validPuzzle[0], 'C8', '1');
        assert.isObject(output, 'return result is Object');
        assert.propertyVal(output, 'valid', true, 'return {valid:true}');
    });
    // #7
    test('handle an invalid column placemnet', () => {
        const output = solver.ApiCheck(validPuzzle[0], 'C8', '9');
        assert.isObject(output, 'return result is Object');
        assert.propertyVal(output, 'valid', false, 'return {valid:false}')
        assert.deepPropertyVal(output, 'conflict', ['column'], 'return {conflict:[ "column" ]}')
    });
    // #8
    test('handle a valid region (3x3 grid) placement', () => {
        const output = solver.ApiCheck(validPuzzle[0], 'C8', '1');
        assert.isObject(output, 'return result is Object');
        assert.propertyVal(output, 'valid', true, 'return {valid:true}');
    });
    // #9
    test('handle an invalid region (3x3 grid) placement', () => {
        const output = solver.ApiCheck(validPuzzle[0], 'C7', '4');
        assert.isObject(output, 'return result is Object');
        assert.propertyVal(output, 'valid', false, 'return {valid:false}')
        assert.deepPropertyVal(output, 'conflict', ['region'], 'return {conflict:[ "region" ]}')
    });
    // #10
    test('Valid puzzle strings pass the solver', () => {
        const output = solver.solveSudoku(validPuzzle[0]);
        assert.isObject(output, 'return result is Object');
        assert.isString(output.solution, 'solution should be string');
        assert.equal(output.solution, validPuzzle[1], 'get correct solution');
    });
    // #11
    test('Invalid puzzle strings fail the solver', () => {
        const output = solver.solveSudoku(InvalidPuzzle.invalidPuzzle);
        assert.isObject(output, 'return result is Object');
        assert.isString(output.error, 'solution should be string');
        assert.equal(output.error, 'Puzzle cannot be solved', 'get error cannot be solved');
    });
    // #12
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        const output = solver.solveSudoku(InvalidPuzzle.incompletePuzzle);
        assert.isObject(output, 'return result is Object');
        assert.isString(output.solution, 'solution should be string');
        assert.equal(output.solution, validPuzzle[1], 'get correct solution');
    });
});
