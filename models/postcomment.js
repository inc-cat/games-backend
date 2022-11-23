const db = require('../db/connection')

const newComment = function (comment, review_id) {
    return db.query(`INSERT INTO comments (author, body, review_id)
    VALUES
    ($1, $2, $3) RETURNING *`, [comment.username, comment.body, review_id]).
        then(function (result) {
            return result.rows[0]
        })
}

module.exports = { newComment }