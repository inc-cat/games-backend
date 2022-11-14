const database = require('../models/getdb.js')

const gamesCategories = function(req, res) {
    database.getCategories().then(function(currentData) {
        res.status(200).send({message: 'ALL OK', currentData},)
    })
}

module.exports = {
    gamesCategories
}