const db = require('../db/connection.js');
const { getCommentByIdentification } = require('./getCommentsM')

const patchCommentByID = function (id, obj) {
    return getCommentByIdentification(id).then(function (comment) {
        const keys = Object.keys(obj)

        keys.forEach(function (key) {
            comment[key] = obj[key]
        })

        return db.query('UPDATE comments SET body=$2, votes=$3, author=$4, review_id=$5, created_at=$6 WHERE comment_id=$1', [comment.comment_id, comment.body, comment.votes, comment.author, comment.comment_id, comment.created_at]).then(function (res) {
            return comment
        })

    })



}
module.exports = { patchCommentByID }