const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
require('../models/contato/ContatoPg')
const ContatoPg = mongoose.model('contatopg')
const {eAdmin} = require('../helpers/eAdmin')
const {eBlog} = require('../blogmd/eBlog')

router.get('/', eBlog, (req, res) =>{
    ContatoPg.findOne({}).then((contatopg)=>{
        res.render('contato/contato', {contatopg: contatopg})
    }).catch((erro)=>{
        console.log(erro)
    })
    
})

router.get('/vis-contato', eAdmin, (req, res)=>{
    ContatoPg.findOne({}).then((contatopg)=>{
        res.render('contato/vis-contato', {layout: 'admin',contatopg: contatopg})
    }).catch((erro)=>{
        console.log(erro)
    })
})

router.get('/edit-contato', eAdmin,  (req, res)=>{
    ContatoPg.findOne({}).then((contatopg)=>{
        res.render('contato/edit-contato',{ layout:"admin", contatopg: contatopg})
    }).catch((erro)=>{
        console.log(erro)
    })
    
})

router.post('/update-contato',  (req, res)=>{
    ContatoPg.findOne({_id: req.body.id}).then((contatopg)=>{
        contatopg.endereco = req.body.endereco,
        contatopg.telefone = req.body.telefone,
        contatopg.email = req.body.email,
        contatopg.site = req.body.site
        contatopg.save().then(()=>{
            req.flash("success_msg", "contato editado com sucesso!")
            res.redirect("/contato/vis-contato")
        }).catch((erro)=>{
            req.flash("error_msg", "Arquivo invalido")
            res.redirect("/contato/edit-contato")
        }).catch((erro)=>{
            console.log(erro)
        })
    })
})

//Imagem Página

router.get('/edit-contato-img', eAdmin,  (req, res) => {
    res.render('contato/edit-contato-img', { layout: "admin" })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/contato/")
    },
    filename: function (req, file, cb) {
        cb(null, "contato_img.jpg")
    }
})
var upload = multer({ storage })

router.post('/edit-contato-img',upload.single('img'), eAdmin,  (req, res) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/contato/vis-contato")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/contato/edit-contato-img")
    }

})

module.exports = router