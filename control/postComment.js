const e = require('express')
const database = require('../models/postcomment')
const checkUserExists = require('../utils/checkUserExists')
const checkReviewExists2 = require('../utils/checkReviewsExist2')

const postComment = function (req, res) {
    if (!req.body.username) {
        res.status(400).send({ message: 'USERNAME NOT PROVIDED' })
        return
    }
    else if (isNaN(req.params.reviewID)) {
        res.status(400).send({ message: 'INVALID INPUT' })
        return
    }

    checkUserExists(req.body.username).then(function (user) {
        if (!user) {
            res.status(404).send({ message: 'INVALID USERNAME' })
        }
        else {

            checkReviewExists2(req.params.reviewID).then(function (id) {
                if (!id) {
                    res.status(404).send({ message: 'INVALID ID' })
                }
                else {
                    database.newComment(req.body, req.params.reviewID).then(function (comment) {
                        res.status(201).send({ comment })
                    }).catch(function (err) {
                        console.log(err)
                        res.status(404).send()
                    })
                }
            })



        }
    })





}

module.exports = { postComment }