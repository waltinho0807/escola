const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/blog/Blog')
const Blog = mongoose.model('blog')

module.exports = {
    eBlog: function(req, res, next){
        const { page = 1 } = req.query
    Blog.paginate({}, { page, limit: 2 }).then((blog_rodape) => {
        res.locals.blog_rodape = blog_rodape
       
        next()
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
    }
}