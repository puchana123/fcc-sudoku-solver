const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/solve', () => {
        // #1
        test('Sovle a puzzle with valid puzzle string', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378', 'get correct solution');
                    done();
                })
        });
        // #2
        test('Sovle a puzzle with missing puzzle string', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9.6.14.37.'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378', 'get correct solution');
                    done();
                })
        });
        // #3
        test('Sovle a puzzle with invalid characters', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({
                    puzzle: '1.5a.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9.6.14.37.'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Invalid characters in puzzle', 'get error message correctly');
                    done();
                })
        });
        // #4
        test('Sovle a puzzle with incorrect length', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({
                    puzzle: '1.5.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9.6.14.37.'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'get error message correctly');
                    done();
                })
        });
        // #5
        test('Solve a puzzle that cannot be solved', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({
                    puzzle: '1.55.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9.6.14.37.'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Puzzle cannot be solved', 'get error message correctly');
                    done();
                })
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

