const db = require('../db/connection.js');
const { getReviewByIdentification } = require('./getReviewM')

const patchReviewByID = function (id) {
    return getReviewByIdentification(id).then(function (review) {
        return review

    })

}
module.exports = { patchReviewByID }