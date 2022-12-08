const { patchReviewByID } = require('../models/patchReview')
const database = require("../models/getReviewM")

const reviewFind = function (req, res) {
    return patchReviewByID(req.params.reviewID, req.body).then(function (review) {
        res.status(202).send({ message: 'ACCEPTED', review: review })
    })
}

module.exports = { reviewFind }