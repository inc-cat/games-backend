const db = require('../db/connection.js');
const checkCommentExists = require('../utils/checkCommentsExist')

const getComments = function () {
    const queryStr = `SELECT comments.body, comments.review_id, comments.votes, comments.author, comments.created_at, COUNT (comments.comment_id) AS comment_count
    FROM comments 
    LEFT JOIN comments ON comments.review_id = comments.review_id GROUP BY
    comments.review_id
    ORDER BY comments.created_at DESC`;
    return db.query(queryStr).then(function (results) {
        return results.rows;
    });
};

const getCommentByIdentification = function (identificationDigits) {
    return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [identificationDigits]).then(function (data) {
        return data.rows[0];
    });
};

const commentFromCommentIndentification = function (identificationDigits) {
    return db.query(
        `SELECT * FROM comments WHERE comment_id = $1 ORDER BY created_at DESC;`, [identificationDigits]).then(function (data) {
            if (data.rows.length > 0) {
                return data.rows
            }
            else {
                return checkCommentExists(identificationDigits)
            }
        })
}


module.exports = {
    getComments,
    getCommentByIdentification,
    commentFromCommentIndentification,
    checkCommentExists
};


