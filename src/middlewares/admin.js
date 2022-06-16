const jwt = require('jsonwebtoken')
const secret = 'secret'

const checkAdmin = (req, res, next) => {
    try {
        if(req.method == "GET" || req.url == "/login") next()

        let token = req.headers.token
        token = jwt.verify(token, secret)

        if(token.userId == 1){
            next()
        }
        else {
            next(new Error('siz admin emassiz'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkAdmin
}