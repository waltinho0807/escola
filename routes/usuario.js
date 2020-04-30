const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) =>{
    res.render('usuario/login', {layout: "login"})
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect('/')
})



module.exports = router