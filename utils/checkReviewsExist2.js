const promise = require('seed/lib/seed/base/promise.js');
const db = require('../db/connection.js');

const checkReviewExists2 = function (identificationDigits) {
    return db.query(`SELECT review_id FROM reviews WHERE review_id = $1;`, [identificationDigits]).then(function (data) {
        if (data.rows.length === 0) {
            return false
        }
        else {
            return true
        }
    })
}

module.exports = checkReviewExists2