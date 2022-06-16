const fs = require('fs')
const path = require('path')
const { read, write } = require('../utils/utils')


// const GET = (req, res) => {
//     let news = read('news')
//     res.status(200).send(news)
// }

const GETPOST = (req, res) => {
    let { postId } = req.params
    let news = read('news')
    let post = news.find(news => news.id == postId)
    if(!post){
        res.send({
            message: 'post topilmadi'
        })
    }

    res.status(200).send(post)
}

const GET = (req, res) => {
    let news = read('news')
    let { search, page } = req.query

    if(search){
        news = news.filter(news => news.title.toLowerCase().includes(search.toLowerCase()) || news.body.toLowerCase().includes(search.toLowerCase()))
        res.status(200).send(news)
    }
    else if(page){
        if(page > Math.ceil(news.length/8)){
            return res.send([])
        }
        news = news.slice((page-1)*8, page*8)
        res.status(200).send(news)

    } else {
        res.status(200).send(news)
    }
}

const POST = (req, res) => {
    let body = req.body
    let file = req.files.file

    let news = read('news')

    let newNews = {
        id: news.at(-1).id + 1 || 1,
        ...body,
        img: file.name
    }

    news.push(newNews)
    write('news', news)

    res.status(201).send({
        status: 201,
        message: "successful posted",
        data: newNews
    })
}


const PUT = (req, res) => {
    let { postId } = req.params
    let news = read('news')

    let changesNews = news.find(news => news.id == postId)

    changesNews = {
        ...changesNews,
        ...req.body
    }

    news = news.map(news => {
        if(news.id == changesNews.id){
            news = changesNews
        }
        return news
    })

    write('news', news)
    res.status(201).send({
        status: 201,
        message: 'successful changed'
    })
}

const DELETE = (req, res) => {
    let { postId } = req.params
    let news = read('news')

    news = news.filter(news => news.id != postId)
    write('news', news)

    res.status(201).send({
        status: 201,
        message: 'successful deleted'
    })
}


module.exports = {
    GET,
    POST,
    PUT,
    DELETE,
    GETPOST
}