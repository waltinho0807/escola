const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/home/HomeTopo')
const HomeTopo = mongoose.model('hometopo')
require('../models/home/HomeChamada')
const HomeChamada = mongoose.model('homechamada')
require('../models/home/HomeExtra')
const HomeExtra = mongoose.model('homeextra')
require('../models/home/HomeForm')
const HomeForm = mongoose.model('homeform')
require('../models/home/HomeEnsino')
const HomeEnsino = mongoose.model('homeensino')
require('../models/home/HomeContagem')
const HomeContagem = mongoose.model('homecontagem')
require('../models/sobre/SobreTopo')
const SobreTopo = mongoose.model('sobretopo')
require('../models/sobre/SobreLado')
const SobreLado = mongoose.model('sobrelado')
require('../models/docentes/Docentes')
const Docentes = mongoose.model('docentes')
require('../models/extra/Cursos')
const Cursos = mongoose.model('cursos')
require('../models/blog/Blog')
const Blog = mongoose.model('blog')
require('../models/home/HomeMsg')
const HomeMsg = mongoose.model('homemsg')
const {eAdmin} = require('../helpers/eAdmin')
const {eBlog} = require('../blogmd/eBlog')


router.get('/', eBlog, (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        HomeChamada.findOne({}).then((homechamada) => {
            HomeExtra.findOne({}).then((homeextra) => {
                HomeForm.findOne({}).then((homeform) => {
                    HomeEnsino.findOne({}).then((homeensino) => {
                        SobreTopo.findOne({}).then((sobretopo)=>{
                            SobreLado.findOne({}).then((sobrelado)=>{
                                Docentes.paginate({},{limit: 4}).then((docentes)=>{
                                    Cursos.paginate({}, {limit: 4}).then((cursos)=>{
                                        Blog.paginate({}, {limit: 3}).then((blog)=>{
                                            res.render('home/home', { hometopo: hometopo, homechamada: homechamada, homeextra: homeextra, homeform: homeform, homeensino: homeensino, sobretopo: sobretopo, sobrelado: sobrelado, docentes: docentes, cursos: cursos, blog: blog })
                                        })
                                        
                                    })
                                    
                                })
                               
                            })
                            
                        })
                        
                    })

                })

            })

        })

    })

})

router.get('/vis-home-top', eAdmin, (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        res.render('home/vis-home-top', { layout: "admin", hometopo: hometopo, usuario: req.user })
    })
})

router.get('/edit-home-top', eAdmin, (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        res.render('home/edit-home-top', { layout: "admin", hometopo: hometopo, usuario: req.user })
    })
})

router.post('/update-home-top', eAdmin, (req, res) => {
    HomeTopo.findOne({ _id: req.body._id }).then((hometopo) => {
        hometopo.tituloum = req.body.tituloum,
            hometopo.titulobtnum = req.body.titulobtnum,
            hometopo.urlbtnum = req.body.urlbtnum,
            hometopo.titulodois = req.body.titulodois,
            hometopo.titulobtndois = req.body.titulobtndois,
            hometopo.urlbtndois = req.body.urlbtndois,
            hometopo.subtituloum = req.body.subtituloum,
            hometopo.descum = req.body.descum,
            hometopo.subtitulodois = req.body.subtitulodois,
            hometopo.descdois = req.body.descdois,
            hometopo.subtitulotres = req.body.subtitulotres,
            hometopo.desctres = req.body.desctres,
            hometopo.subtituloquatro = req.body.subtituloquatro,
            hometopo.descquatro = req.body.descquatro

        hometopo.save().then(() => {
            req.flash("success_msg", "O conteúdo do serviço da página inicial foi editado com sucesso!")
            res.redirect('/vis-home-top')
        }).cath((erro) => {
            req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
            res.redirect('/edit-home-top')
        })

    }).catch((erro) => {
        console.log(erro)
    })

})

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "slide_home_top1.jpg")
    }
})

//home topo img 1

var upload = multer({storage})

router.get('/edit-home-top-img1', eAdmin, (req, res)=>{
    res.render('home/edit-home-top-img1', {layout: "admin", usuario: req.user})
})

router.post('/update-home-top-img1', eAdmin, upload.single('img-slideum'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-top-img1")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-top")
    }
})

//img home topo img 2

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "slide_home_top2.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-top-img2', eAdmin,(req, res)=>{
    res.render('home/edit-home-top-img2', {layout: "admin", usuario: req.user})
})

router.post('/update-home-top-img2', eAdmin, upload.single('img-slidedois'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-top-img2")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-top")
    }
})

//Home-chamada

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_chamada.jpg")
    }
})

var upload = multer({storage})

router.get('/vis-home-chamada', eAdmin, (req, res) => {
    HomeChamada.findOne({}).then((homechamada) => {
        res.render('home/vis-home-chamada', { layout: "admin", homechamada: homechamada, usuario: req.user })
    }).catch((erro)=>{
        console.log(erro)
    })
})

