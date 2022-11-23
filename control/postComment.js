const database = require('../models/postcomment')

const postComment = function (req, res) {
    database.newComment(req.body, req.params.reviewID).then(function (comment) {
        res.status(201).send({ comment })
    })
}

module.exports = { postComment }