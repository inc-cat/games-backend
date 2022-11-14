// const model = require('seed/lib/seed/errors/model')
const database = require('../models/getdb.js')

games = function(req, res) {
    database.getCategories().then(function(currentData) {
        res.status(200).send({message: 'ALL OK', currentData},)
    })
}

module.exports = {
    games
}