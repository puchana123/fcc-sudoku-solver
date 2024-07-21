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
        test('Check a puzzle placement with all fields', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '3'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.valid, true, 'get correct answer');
                    done();
                })
        });
        // #7
        test('Check a puzzle placement with single placement conflict', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '4'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.valid, false, 'get correct answer');
                    assert.deepEqual(res.body.conflict, ['row'], 'get one conflict');
                    done();
                })
        });
        // #8
        test('Check a puzzle placement with multiple placement conflict', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '1'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.valid, false, 'get correct answer');
                    assert.deepEqual(res.body.conflict, ['row', 'region'], 'get two conflict');
                    done();
                })
        });
        // #9
        test('Check a puzzle placement with all placment conflict', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '2'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.valid, false, 'get correct answer');
                    assert.deepEqual(res.body.conflict, ['row', 'column', 'region'], 'get all conflict');
                    done();
                })
        });
        // #10
        test('Check a puzzle placement with missing required fileds', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    coordinate: 'A2',
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Required field(s) missing', 'get error message');
                    done();
                })
        })
        // #11
        test('Check a puzzle placement with invalid characters', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5.a2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '3'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Invalid characters in puzzle', 'get error message');
                    done();
                })
        });
        // #12
        test('Check a puzzle placement with incorrect length', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '3'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'get error message');
                    done();
                })
        });
        // #13
        test('Check a puzzle placement with invalid placement coordinate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'AB2',
                    value: '3'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Invalid coordinate', 'get error message');
                    done();
                })
        });
        // #14
        test('Check a puzzle placement with invalid placement value', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({
                    puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                    coordinate: 'A2',
                    value: '23'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Api response correctly');
                    assert.isObject(res.body, 'Response as Object');
                    assert.equal(res.body.error, 'Invalid value', 'get error message');
                    done();
                })
        });
    })
});

