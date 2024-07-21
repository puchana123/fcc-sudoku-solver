const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/solve', () => {
        // #1
        test('Sovle a puzzle with valid puzzle string', () => {
            assert.fail();
        });
        // #2
        test('Sovle a puzzle with missing puzzle string', () => {
            assert.fail();
        });
        // #3
        test('Sovle a puzzle with invalid characters', () => {
            assert.fail();
        });
        // #4
        test('Sovle a puzzle with incorrect length', () => {
            assert.fail();
        });
        // #5
        test('Solve a puzzle that cannot be solved', () => {
            assert.fail();
        });
    });

    suite('/api/check', () => {
        // #6
        test('Check a puzzle placement with all fields', () => {
            assert.fail();
        });
        // #7
        test('Check a puzzle placement with single placement conflict', () => {
            assert.fail();
        });
        // #8
        test('Check a puzzle placement with nultiple placement conflict', () => {
            assert.fail();
        });
        // #9
        test('Check a puzzle placement with all placment conflict', () => {
            assert.fail();
        });
        // #10
        test('Check a puzzle placement with missing required fileds', () => {
            assert.fail();
        })
        // #11
        test('Check a puzzle placement with invalid characters', () => {
            assert.fail();
        });
        // #12
        test('Check a puzzle placement with incorrect length', () => {
            assert.fail();
        });
        // #13
        test('Check a puzzle placement with invalid placement coordinate', () => {
            assert.fail();
        });
        // #14
        test('Check a puzzle placement with invalid placement value', () => {
            assert.fail();
        });
    })
});

