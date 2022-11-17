const database = require('../models/getReviewM');

const gamesReviews = function (req, res) {
    database.getReviews().then(function (reviews) {
        res.status(200).send({ message: 'ALL OK', reviews });
    });
};

const gameReviewsByIdentification = function (req, res) {
    if (isNaN(req.params.reviewID)) {
        res.status(400).send({ message: 'NUMBERS ONLY' })
    }

    else {

        database.getReviewByIdentification(req.params.reviewID).then(function (reviews) {
            if (reviews) {
                res.status(200).send({ message: 'ALL OK', reviews });
            }
            else {
                res.status(404).send({ message: 'NOT FOUND' })
            }
        })
    }
};

module.exports = {
    gamesReviews,
    gameReviewsByIdentification,
};
