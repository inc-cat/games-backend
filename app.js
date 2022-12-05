const express = require('express');
const categoryEndpoints = require('./control/getCategories.js');
const reviewEndpoints = require('./control/getReviews');
const commentEndpoints = require('./control/postComment')
const patchEndpoints = require('./control/patchReview')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/categories', categoryEndpoints.gamesCategories);

app.get('/api/reviews', reviewEndpoints.gamesReviews);

app.get('/api/reviews/:reviewID/comments', reviewEndpoints.commentsByIdentification)

app.get('/api/reviews/:reviewID', reviewEndpoints.gameReviewsByIdentification);


app.post('/api/reviews/:reviewID/comments', commentEndpoints.postComment)

app.patch('/api/reviews/:reviewID', patchEndpoints.reviewFind)

app.use((req, res, next) => {
    res.status(404).send({ message: 'NOT FOUND' });
});

app.use(function (err, req, res, next) {
    if (err.status && err.message) {
        res.status(err.status).send({ message: err.message })
    }
    else {
        next(err)
    }
})



module.exports = app;
