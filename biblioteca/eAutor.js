const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/biblioteca/Biblioteca')
const Biblioteca = mongoose.model('biblioteca')

module.exports = {
    eAutor: function(req, res, next){
        const autor = req.body.autor
        const regex =  new RegExp(autor, 'i')
        console.log(regex)
        console.log(autor)
        Biblioteca.find({
            autor: regex
        })
        .then((biblioteca) => {
            console.log(biblioteca)
            res.render('biblioteca/biblioteca', {layout:"admin", biblioteca: biblioteca })
               
            
        })
        .catch(err => {
            console.log(err)
        })
    }
}