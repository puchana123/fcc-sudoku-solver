const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
    // #1
    test('handle a valid puzzle string of 81 characters', () => {
        assert.fail();
    });
    // #2
    test('handle a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.fail();
    });
    // #3
    test('handle a puzzle string that is not 81 characters in length', () => {
        assert.fail();
    });
    // #4 
    test('handle a valid row placement', () => {
        assert.fail();
    });
    // #5
    test('handle an invalid row placement', () => {
        assert.fail();
    });
    // #6
    test('handle a valid column placement', () => {
        assert.fail();
    });
    // #7
    test('hand;e an invalid column placemnet', () => {
        assert.fail();
    });
    // #8
    test('handle a valid region (3x3 grid) placement', () => {
        assert.fail();
    });
    // #9
    test('handle an invalid region (3x3 grid) placement', () => {
        assert.fail();
    });
    // #10
    test('Valid puzzle strings pass the solver', () => {
        assert.fail();
    });
    // #11
    test('Invalid puzzle strings fail the solver', () => {
        assert.fail();
    });
    // #12
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        assert.fail();
    });
});
