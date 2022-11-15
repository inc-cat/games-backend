const express = require('express')
const endpoints = require('./control/getCategories.js')
const app = express()

// app.use(express.json())
app.get('/api/categories', endpoints.gamesCategories)

// app.use(function(err, req, res, next) {
//     res.status(err.status).send()
// })



module.exports = app