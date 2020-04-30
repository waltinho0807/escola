const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/biblioteca/Biblioteca')
const Biblioteca = mongoose.model('biblioteca')

module.exports = {
    eEditora: function (req, res, next) {
        const editora = req.body.editora
        const regex = new RegExp(editora, 'i')
        console.log(regex)
        console.log(editora)
        Biblioteca.find({
            editora: regex
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