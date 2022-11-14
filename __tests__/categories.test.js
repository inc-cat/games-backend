// const seed = require('../db/seeds/seed.js')
// const data = require('../db/data/test-data/index.js')
const request = require('supertest')
const app = require('../app.js')


describe('GET request for categories.', function() {
    test('Returns 200', function() {
        return request(app)
            .get('/api/categories').expect(200)
            .then(function(res) {
                expect(res.body.message).toEqual(('ALL OK'))
            })
    })
    test('Returns category list', function() {
        return request(app)
            .get('/api/categories').expect(200)
            .then(function(res) {
                expect(res.body.currentData[0]).toEqual(({"slug":"strategy","description":"Strategy-focused board games that prioritise limited-randomness"}))
            }) 
    })
})


