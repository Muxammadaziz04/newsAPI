const express = require('express')
const { GET, POST, PUT, DELETE, GETPOST } = require('../controllers/news')
const { checkAdmin } = require('../middlewares/admin')

const route = express.Router()

route.get('/news', GET)
route.get('/news/:postId', GETPOST)
route.post('/news', POST)
route.put('/news/:postId', PUT)
route.delete('/news/:postId', DELETE)


module.exports = route