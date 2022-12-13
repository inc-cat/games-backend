const { deleteCommentByID } = require('../models/deleteComment')

const commentDel = function (req, res) {
    console.log(req.params)
    return deleteCommentByID(req.params.commentID, req.body).then(function (comment) {
        res.status(200).send({ message: 'DELETED', comment: comment })
    })
}

module.exports = { commentDel }