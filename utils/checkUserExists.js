const promise = require('seed/lib/seed/base/promise.js');
const db = require('../db/connection.js');

const checkUserExists = function (user) {
    return db.query(`SELECT owner FROM reviews WHERE owner = $1;`, [user]).then(function (data) {
        if (data.rows.length === 0) {
            return false
        }
        else {
            return true
        }
    })
}

module.exports = checkUserExists