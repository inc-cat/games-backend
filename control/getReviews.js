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
                res.status(200).send({ message: undefined, reviews });
            }
            else {
                res.status(404).send({ message: 'NOT FOUND' })
            }
        })
    }
};

const commentsByIdentification = function (req, res, next) {
    if (isNaN(req.params.reviewID)) {
        res.status(400).send({ message: 'NUMBERS ONLY' })
    }
    else {
        return database.commentFromReviewIndentification(req.params.reviewID).then(function (comments) {
            res.status(200).send({ message: undefined, comments });
        }).catch(next)
    }


}


module.exports = {
    gamesReviews,
    gameReviewsByIdentification,
    commentsByIdentification
};
