const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/extra/Cursos')
const Cursos = mongoose.model('cursos')
const {eAdmin} = require('../helpers/eAdmin')
const {eBlog} = require('../blogmd/eBlog')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/cursos/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.get('/', eBlog, (req, res) => {
    const { page = 1 } = req.query
    Cursos.paginate({}, { page, limit: 6 }).then((cursos) => [
        res.render('cursos/cursos', { cursos: cursos })
    ]).catch((erro) => {
        console.log('erro')
    })

})

router.get('/add-curso', eAdmin,  (req, res) => {
    res.render('cursos/add-curso', { layout: "admin", usuario: req.user })
})

router.post('/criar-curso', upload.single('imgcurso'),  (req, res) => {
    const curso = {
        curso: req.body.curso,
        periodo: req.body.periodo,
        urlcurso: req.body.urlcurso,
        desccurso: req.body.desccurso,
        imgcurso: req.file.filename
    }

    new Cursos(curso).save().then(() => {
        req.flash('success_msg', 'Curso Criado com sussesso')
        res.redirect('/cursos')
    }).catch((erro) => {
        req.flash('error_msg', 'Algo deu errado')
        res.redirect('/cursos/add-curso')
    })
})

router.get('/vis-curso', eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Cursos.paginate({}, { page, limit: 8 }).then((cursos) => {
        res.render('cursos/vis-curso', { layout: "admin", cursos: cursos, usuario: req.user })
    })

})

router.get('/edit-cursos/:id', eAdmin,  (req, res) => {
    Cursos.findOne({ _id: req.params.id }).then((curso) => {
        res.render('cursos/edit-cursos', { layout: "admin", curso: curso, usuario: req.user })
    }).catch((erro) => {
        req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
        res.redirect('/edit-cursos')
    })
})

router.post('/update-curso',  (req, res) => {
    Cursos.findOne({ _id: req.body.id }).then((cursos) => {
        cursos.curso = req.body.curso,
            cursos.periodo = req.body.periodo,
            cursos.urlcurso = req.body.urlcurso,
            cursos.desccurso = req.body.desccurso

        cursos.save().then(() => {
            req.flash("success_msg", "O conteúdo foi editado com sucesso!")
            res.redirect('/vis-curso')
        }).cath((erro) => {
            console.log(erro)
            req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
            res.redirect('/vis-cursos')
        })

    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
        res.redirect('/edit-home-chamada')
    })

})

router.get('/delete-cursos/:id', eAdmin,  (req, res)=>{
    Cursos.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Curso excluido com sucesso!")
        res.redirect('/cursos/vis-curso')
    }).catch((erro)=>{
        console.log(erro)
    })
})

//Imagem Página

router.get('/edit-cursos-img', eAdmin,  (req, res) => {
    res.render('cursos/edit-cursos-img', { layout: "admin", usuario: req.user })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/cursos/img-page")
    },
    filename: function (req, file, cb) {
        cb(null, "cursos_img.jpg")
    }
})
var upload = multer({ storage })

router.post('/edit-cursos-img',upload.single('img'), eAdmin, (req, res) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/cursos/vis-cursos")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/cursos/vis-curso")
    }

})


module.exports = router