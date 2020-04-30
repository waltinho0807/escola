const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/biblioteca/Biblioteca')
const Biblioteca = mongoose.model('biblioteca')

module.exports = {
    eTitulo: function(req, res, next){
        const titulo = req.body.titulo
        const regex =  new RegExp(titulo, 'i')
        console.log(regex)
        console.log(titulo)
        Biblioteca.find({
            titulo: regex
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