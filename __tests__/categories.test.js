const seed = require('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const request = require('supertest')
const db = require('../db/connection')

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});


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
                expect(res.body.currentData.length).toBeGreaterThan(0)
                res.body.currentData.forEach(function(item) {
                    expect(item).toMatchObject({slug: expect.any(String), description: expect.any(String)})
                })
            }) 
    })
    test('Returns 404', function() {
        const app = require('../app.js')
        return request(app)
            .get('/api/categoriez').expect(404)
            .then(function(res) {
                expect(res.body.message).toBe('NOT FOUND')
            })
    })
})


