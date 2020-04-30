const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('../models/blog/Blog')
const Blog = mongoose.model('blog')
const { eAdmin } = require('../helpers/eAdmin')
const {eBlog} = require('../blogmd/eBlog')
const {eBlogvs} = require('../blogmd/eBlogvs')

router.get('/', eBlog, (req, res) => {
    const { page = 1 } = req.query
    Blog.paginate({}, { page, limit: 6 }).then((blog) => {
        res.render('blog/blog', { blog: blog })
    }).catch((erro) => {
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

})



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/blog/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage })


router.get('/add-post', eAdmin, (req, res) => {
    res.render('blog/add-post', { layout: "admin" })
})

router.post('/criar-post', upload.single('imagem'), eAdmin, (req, res) => {

    const postar = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        desctopo: req.body.descricaotopo,
        descricao: req.body.descricao,
        imagem: req.file.filename,
        categoria: req.body.categoria,
        tag: req.body.tag,
        // imagemdois: req.file.filename,
        //imagemtres: req.file.filename
    }

    new Blog(postar).save().then(() => {
        req.flash("success_msg", 'Post criado com sussesso')
        res.redirect("/blog")
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

router.get('/vis-blog/:id', eBlog, eBlogvs, (req, res) => {
    Blog.findOne({ _id: req.params.id }).then((blog) => {
        res.render('blog/vis-blog', { blog: blog })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

})

router.get('/categoria/:categoria', (req, res) => {
    const { page = 1 } = req.query
    Blog.paginate({ categoria: req.params.categoria }, { page, limit: 6 }).then((blog) => {
        res.render('blog/blog', { blog: blog })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

router.get('/tag/:tag', (req, res) => {
    const { page = 1 } = req.query
    Blog.paginate({ tag: req.params.tag }, { page, limit: 6 }).then((blog) => {
        res.render('blog/blog', { blog: blog })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

router.get('/visualisar-blog', eAdmin,(req, res) => {
    const { page = 1 } = req.query
    Blog.paginate({}, { page, limit: 6 }).then((blog) => {
        res.render('blog/visualisar-blog', { layout: "admin", blog: blog })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})

router.get('/edit-blog/:id', eAdmin, (req, res) => {
    Blog.findOne({ _id: req.params.id }).then((blog) => {
        res.render('blog/edit-blog', { layout: "admin", blog: blog })
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })

})

router.post('/update-blog', eAdmin, (req, res) => {
    Blog.findOne({ _id: req.body.id }).then((blog) => {
        blog.titulo = req.body.titulo,
            blog.subtitulo = req.body.subtitulo,
            blog.desctopo = req.body.descricaotopo,
            blog.descricao = req.body.descricao,
            blog.categoria = req.body.categoria
        blog.save().then(() => {
            req.flash("success_msg", "editado com sussesso")
            res.redirect('/blog/visualisar-blog')
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

router.get("/delete-blog/:id", eAdmin, (req, res) => {
    Blog.deleteOne({ _id: req.params.id }).then((blog) => {
        req.flash("success_msg", "Post excluido com sucesso!")
        res.redirect('/blog/visualisar-blog')
    }).catch((erro) => {
        console.log(erro)
        req.flash("error_msg", 'Erro algo deu errado' + erro)
        res.redirect("/blog")
    })
})



//Imagem Página Blog
router.get('/edit-page-img', eAdmin, (req, res) => {
    res.render('blog/edit-page-img', { layout: "admin" })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/blog/page-img/")
    },
    filename: function (req, file, cb) {
        cb(null, "blog_page.jpg")
    }
})
var upload = multer({ storage })

router.post('/edit-img-page',upload.single('img'), eAdmin, (req, res) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/blog/edit-page-img")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/blog/edit-page-img")
    }

})

//Imagem página vis-blog

router.get('/edit-vis-img', eAdmin, (req, res) => {
    res.render('blog/edit-vis-img', { layout: "admin" })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/blog/page-img/")
    },
    filename: function (req, file, cb) {
        cb(null, "vis_blog_page.jpg")
    }
})
var upload = multer({ storage })

router.post('/edit-img-vis-blog',upload.single('img'), eAdmin, (req, res) => {
    const file = req.file
    if(!file){
        req.flash("error_msg", "Arquivo invalido")
        res.redirect("/blog/edit-vis-img")
    }else{
        req.flash("success_msg", "Upload realizado com sucesso!")
        res.redirect("/blog/edit-page-img")
    }

})
module.exports = router