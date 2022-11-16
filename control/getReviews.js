const database = require('../models/getReviewM');

const gamesReviews = function (req, res) {
    database.getReviews().then(function (reviews) {
        res.status(200).send({ message: 'ALL OK', reviews });
    });
};

const gameReviewsByIdentification = function (req, res) {
    database.getReviewByIdentification(req.params.reviewID).then(function (reviews) {
        res.send(reviews.review);
    });
};

module.exports = {
    gamesReviews,
    gameReviewsByIdentification,
};
