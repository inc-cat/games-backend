const db = require('../db/connection.js');
const { getReviewByIdentification } = require('./getReviewM')

const patchReviewByID = function (id, obj) {
    return getReviewByIdentification(id).then(function (review) {
        console.log(review)
        const keys = Object.keys(obj)
        console.log(obj)

        keys.forEach(function (key) {
            review[key] = obj[key]
        })
        console.log(review)
        console.log(keys)

        return db.query('UPDATE reviews SET title=$2, owner=$3, category=$4, review_img_url=$5, created_at=$6, votes=$7, designer=$8 WHERE review_id=$1', [review.review_id, review.title, review.owner, review.category, review.review_img_url, review.created_at, review.votes, review.designer]).then(function (res) {
            return review
        })

    })



}
module.exports = { patchReviewByID }