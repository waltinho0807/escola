const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/blog/Blog')
const Blog = mongoose.model('blog')

module.exports = {
    eBlogvs: function(req, res, next){
        const { page = 1 } = req.query
    Blog.paginate({}, { page, limit: 3 }).then((blog_vs) => {
        res.locals.blog_vs = blog_vs
        next()
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
    }
}