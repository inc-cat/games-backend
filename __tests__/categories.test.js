// const seed = require('../db/seeds/seed.js')
// const data = require('../db/data/test-data/index.js')
const request = require('supertest')


describe('GET request for categories.', function() {
    test('Returns 200', function() {
        const app = require('../app.js')
        return request(app)
            .get('/api/categories').expect(200)
            .then(function(res) {
                expect(res.body.message).toEqual(('ALL OK'))
            })
    })
    test('Returns category list', function() {
        const app = require('../app.js')
        return request(app)
            .get('/api/categories').expect(200)
            .then(function(res) {
                const expectedBody = [
                    {"slug":"strategy","description":"Strategy-focused board games that prioritise limited-randomness"},
                    {"slug":"hidden-roles","description":"One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role"},
                    {"slug":"dexterity","description":"Games involving physical skill, something like Gladiators, for Board Games!"},
                    {"slug":"push-your-luck","description":"Games that allow you to take bigger risks to achieve increasingly valuable rewards - or to decide to keep what you’ve got before you lose everything."},
                    {"slug":"roll-and-write","description":"Roll some dice and decide how to use the outcome, writing it into a personal scoring sheet. "},
                    {"slug":"deck-building","description":"Games where players construct their own deck as a main element of the gameplay"},
                    {"slug":"engine-building","description":"Games where players construct unique points-gaining engines main element of the gameplay"}
                ]
                const expectedLength = expectedBody.length
                const firstEntry = res.body.currentData[0]
                expect(res.body.currentData).toEqual((expectedBody))
                expect(res.body.currentData[0]).toEqual((firstEntry))
                expect(res.body.currentData.length).toBe((expectedLength))
            }) 
    })
    test('Returns 404', function() {
        const app = require('../app.js')
        return request(app)
            .get('/api/categoriez').expect(404)
    })
})


