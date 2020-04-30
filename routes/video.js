const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/serie/Serie')
const Serie = mongoose.model('serie')
require('../models/video/Video')
const Video = mongoose.model('video')
require('../models/aluno/Aluno')
const Aluno = mongoose.model('aluno')
const { eAdmin } = require('../helpers/eAdmin')
const { eResponsavel } = require('../helpers/eResponsavel')


router.get('/',  (req, res) => {
    const { page = 1 } = req.query
    Video.paginate({serie_video: req.params.serie}, { page, limit: 6 }).then((video) => {
            res.render('video/video', { layout: "pais", video: video }) 
    }).catch((erro) => {
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

    
})


router.get('/video-aluno/:serie_video',  (req, res) => {
        const { page = 1 } = req.query
        Video.paginate({serie_video: req.params.serie_video}, { page, limit: 6 }).then((video) => {
                res.render('video/video-aluno', { layout: "pais", video: video }) 
        }).catch((erro) => {
            req.flash("error_msg", 'Erro algo deu errado' + erro)
            res.redirect("/blog")
        })
    
        
    })




router.get('/add-video', (req, res) => {
    Serie.find({}).then((serie) => {
        res.render('video/add-video', { layout: "admin", serie: serie })
    })

})

router.post('/postar-video', (req, res) => {
    const postar = ({
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        descricao: req.body.descricao,
        video: req.body.video,
        serie_video: req.body.serie_video,
    })

    new Video(postar).save().then(() => {
        res.redirect('/video')
    }).catch((erro) => {
        console.log(erro)
    })
})


module.exports = router