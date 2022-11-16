const express = require('express');
const categoryEndpoints = require('./control/getCategories.js');
const reviewEndpoints = require('./control/getReviews');

const app = express();

// app.use(express.json())

app.get('/api/categories', categoryEndpoints.gamesCategories);

app.get('/api/reviews', reviewEndpoints.gamesReviews);

app.get('/api/reviews/:reviewID', reviewEndpoints.gameReviewsByIdentification);

app.use((req, res, next) => {
    res.status(404).send({ message: 'NOT FOUND' });
});

module.exports = app;
