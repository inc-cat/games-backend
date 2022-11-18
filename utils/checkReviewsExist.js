const promise = require('seed/lib/seed/base/promise.js');
const db = require('../db/connection.js');

const checkReviewExists = function (identificationDigits) {
    return db.query(`SELECT review_id FROM reviews WHERE review_id = $1;`, [identificationDigits]).then(function (data) {
        if (data.rows.length === 0) {
            return Promise.reject({ status: 404, message: 'INVALID ID' })
        }
        else {
            return []
        }
    })
}

module.exports = checkReviewExists