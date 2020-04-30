const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/docentes/Docentes')
const Docentes = mongoose.model('docentes')
const {eAdmin} = require('../helpers/eAdmin')
const {eBlog} = require('../blogmd/eBlog')

router.get('/', eBlog, (req, res)=>{
    const {page = 1} = req.query
    Docentes.paginate({}, {page, limit: 8}).then((docentes)=>{
        res.render('docentes/docentes', {docentes: docentes})
    }).catch((erro)=>{
        req.flash("error_msg", 'Erro algo deu errado'+ erro)
        res.redirect("/blog")
    })
    
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/docentes/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.get('/add-docente', eAdmin, (req, res)=>{
    res.render('docentes/add-docente', {layout: "admin", usuario: req.user})
})

router.post('/criar-docente', upload.single('imagem'),  (req, res)=>{
    const criar = {
        nome: req.body.nome,
        aula: req.body.aula,
        desc: req.body.descricao,
        imagem: req.file.filename,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        tweeter: req.body.tweeter,
        google: req.body.google
    }

    new Docentes(criar).save().then(()=>{
        req.flash("success_msg", 'Post criado com sussesso')
        res.redirect("/docentes/add-docente")
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado'+ erro)
        res.redirect("/" + erro)
    })
    
})

router.get('/vis-docentes', eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Docentes.paginate({}, { page, limit: 10 }).then((docentes) => {
        res.render('docentes/vis-docentes', { layout: "admin", docentes: docentes, usuario: req.user })
    }).catch((erro)=>{
        req.flash("error_msg", 'Erro algo deu errado'+ erro)
        res.redirect("/" + erro)
    })

})

router.get('/edit-docentes/:id', eAdmin, (req, res) => {
    Docentes.findOne({_id: req.params.id}).then((docentes) => {
        res.render('docentes/edit-docentes', { layout: "admin", docentes: docentes, usuario: req.user })
    }).catch((erro)=>{
        req.flash("error_msg", 'Erro algo deu errado'+ erro)
        res.redirect("/" + erro)
    })

})

router.post('/update-docentes',  (req, res) =>{
    Docentes.findOne({_id: req.body.id}).then((editar)=>{
        console.log(editar)
        editar.nome = req.body.nome,
        editar.aula = req.body.aula,
        editar.desc = req.body.descricao,
        editar.facebook = req.body.facebook,
        editar.instagram = req.body.instagram,
        editar.tweeter = req.body.tweeter
        editar.save().then(()=>{
            res.redirect('/docentes')
        }).catch((erro)=>{
            console.log(erro)
            res.redirect('/docentes/vis-docentes')
        })
    }).catch((erro)=>{
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado'+ erro)
        res.redirect("/docentes/edit-docentes" + erro)
    })
})

router.get('/delete-docentes/:id', eAdmin,  (req, res)=>{
    Docentes.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Docente excluido com sucesso!")
        res.redirect('/docentes/vis-docentes')
    }).catch((erro)=>{
        console.log(erro)
    })
})

//Imagem Página

router.get('/edit-docentes-img', eAdmin, (req, res) => {
    res.render('docentes/edit-docentes-img', { layout: "admin", usuario: req.user })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/docentes/img-page")
    },
    filename: function (req, file, cb) {
        cb(null, "docentes_img.jpg")
    }
})
var upload = multer({ storage })

router.post('/edit-docente-img',upload.single('img'), eAdmin, (req, res) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/docentes/vis-docentes")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/docentes/vis-docentes")
    }

})




module.exports = router