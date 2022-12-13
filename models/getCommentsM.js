const db = require('../db/connection.js');
const checkReviewExists = require('../utils/checkCommentExist')

const getComments = function () {
    const queryStr = `SELECT comments.body, comments.review_id, comments.votes, comments.author, comments.created_at
    FROM comments 
    ORDER BY comments.created_at DESC`;
    return db.query(queryStr).then(function (results) {
        return results.rows;
    });
};

const getCommentByIdentification = function (identificationDigits) {
    return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [identificationDigits]).then(function (data) {
        // console.log(data.rows)
        return data.rows[0];
    });
};

const commentFromCommentIndentification = function (identificationDigits) {
    return db.query(
        `SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;`, [identificationDigits]).then(function (data) {
            if (data.rows.length > 0) {
                return data.rows
            }
            else {
                return checkReviewExists(identificationDigits)
            }
        })
}


module.exports = {
    getComments,
    getCommentByIdentification,
    commentFromCommentIndentification,
    // checkCommentExists
};


