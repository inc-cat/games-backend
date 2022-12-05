const { patchReviewByID } = require('../models/patchReview')
const database = require("../models/getReviewM")

const reviewFind = function (req, res) {
    return patchReviewByID(req.params.reviewID, req.body).then(function (review) {
        console.log(review)
        const keys = Object.keys(req.body)
        console.log(req.body)

        keys.forEach(function (key) {
            review[key] = req.body[key]


        })
        console.log(review)
        console.log(keys)
        res.status(202).send({ message: 'ACCEPTED', review: review })
    })
}

module.exports = { reviewFind }