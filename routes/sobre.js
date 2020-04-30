const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/sobre/SobreLado')
const SobreLado = mongoose.model('sobrelado')
require('../models/sobre/SobreTopo')
const SobreTopo = mongoose.model('sobretopo')
require('../models/home/HomeContagem')
const HomeContagem = mongoose.model('homecontagem')
require('../models/home/HomeForm')
const HomeForm = mongoose.model('homeform')
require('../models/home/HomeMsg')
const HomeMsg = mongoose.model('homemsg')
const {eBlog} = require('../blogmd/eBlog')
const { eAdmin } = require('../helpers/eAdmin')

router.get('/', eBlog, (req, res)=>{
    SobreLado.findOne({}).then((sobrelado) => {
        SobreTopo.findOne({}).then((sobretopo)=>{
            HomeContagem.findOne({}).then((homecontagem)=>{
                HomeForm.findOne({}).then((homeform)=>{
                    res.render('sobre/sobre', {sobrelado: sobrelado, sobretopo: sobretopo, homecontagem: homecontagem, homeform: homeform})
                }).catch((error)=>{
                    console.log(error)
                })
                
            }).catch((error)=>{
                console.log(error)
            })
            
        }).catch((error)=>{
            console.log(error)
        })
        
    }).catch((error)=>{
        console.log(error)
    })
    
})

router.get('/vis-sobre-topo', eAdmin, (req, res)=>{
    SobreTopo.findOne({}).then((sobretopo)=>{
        res.render('sobre/vis-sobre-topo', {layout: "admin", sobretopo: sobretopo}) 
    }).catch((error)=>{
        console.log(error)
    })
    
})

router.get('/edit-sobre-topo', eAdmin, (req, res)=>{
    SobreTopo.findOne({}).then((sobretopo)=>{
        res.render('sobre/edit-sobre-topo', {layout: "admin.handlebars", sobretopo: sobretopo})
    }).catch((error)=>{
        console.log(error)
    })
    
})

router.post('/update-sobre-topo', (req, res)=>{
    SobreTopo.findOne({_id: req.body.id }).then((sobretopo)=>{
        sobretopo.titulotop = req.body.titulotop,
        sobretopo.subtitulotop = req.body.subtitulotop,
        sobretopo.tituloum = req.body.tituloum,
        sobretopo.descum = req.body.descum,
        sobretopo.titulodois = req.body.titulodois,
        sobretopo.descdois = req.body.descdois,
        sobretopo.titulotres = req.body.titulotres,
        sobretopo.desctres = req.body.desctres,
        sobretopo.tituloquatro = req.body.tituloquatro,
        sobretopo.descquatro = req.body.descquatro,
        sobretopo.titulocinco = req.body.titulocinco,
        sobretopo.desccinco = req.body.desccinco,
        sobretopo.tituloseis = req.body.tituloseis,
        sobretopo.descseis = req.body.descseis
        sobretopo.save().then(()=>{
            req.flash("success_msg", "Editado com sussesso!")
            res.redirect('/sobre/vis-sobre-topo')
        }).catch((erro)=>{
            console.log(erro)
        })
    }).catch((erro)=>{
        console.log(erro)
    })
})

router.get('/vis-sobre-lado', eAdmin, (req, res)=>{
    SobreLado.findOne({}).then((sobrelado)=>{
        res.render('sobre/vis-sobre-lado', {layout: "admin", sobrelado: sobrelado}) 
    }).catch((error)=>{
        console.log(error)
    })
    
})

router.get('/edit-sobre-lado', eAdmin, (req, res)=>{
    SobreLado.findOne({}).then((sobrelado)=>{
        res.render('sobre/edit-sobre-lado', {layout: "admin.handlebars", sobrelado: sobrelado})
    }).catch((error)=>{
        console.log(error)
    })
})

router.post('/update-sobre-lado', (req, res)=>{
    SobreLado.findOne({_id: req.body.id}).then((sobrelado)=>{
        sobrelado.titulo = req.body.titulo,
        sobrelado.desc = req.body.desc,
        sobrelado.titulobtn = req.body.titulobtn,
        sobrelado.urlbtn = req.body.urlbtn

        sobrelado.save().then(()=>{
            req.flash("success_msg", "Editado com sussesso!")
            res.redirect('/sobre/vis-sobre-lado')
        }).catch((error)=>{
            console.log(error)
        })
        
    }).catch((error)=>{
        console.log(error)
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/sobre/")
    },
    filename: function (req, file, cb){
        cb(null, "sobre.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-sobretopo-img', eAdmin, (req, res)=>{
    res.render('sobre/edit-sobretopo-img', {layout: "admin"})
})

router.post('/update-sobretopo-img', upload.single('img-sobre'), (req, res, next)=>{
    const file = req.file
    if (!file) {
        req.flash("error_msg", "Error: Selecione uma imagem JPEG!")
        res.redirect("/edit-sobretopo-img")
    } else {
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/sobre/vis-sobre-topo")
    }
})

router.post('/msg-homeform', eAdmin, (req, res)=>{
    const enviar = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        serie: req.body.serie,
        telefone: req.body.telefone,
        mensagem: req.body.mensagem,
    }

    new HomeMsg(enviar).save().then(() => {
        req.flash("success_msg", 'Mensagem Enviada')
        res.redirect("/")
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})


//Galeria Sobre
router.get('/vis-sobre-gallery', eAdmin,(req, res)=>{
    res.render('sobre/vis-sobre-gallery', {layout: "admin"})
})

//img1
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/sobre/")
    },
    filename: function (req, file, cb){
        cb(null, "sobre_gallery_1.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-sobre-gallery-1',(req, res)=>{
    res.render('sobre/edit-sobre-gallery-1', {layout: "admin"})
})

router.post('/update-sobre-gallery-1', upload.single('img-um'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-sobre-gallery-1")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/sobre/vis-sobre-gallery")
    }
})

//img2
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/sobre/")
    },
    filename: function (req, file, cb){
        cb(null, "sobre_gallery_2.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-sobre-gallery-2', eAdmin,(req, res)=>{
    res.render('sobre/edit-sobre-gallery-2', {layout: "admin"})
})

router.post('/update-sobre-gallery-2', upload.single('img-dois'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-sobre-gallery-2")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/sobre/vis-sobre-gallery")
    }
})

//img3
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/sobre/")
    },
    filename: function (req, file, cb){
        cb(null, "sobre_gallery_3.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-sobre-gallery-3', eAdmin,(req, res)=>{
    res.render('sobre/edit-sobre-gallery-3', {layout: "admin"})
})

router.post('/update-sobre-gallery-3', upload.single('img-tres'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-sobre-gallery-3")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/sobre/vis-sobre-gallery")
    }
})

//img4

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/sobre/")
    },
    filename: function (req, file, cb){
        cb(null, "sobre_gallery_4.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-sobre-gallery-4', eAdmin, (req, res)=>{
    res.render('sobre/edit-sobre-gallery-4', {layout: "admin"})
})

router.post('/update-sobre-gallery-4', upload.single('img-quatro'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-sobre-gallery-4")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/sobre/vis-sobre-gallery")
    }
})

module.exports = router