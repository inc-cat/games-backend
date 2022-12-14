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

describe('GET request for reviews.', function () {
    test('Returns 200', function () {
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(function (res) {
                expect(res.body.message).toEqual('ALL OK');
            });
    });
    test('Returns review list sorted by created_at in descending order.', function () {
        return request(app)
            .get('/api/reviews')
            .expect(200)
            .then(function (res) {
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
                expect(res.body.reviews).toBeSortedBy('created_at', { descending: true })
            });
    });

    test('Returns 404', function () {
        return request(app).get('/api/reviewz').expect(404);
    });

});

describe('GET request for specific review ID', function () {
    test('Returns 200', function () {
        return request(app)
            .get('/api/reviews/1').expect(200)
    })
    test('Returns entry from provided ID typed into URL', function () {
        return request(app)
            .get('/api/reviews/1').expect(200)
            .then(function (res) {
                expect(res.body.reviews).toMatchObject({
                    review_id: expect.any(Number),
                    title: expect.any(String),
                    category: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_body: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                })
            })
    })
    test('Returns 404 with incorrect number entered', function () {
        return request(app)
            .get('/api/reviews/0').expect(404)
            .then(function (res) {
                expect(res.body.message).toBe('NOT FOUND')
            })
    })
    test('Returns 400 with incorrect input', function () {
        return request(app)
            .get('/api/reviews/a').expect(400)
            .then(function (res) {
                expect(res.body.message).toBe('NUMBERS ONLY')
            })
    })
})

describe('GET request for comments linked to specific ID.', function () {
    test('Returns 200', function () {
        return request(app)
            .get('/api/reviews/2/comments').expect(200)
    })
    test('Returns array', function () {
        return request(app)
            .get('/api/reviews/3/comments')
            .then(function (res) {
                expect(Array.isArray(res.body.comments)).toBe(true)
            })
    })
    test('Returns a sorted array of comments linked to specific review ID if applicable.', function () {
        return request(app)
            .get('/api/reviews/2/comments')
            .then(function (res) {
                res.body.comments.forEach(function (specific) {
                    expect(specific).toMatchObject({
                        comment_id: expect.any(Number),
                        body: expect.any(String),
                        review_id: expect.any(Number),
                        author: expect.any(String),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                    })
                    expect(res.body.comments).toBeSortedBy('created_at', { descending: true })
                })
            })
    })
    test('Returns 200 when ID with no comments is typed in.', function () {
        return request(app)
            .get('/api/reviews/1/comments').expect(200)
            .then(function (res) {
                expect(res.body.comments).toEqual([])
            })
    })
    test('Returns 404 when incorrect invalid ID typed in.', function () {
        return request(app)
            .get('/api/reviews/99/comments').expect(404)
            .then(function (res) {
                expect(res.body.message).toBe('INVALID ID')
            })
    })

    test('Returns 400 when incorrect invalid ID typed in.', function () {
        return request(app)
            .get('/api/reviews/a/comments').expect(400)
            .then(function (res) {
                expect(res.body.message).toBe('NUMBERS ONLY')
            })
    })


})

describe("POST request for new comment.", function () {
    test("Post new comment to database.", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({
                username: "bainesface",
                body: 'I heard theLegend27 defeated an entire army with a single blow.',
            })
            .expect(201)
            .then((res) => {
                expect(res.body).toMatchObject({
                    comment: {
                        author: 'bainesface',
                        body: 'I heard theLegend27 defeated an entire army with a single blow.',
                        votes: 0,
                        review_id: 2,
                        comment_id: expect.any(Number),
                        created_at: expect.any(String)
                    },
                });
            });
    });
    test("Returns 400 if username provided is blank", function () {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({
                username: "",
                body: 'Usernames are for dorks.',
            })
            .expect(400).then(function (res) {
                expect(res.body.message).toBe('USERNAME NOT PROVIDED')
            })

    });

    test("Returns 404 for invalid username.", () => {
        return request(app)
            .post("/api/reviews/2/comments")
            .send({
                username: "your_mother",
                body: 'please could you bring back some tuna?',
            })
            .expect(404).then(function (res) {
                expect(res.body.message).toBe('INVALID USERNAME')
            })
    });

    test("Returns 404 for invalid review ID.", () => {
        return request(app)
            .post("/api/reviews/99999/comments")
            .send({
                username: "bainesface",
                body: "urfhhewuoheueferfuh"
            })
            .expect(404)
    })

});

describe('PATCH request for review', function () {
    test('Returns 202 for accepted patch.', function () {
        return request(app)
            .patch('/api/reviews/2')
            .send({
                review_img_url: 'https://archives.bulbagarden.net/media/upload/thumb/b/b1/151Mew.png/250px-151Mew.png',
                review_body: 'Farmyard fun!!!!',
            })
            .expect(202).then(function (res) {
                expect(res.body.message).toBe('ACCEPTED')
            })
    })
    test('Patches a specific entry with an input object.', function () {
        return request(app)
            .patch('/api/reviews/2')
            .send({
                review_img_url: 'https://archives.bulbagarden.net/media/upload/thumb/b/b1/151Mew.png/250px-151Mew.png',
                review_body: 'Farmyard fun!!!!',
            }).
            expect(202).then(function (res) {
                expect(res.body.review).toMatchObject({
                    review_img_url: 'https://archives.bulbagarden.net/media/upload/thumb/b/b1/151Mew.png/250px-151Mew.png',
                    review_body: 'Farmyard fun!!!!',
                }
                )
            })
    })
})

describe('PATCH request for comment', function () {
    test('Returns 202 for accepted comment patch', function () {
        return request(app)
            .patch('/api/comments/2')
            .send({
                body: 'This is fun'
            })
            .expect(202).then(function (res) {
                expect(res.body.comment).toMatchObject({
                    body: 'This is fun'
                })
            })
    })
})

describe('GET list of users.', function () {
    test('Returns 200.', function () {
        return request(app)
            .get('/api/users').expect(200)
    })
    test('Returns list of users with information', function () {
        return request(app)
            .get('/api/users').expect(200).then(function (res) {
                expect(res.body.user[0]).toMatchObject({ users: expect.any(String), avatar_url: expect.any(String), name: expect.any(String), username: expect.any(String) })
            })
    })
})

describe('DELETE specified comment.', function () {
    test('Returns 200', function () {
        return request(app)
            .delete('/api/comments/2').expect(200)
    })
    test('Removes specified item from list from ID provided in URL.', function () {
        return request(app)
            .delete('/api/comments/2').expect(200).then(function (res) {
                console.log(res.body)
                expect(res.body.comment.rows).toEqual([])
            })
    })
})