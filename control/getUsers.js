const database = require('../models/getUsers')

const userControl = function (req, res) {
    database.getUsers().then(function (user) {
        console.log(user)
        res.status(200).send({ message: 'ALL OK', user })
    })
}

module.exports = { userControl }