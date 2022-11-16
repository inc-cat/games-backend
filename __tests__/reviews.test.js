const { TestWatcher } = require('jest');
const request = require('supertest');

describe('GET request for reviews,', function () {
    test('Returns 200', function () {
        const app = require('../app');
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(function (res) {
                expect(res.body.message).toEqual('ALL OK');
            });
    });
    test('Returns review list.', function () {
        const app = require('../app');
        const reviews = require('../db/data/test-data/reviews');
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(function (res) {
                const reviewEntries = res.body.currentData.map(function (entry) {
                    entry.created_at = new Date(entry.created_at);
                    return entry;
                });

                expectedLength = reviews.length;
                expect(reviewEntries.length).toEqual(expectedLength);
                reviewEntries.forEach(function (currentEntry) {
                    expect(currentEntry).toMatchObject({
                        review_id: expect.any(Number),
                        title: expect.any(String),
                        designer: expect.any(String),
                        owner: expect.any(String),
                        review_img_url: expect.any(String),
                        review_body: expect.any(String),
                        category: expect.any(String),
                        created_at: expect.any(Date),
                        votes: expect.any(Number),
                    });
                });
            });
    });
    test('Returns 404', function () {
        const app = require('../app.js');
        return request(app).get('/api/reviewz').expect(404);
    });
});
