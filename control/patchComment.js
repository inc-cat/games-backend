const { patchCommentByID } = require('../models/patchComment')
// const database = require("../models/getcommentM")

const commentFind = function (req, res) {
    return patchCommentByID(req.params.commentID, req.body).then(function (comment) {
        res.status(202).send({ message: 'ACCEPTED', comment: comment })
    })
}

module.exports = { commentFind }