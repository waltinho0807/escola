module.exports = {
    eResponsavel: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            req.flash("error_msg", "Necessário realizar o login para acessar a página solicitada!")
            res.redirect('/usuario/login')
        }
    }
}