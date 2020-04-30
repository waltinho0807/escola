const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/biblioteca/Biblioteca')
const Biblioteca = mongoose.model('biblioteca')
const { eAdmin } = require('../helpers/eAdmin')
const { eResponsavel } = require('../helpers/eResponsavel')
const { eTitulo } = require('../biblioteca/eTitulo')
const { eAutor } = require('../biblioteca/eAutor')
const { eEditora } = require('../biblioteca/eEditora')
const { eCategoria } = require('../biblioteca/eCategoria')

router.get('/', eResponsavel, (req, res) => {
    res.render('biblioteca/biblioteca', { layout: "admin", usuario: req.user })
})

router.get('/admin-biblioteca', eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Biblioteca.paginate({}, { page, limit: 6 }).then((biblioteca) => {
        res.render('biblioteca/admin-biblioteca', { layout: "admin", biblioteca: biblioteca, usuario: req.user })
    }).catch((erro) => {
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})


//cadastrar livros ----------------------------------------------------------------------
router.get('/cadastrar-livro', eAdmin, (req, res) => {
    res.render('biblioteca/cadastrar-livro', { layout: "admin", usuario: req.user })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/biblioteca/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })

router.post('/add-livro', eAdmin, upload.single('fotocapa'), (req, res) => {

    const cadastrar = {
        titulo: req.body.titulo,
        editora: req.body.editora,
        autor: req.body.autor,
        descricao: req.body.descricao,
        fotocapa: req.file.filename,
        ano: req.body.ano,
        isbn: req.body.isbn,
        categoria: req.body.categoria,
        situacao: req.body.situacao,

    }

    new Biblioteca(cadastrar).save().then(() => {
        req.flash("success_msg", 'Livro cadastrado com sussesso')
        res.redirect("/biblioteca")
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})
//---------------------------------------------------------------------------------------------------

//Visualizar livro ----------------------------------------------------------------------------------
router.get('/vis-livro/:id', eResponsavel, (req, res) => {
    Biblioteca.findOne({ _id: req.params.id }).then((biblioteca) => {
        res.render('biblioteca/vis-livro', {layout: "pais", biblioteca: biblioteca, usuario: req.user })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

})

//--------------------------------------------------------------------------------------------------

//Editar Livro -------------------------------------------------------------------------------------
router.get('/edit-livro/:id', eAdmin, (req, res) => {
    Biblioteca.findOne({ _id: req.params.id }).then((biblioteca) => {
        res.render('biblioteca/edit-livro', { layout: "admin", biblioteca: biblioteca })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

})

router.post('/update-livro', (req, res) => {
    Biblioteca.findOne({ _id: req.body.id }).then((biblioteca) => {
        biblioteca.titulo = req.body.titulo,
            biblioteca.autor = req.body.subtitulo,
            biblioteca.editora = req.body.descricaotopo,
            biblioteca.descricao = req.body.descricao,
            biblioteca.categoria = req.body.categoria,
            biblioteca.isbn = req.body.isbn,
            biblioteca.ano = req.body.ano,
            biblioteca.save().then(() => {
                req.flash("success_msg", "editado com sussesso")
                res.redirect('/biblioteca')
            }).catch((erro) => {
                console.log(erro)
                req.flash("error_msg", 'Erro algo deu errado' + erro)
                res.redirect("/blog")
            })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

//Deletar livro ---------------------------------------------------------------------------------------------

router.get("/delete-livro/:id", eAdmin, (req, res) => {
    Biblioteca.deleteOne({ _id: req.params.id }).then((biblioteca) => {
        req.flash("success_msg", "Post excluido com sucesso!")
        res.redirect('/biblioteca')
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

//Pesquisas--------------------------------------------------------------------------------------------------------------

router.post('/pesquisa-titulo', eTitulo, eResponsavel, (req, res) => {
    res.render('biblioteca/biblioteca', { layout: "admin", biblioteca: biblioteca, usuario: req.user })
})

router.post('/pesquisa-autor', eAutor, eResponsavel, (req, res) => {
    res.render('biblioteca/biblioteca', { layout: "admin", biblioteca: biblioteca, usuario: req.user })
})

router.post('/pesquisa-editora', eEditora, eResponsavel, (req, res) => {
    res.render('biblioteca/biblioteca', { layout: "admin", biblioteca: biblioteca, usuario: req.user })
})

router.post('/pesquisa-categoria', eCategoria, eResponsavel, (req, res) => {
    res.render('biblioteca/biblioteca', { layout: "admin", biblioteca: biblioteca, usuario: req.user })
})



module.exports = router
