const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const bcryptjs = require('bcryptjs')
require('../models/usuario/Usuario')
const Usuario = mongoose.model('usuario')
require('../models/aluno/Aluno')
const Aluno = mongoose.model('aluno')
const {eAdmin} = require('../helpers/eAdmin')
const {eResponsavel} = require('../helpers/eResponsavel')

router.get('/', eResponsavel, (req, res)=>{
    const usuario = req.user._id
   Aluno.find({rr_responsavel: usuario._id}).populate('usuario').then((aluno)=>{
        res.render('para_responsaveis/para_responsaveis', {layout: "pais", usuario: req.user, aluno: aluno})    
       })
    })

    router.get('/aluno-info/:id', eResponsavel, (req, res)=>{
        Aluno.findOne({_id: req.params.id}).then((aluno)=>{
            res.render('para_responsaveis/aluno-info', {layout: "pais", usuario: req.user, aluno: aluno})
        }) 
                
        })

        router.get('/boletim/:id', (req, res)=>{
            Aluno.findOne({_id: req.params.id}).then((aluno)=>{
                res.render('para_responsaveis/boletim', {layout: "pais", usuario: req.user, aluno: aluno})
            }) 
                    
            })

module.exports = router