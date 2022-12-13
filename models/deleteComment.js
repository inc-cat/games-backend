const db = require('../db/connection.js');
const { getCommentByIdentification } = require('./getCommentsM')

const deleteCommentByID = function (id) {
    return getCommentByIdentification(id).then(function (comment) {
        return db.query(`DELETE FROM comments WHERE comment_id=$1`, [id])
    })
}

module.exports = { deleteCommentByID }