router.get('/edit-home-chamada', eAdmin, (req, res) => {
    HomeChamada.findOne({}).then((homechamada) => {
        res.render('home/edit-home-chamada', { layout: "admin", homechamada: homechamada, usuario: req.user })
    }).catch((erro)=>{
        console.log(erro)
    })
})


router.post('/update-home-chamada', eAdmin, (req, res) => {
    HomeChamada.findOne({ _id: req.body._id }).then((homechamada) => {
        homechamada.titulo = req.body.titulo,
            homechamada.subtitulo = req.body.subtitulo,
            homechamada.titulobtn = req.body.titulobtn,
            homechamada.urlbtn = req.body.urlbtn


        homechamada.save().then(() => {
            req.flash("success_msg", "O conteúdo do serviço da página inicial foi editado com sucesso!")
            res.redirect('/vis-home-chamada')
        }).cath((erro) => {
            req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
            res.redirect('/edit-home-chamada')
        })

    }).catch((erro) => {
        console.log(erro)
    })

})

router.get('/edit-homechamada-img', eAdmin, (req, res)=>{
    res.render('home/edit-homechamada-img', { layout: "admin", usuario: req.user })
})

router.post('/update-homechamada-img', eAdmin, upload.single('img-homechamada'), (req, res, next)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-homechamada-img")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-chamada")
    }
})

//Sessão Ensino

router.get('/vis-home-ensino', eAdmin, (req, res) => {
    HomeEnsino.findOne({}).then((homeensino) => {
        res.render('home/vis-home-ensino', { layout: "admin", homeensino: homeensino, usuario: req.user })
    })
})

router.get('/edit-home-ensino', eAdmin, (req, res) => {
    HomeEnsino.findOne({}).then((homeensino) => {
        res.render('home/edit-home-ensino', { layout: "admin", homeensino: homeensino, usuario: req.user })
    })
})

router.post('/update-home-ensino', eAdmin, (req, res) => {
    HomeEnsino.findOne({ _id: req.body._id }).then((homeensino) => {
        homeensino.subtitulo = req.body.subtitulo,
        homeensino.tituloum = req.body.tituloum,
        homeensino.descumensino = req.body.descumensino,
        homeensino.titulobtnum = req.body.titulobtnum,
        homeensino.urlbtnum = req.body.urlbtnum,
        homeensino.titulodois = req.body.titulodois,
        homeensino.descdois = req.body.descdois,
        homeensino.titulobtndois = req.body.titulobtndois,
        homeensino.urlbtndois = req.body.urlbtndois,
        homeensino.titulotres = req.body.titulotres,
        homeensino.descum = req.body.desctres,
        homeensino.titulobtntres = req.body.titulobtntres,
        homeensino.urlbtntres = req.body.urlbtntres,
        homeensino.tituloquatro = req.body.tituloquatro,
        homeensino.descquatro = req.body.descquatro,
        homeensino.titulobtnquatro = req.body.titulobtnquatro,
        homeensino.urlbtnquatro = req.body.urlbtnquatro


        homeensino.save().then(() => {
            req.flash("success_msg", "O conteúdo do Ensino da página inicial foi editado com sucesso!")
            res.redirect('/vis-home-ensino')
        }).cath((erro) => {
            req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
            res.redirect('/edit-home-top')
        })

    }).catch((erro) => {
        console.log(erro)
    })

})

//Img infantil

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "ensino_infantil.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-ensino-img-infantil', eAdmin, (req, res)=>{
    res.render('home/edit-home-ensino-img-infantil', {layout: "admin", usuario: req.user})
})

router.post('/update-home-ensino-img-infantil', eAdmin, upload.single('img-infantil'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-ensino-img-infantil")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-ensino")
    }
})

//Img fundamental
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "ensino_fundamental.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-ensino-img-fundamental', eAdmin,(req, res)=>{
    res.render('home/edit-home-ensino-img-fundamental', {layout: "admin", usuario: req.user})
})

router.post('/update-home-ensino-img-fundamental', eAdmin, upload.single('img-fundamental'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-ensino-img-fundamental")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-ensino")
    }
})

//Img médio
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "ensino_medio.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-ensino-img-medio', eAdmin,(req, res)=>{
    res.render('home/edit-home-ensino-img-medio', {layout: "admin", usuario: req.user})
})

router.post('/update-home-ensino-img-medio', eAdmin, upload.single('img-medio'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-ensino-img-medio")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-ensino")
    }
})
//img superior
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "ensino_superior.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-ensino-img-superior', eAdmin,(req, res)=>{
    res.render('home/edit-home-ensino-img-superior', {layout: "admin", usuario: req.user})
})

router.post('/update-home-ensino-img-superior', eAdmin, upload.single('img-superior'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-ensino-img-superior")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-ensino")
    }
})

//Home formulario

router.get('/vis-home-form', eAdmin, (req, res) => {
    HomeForm.findOne({}).then((homeform) => {
        res.render('home/vis-home-form', { layout: "admin", homeform: homeform, usuario: req.user })
    })
})

router.get('/edit-home-form', eAdmin, (req, res) => {
    HomeForm.findOne({}).then((homeform) => {
        res.render('home/edit-home-form', { layout: "admin", homeform: homeform, usuario: req.user })
    })
})

