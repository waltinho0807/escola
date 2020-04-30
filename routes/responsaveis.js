const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const bcryptjs = require('bcryptjs')
require('../models/usuario/Usuario')
const Usuario = mongoose.model('usuario')
require('../models/serie/Serie')
const Serie = mongoose.model('serie')
require('../models/aluno/Aluno')
const Aluno = mongoose.model('aluno')
require('../models/aluno/Img_aluno')
const Img_aluno = mongoose.model('img_aluno')
const { eAdmin } = require('../helpers/eAdmin')
const { eResponsavel } = require('../helpers/eResponsavel')




router.get('/', eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Usuario.paginate({}, { page, limit: 15 }).then((user) => {
        res.render('usuario/responsaveis', { layout: "admin", usuario: req.user, user: user })
    }).catch((erro) => {
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

})

router.get('/cadastrar-responsaveis', eAdmin, (req, res) => {
    res.render('usuario/cadastrar-responsaveis', { layout: "admin", usuario: req.user })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/responsaveis/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.post('/add-responsavel', eAdmin, (req, res) => {
    var senha = req.body.senha
    bcryptjs.genSalt(10, (erro, salt) => {
        bcryptjs.hash(senha, salt, (erro, hash) => {
            if (erro) {
                console.log(erro)
                res.send('Erro')
            } else {
                var senha_cripto = hash
                new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: senha_cripto,
                    cpf: req.body.cpf,
                    rr: req.body.rr,
                    acesso: req.body.acesso
                }).save().then(() => {
                    res.send('Cadastrado')
                }).catch((erro) => {
                    req.flash('error_msg', 'Erro')
                })
            }
        })
    })


})


router.get('/add-boleto', eAdmin, (req, res) => {
    res.render('usuario/add-boleto', { layout: "admin", usuario: req.user })
})

// Cadastrar aluno----------------------------------------------------------------------------

router.get('/vis-aluno', eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Aluno.paginate({}, { page, limit: 15 }).then((aluno) => {
        Img_aluno.find({}).populate('aluno').then((img_aluno)=>{
            res.render('usuario/vis-aluno', { layout: "admin", usuario: req.user, aluno: aluno, img_aluno: img_aluno })
        })
        
    }).catch((erro) => {
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        console.log(erro)
        res.redirect("/blog")
    })


})

router.get('/cadastrar-aluno', eAdmin, (req, res) => {
    Usuario.find({}).then((responsavel) => {
        Serie.find({}).then((serie)=>{
            res.render('usuario/cadastrar-aluno', { layout: "admin", usuario: req.user, responsavel: responsavel, serie: serie })
        })
        
    })

})

router.post('/add-aluno', (req, res) => {
    const cadastrar = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        ra: req.body.ra,
        serie: req.body.serie,
        rr_responsavel: req.body.rr_responsavel,

    }

    new Aluno(cadastrar).save().then(() => {
        req.flash("success_msg", 'Aluno criado com sussesso')
        res.redirect("/responsaveis/vis-aluno")
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

router.get('/delete-aluno/:id', (req, res) => {
    Aluno.deleteOne({ _id: req.params.id }).then((aluno) => {
        req.flash("success_msg", "Post excluido com sucesso!")
        res.redirect('/responsaveis/vis-aluno')
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

// Img Aluno ------------------------------------------------------------------------------------------

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/aluno/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.get('/img-aluno/:id', eResponsavel, (req, res) => {
    Aluno.findOne({ _id: req.params.id }).then((aluno) => {
        res.render('usuario/img-aluno', { layout: "pais", aluno: aluno })
    })

})

router.post('/foto-perfil-aluno', eResponsavel, upload.single('foto_perfil'), (req, res) => {
    const upload_aluno = {
        ra_aluno: req.body.id,
        foto_aluno: req.file.filename
    }  
    new Img_aluno(upload_aluno).save().then(()=>{
        res.redirect("/responsaveis/vis-aluno")
    }).catch((erro) => {
        console.log(erro)
        
    })
    })






//-------------------------------------------------------------------------------------------------------------

router.get('/biblioteca', (req, res) => {
    res.render('usuario/responsaveis', { layout: "pais", usuario: req.user })
})

router.get('/aulas', (req, res) => {
    res.render('usuario/responsaveis', { layout: "pais", usuario: req.user })
})



module.exports = router