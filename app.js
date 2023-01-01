const express = require('express');
const categoryEndpoints = require('./control/getCategories.js');
const reviewEndpoints = require('./control/getReviews');
const commentEndpoints = require('./control/postComment')
const patchEndpoints = require('./control/patchReview')
const patchCEndpoints = require('./control/patchComment')
const userEndpoints = require('./control/getUsers')
const app = express();
const cors = require('cors')
const deleteCEndpoints = require('./control/deleteComment')
const fs = require('fs/promises');
const { end } = require('./db/connection.js');



app.use(cors())
app.use(express.json())

app.get('/api/categories', categoryEndpoints.gamesCategories);

app.get('/api/reviews', reviewEndpoints.gamesReviews);

app.get('/api/reviews/:reviewID/comments', reviewEndpoints.commentsByIdentification)

app.get('/api/reviews/:reviewID', reviewEndpoints.gameReviewsByIdentification);

app.get('/api/users', userEndpoints.userControl)


app.post('/api/reviews/:reviewID/comments', commentEndpoints.postComment)

app.patch('/api/reviews/:reviewID', patchEndpoints.reviewFind)

app.patch('/api/comments/:commentID', patchCEndpoints.commentFind)

app.delete('/api/comments/:commentID', deleteCEndpoints.commentDel)

app.get('/api', function (req, res) {
    const endpointsJSON = fs.readFile('./info.json')
    return endpointsJSON.then(function (value) {
        // console.log(value)
        res.status(200).setHeader('content-type', 'application/json').send(value)
    })
})

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
