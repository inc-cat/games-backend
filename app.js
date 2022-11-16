const express = require('express')
const endpoints = require('./control/getCategories.js')
const app = express()

// app.use(express.json())
app.get('/api/categories', endpoints.gamesCategories)


app.use((req, res, next) => {
    res.status(404).send({ message: 'NOT FOUND'})
})



module.exports = app