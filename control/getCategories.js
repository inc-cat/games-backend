const database = require('../models/getdb.js');

const gamesCategories = function (req, res) {
    database.getCategories().then(function (categories) {
        res.status(200).send({ message: 'ALL OK', categories });
    });
};

module.exports = {
    gamesCategories,
};
