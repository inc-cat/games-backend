const { TestWatcher } = require('jest')
const request = require('supertest')


describe('GET request for reviews,', function() {
    test('Returns 200', function() {
        const app = require('../app')
        return request(app)
        .get('/api/reviews',).expect(200)
        .then(function(res) {
            expect(res.body.message).toEqual(('ALL OK'))
        })
    })
    test('Returns review list.', function() {
        const app = require('../app')
        const reviews = require('../db/data/test-data/reviews')
        return request(app)
        .get('/api/reviews').expect(200)
        .then(function(res) {

        
        let entriesBody = res.body.currentData
        let entriesNoIdentification = entriesBody.map(function(entry){
          delete entry.review_id
          entry.created_at = new Date(entry.created_at)
          return entry
        })        
        const firstEntry = reviews[0]
        expectedLength = reviews.length

        // expect(entriesNoIdentification).toEqual((reviews))
        expect(entriesNoIdentification[0]).toEqual((firstEntry))
        expect(entriesNoIdentification.length).toEqual(expectedLength)
        })
    })
    test('Returns 404', function() {
        const app = require('../app.js')
        return request(app)
        .get('/api/reviewz').expect(404)
    })
})


