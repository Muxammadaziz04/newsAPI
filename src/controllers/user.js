const fs = require('fs')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const { read } = require('../utils/utils')
const secret = 'secret'

const LOGIN = (req, res) => {
    let users = read('users')
    console.log(users);
    let admin = users.find(user => user.username == req.body.username && user.password == sha256(req.body.password))

    if(users){
        res.status(200).send({
            status: 200,
            token: jwt.sign({userId: admin.id}, secret)
        })
    }
}



module.exports = {
    LOGIN
}