const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/biblioteca/Biblioteca')
const Biblioteca = mongoose.model('biblioteca')

module.exports = {
    eCategoria: function (req, res, next) {
        const categoria = req.body.categoria
        Biblioteca.find({
            categoria: categoria
        })
            .then((biblioteca) => {
                console.log(biblioteca)
                res.render('biblioteca/biblioteca', { layout: "admin", biblioteca: biblioteca })


            })
            .catch(err => {
                console.log(err)
            })
    }
}