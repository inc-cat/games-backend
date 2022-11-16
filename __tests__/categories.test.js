const seed = require('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const request = require('supertest')
const db = require('../db/connection')
const app = require('../app.js');

afterAll(() => {
    return db.end();
});

beforeEach(() => {
    return seed(data);
});


describe('GET request for categories.', function () {
    test('Returns 200', function () {
        return request(app)
            .get('/api/categories').expect(200)
            .then(function (res) {
                expect(res.body.message).toEqual(('ALL OK'))
            })
    })
    test('Returns category list', function () {
        return request(app)
            .get('/api/categories').expect(200)
            .then(function (res) {
                expect(res.body.categories.length).toBeGreaterThan(0)
                res.body.categories.forEach(function (item) {
                    expect(item).toMatchObject({ slug: expect.any(String), description: expect.any(String) })
                })
            })
    })
    test('Returns 404', function () {
        return request(app)
            .get('/api/categoriez').expect(404)
            .then(function (res) {
                expect(res.body.message).toBe('NOT FOUND')
            })
    })
})

describe('GET request for reviews,', function () {
    test('Returns 200', function () {
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(function (res) {
                expect(res.body.message).toEqual('ALL OK');
            });
    });
    test('Returns review list.', function () {
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(function (res) {
                // const reviewEntries = res.body.reviews.map(function (entry) {
                //     entry.created_at = new Date(entry.created_at);
                //     return entry;
                // });

                expect(res.body.reviews.length).toBeGreaterThan(0);
                res.body.reviews.forEach(function (currentEntry) {
                    expect(currentEntry).toMatchObject({
                        review_id: expect.any(Number), //
                        title: expect.any(String), //
                        designer: expect.any(String), //
                        owner: expect.any(String), //
                        review_img_url: expect.any(String), //
                        category: expect.any(String), //
                        created_at: expect.any(String), //
                        votes: expect.any(Number), //
                        comment_count: expect.any(String) //
                    });
                });
            });
    });
    test('Returns 404', function () {
        return request(app).get('/api/reviewz').expect(404);
    });
});



