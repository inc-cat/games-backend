const db = require('../db/connection.js');

getCategories = function () {
    const queryStr = `SELECT * FROM categories`;
    return db.query(queryStr).then(function (results) {
        return results.rows;
    });
};

module.exports = {
    getCategories,
};
