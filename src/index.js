const express = require('express')
const fileupload = require('express-fileupload')
const newsRoute = require('./routes/news')
const userRoute = require('./routes/login')
const { checkAdmin } = require('./middlewares/admin')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(fileupload())
app.use(checkAdmin)
app.use(newsRoute)
app.use(userRoute)



app.listen(PORT, () => console.log('Server is run'))