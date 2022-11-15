 const db = require('../db/connection.js')

 const getReviews = function() {
    const queryStr = `SELECT * FROM reviews`
    return db.query(queryStr).then(function(results) {
        return results.rows
    })
 }

 const getReviewByIdentification = function(identificationDigits) {
    return db.query(`SELECT * FROM reviews WHERE review_id = ${identificationDigits}`)
        .then(function(data) {
            return data.rows[0]
        })
 }

 module.exports = {
    getReviews, 
    getReviewByIdentification
}