const promise = require('seed/lib/seed/base/promise.js');
const db = require('../db/connection.js');

const checkCommentExists = function (identificationDigits) {
    return db.query(`SELECT comment_id FROM reviews WHERE comment_id = $1;`, [identificationDigits]).then(function (data) {
        if (data.rows.length === 0) {
            return Promise.reject({ status: 404, message: 'INVALID ID' })
        }
        else {
            return []
        }
    })
}

module.exports = checkCommentExists