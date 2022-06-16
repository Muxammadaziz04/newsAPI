const express = require('express')
const { LOGIN } = require('../controllers/user')

const route = express.Router()

route.post('/login', LOGIN)


module.exports = route