router.post('/update-home-form', eAdmin, (req, res) => {
    HomeForm.findOne({ _id: req.body._id }).then((homeform) => {
        homeform.titulo = req.body.titulo,
            homeform.subtitulo = req.body.subtitulo,
            homeform.titulobtn = req.body.titulobtn,



            homeform.save().then(() => {
                req.flash("success_msg", "O conteúdo do serviço da página inicial foi editado com sucesso!")
                res.redirect('/vis-home-form')
            }).cath((erro) => {
                req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
                res.redirect('/edit-home-form')
            })

    }).catch((erro) => {
        console.log(erro)
    })

})

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_form.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-form-img', eAdmin,(req, res)=>{
    res.render('home/edit-home-form-img', {layout: "admin", usuario: req.user})
})

router.post('/update-home-form-img', eAdmin, upload.single('img-form'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-form-img")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-form")
    }
})

router.post('/msg-homeform', (req, res)=>{
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

router.get('/visualisar-msg', eAdmin, (req, res) =>{
    const {page = 1} = req.query
    HomeMsg.paginate({}, {page, limit: 10}).then((homemsg)=>{
        res.render('home/visualisar-msg', {layout: "admin", homemsg: homemsg, usuario: req.user})
    })
    
})

router.get('/delete-msg/:id', eAdmin, (req, res) =>{
    HomeMsg.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Mensagem excluido com sucesso!")
        res.redirect('/visualisar-msg')
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})


//home Contagem

router.get('/vis-home-contagem', eAdmin, (req, res) => {
    HomeContagem.findOne({}).then((homecontagem) => {
        res.render('home/vis-home-contagem', { layout: "admin", homecontagem: homecontagem, usuario: req.user })
    })
})

router.get('/edit-home-contagem', eAdmin, (req, res) => {
    HomeContagem.findOne({}).then((homecontagem) => {
        res.render('home/edit-home-contagem', { layout: "admin", homecontagem: homecontagem, usuario: req.user })
    })
})

router.post('/update-home-contagem', eAdmin, (req, res) => {
    HomeContagem.findOne({ _id: req.body._id }).then((homecontagem) => {
        homecontagem.titulo = req.body.titulo,
            homecontagem.subtitulo = req.body.subtitulo,
            homecontagem.titulonumum = req.body.titulonumum,
            homecontagem.numeroum = req.body.numeroum,
            homecontagem.titulonumdois = req.body.titulonumdois,
            homecontagem.numerodois = req.body.numerodois,
            homecontagem.titulonumtres = req.body.titulonumtres,
            homecontagem.numerotres = req.body.numerotres,
            homecontagem.titulonumquatro = req.body.titulonumquatro,
            homecontagem.numeroquatro = req.body.numeroquatro



            homecontagem.save().then(() => {
                req.flash("success_msg", "O conteúdo do serviço da página inicial foi editado com sucesso!")
                res.redirect('/vis-home-contagem')
            }).cath((erro) => {
                req.flash("error_msg", "O conteúdo do serviço da página inicial não foi editado com sucesso!")
                res.redirect('/edit-home-contagem')
            })

    }).catch((erro) => {
        console.log(erro)
    })

})

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_contagem.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-contagem-img', eAdmin,(req, res)=>{
    res.render('home/edit-home-contagem-img', {layout: "admin", usuario: req.user})
})

router.post('/update-home-contagem-img', eAdmin, upload.single('img-contagem'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-contagem-img")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-contagem")
    }
})


//Galeria
router.get('/vis-home-gallery', eAdmin,(req, res)=>{
    res.render('home/vis-home-gallery', {layout: "admin", usuario: req.user})
})

//img1
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_gallery_1.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-gallery-1', eAdmin,(req, res)=>{
    res.render('home/edit-home-gallery-1', {layout: "admin", usuario: req.user})
})

router.post('/update-home-gallery-1', eAdmin, upload.single('img-um'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-gallery-1")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-gallery")
    }
})

//img2
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_gallery_2.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-gallery-2', eAdmin,(req, res)=>{
    res.render('home/edit-home-gallery-2', {layout: "admin", usuario: req.user})
})

router.post('/update-home-gallery-2', eAdmin, upload.single('img-dois'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-gallery-2")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-gallery")
    }
})

//img3
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_gallery_3.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-gallery-3', eAdmin,(req, res)=>{
    res.render('home/edit-home-gallery-3', {layout: "admin", usuario: req.user})
})

router.post('/update-home-gallery-3', upload.single('img-tres'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-gallery-3")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-gallery")
    }
})

//img4

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/home/")
    },
    filename: function (req, file, cb){
        cb(null, "home_gallery_4.jpg")
    }
})

var upload = multer({storage})

router.get('/edit-home-gallery-4', eAdmin,(req, res)=>{
    res.render('home/edit-home-gallery-4', {layout: "admin", usuario: req.user})
})

router.post('/update-home-gallery-4', eAdmin, upload.single('img-quatro'), (req, res)=>{
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/edit-home-gallery-4")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/vis-home-gallery")
    }
})


module.exports = router