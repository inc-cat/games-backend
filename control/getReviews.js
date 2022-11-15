const database = require('../models/getReviewM')

const gamesReviews = function(req, res) {
    database.getReviews().then(function(currentData) {
        res.status(200).send({message: 'ALL OK', currentData})
    })
}

const gameReviewsByIdentification = function(req, res) {
    database.getReviewByIdentification(req.params.reviewID).then(function(review) {
        res.send(review.review)
    })
}

module.exports = {
    gamesReviews,
    gameReviewsByIdentification
}