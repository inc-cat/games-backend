const db = require('../db/connection.js');

const getUsers = function () {
    const queryStr = `SELECT users.username, users.name, users,avatar_url FROM users
    ORDER BY users.username ASC`
    return db.query(queryStr).then(function (results) {
        return results.rows;
    });
}

module.exports = { getUsers }