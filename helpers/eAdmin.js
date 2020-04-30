module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.nome == "novomilleniun"){
                return next()
            }else{
                res.redirect('/para_responsaveis')
            }   
        }else{
            req.flash('error_msg', 'ERRO')
            res.redirect('/usuario/login')
        }
    }
}