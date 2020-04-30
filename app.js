const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const passport = require('passport')
require('./config/auth')(passport)
const app = express()
const home = require('./routes/home')
const sobre = require('./routes/sobre')
const contato = require('./routes/contato')
const usuario = require('./routes/usuario')
const blog = require('./routes/blog')
const docentes = require('./routes/docentes')
const cursos = require('./routes/cursos')
const add_bd = require('./routes/add_bd')
const dashboard = require('./routes/dashboard')
const responsaveis = require('./routes/responsaveis')
const biblioteca = require('./routes/biblioteca')
const para_responsaveis = require('./routes/para_responsaveis')
const video = require('./routes/video')



//sessão
app.use(session({
    secret: 'colegionm',
    resave: true,
    saveUninitialized: true,
    
  }))

  //Passport
  app.use(passport.initialize())
  app.use(passport.session())

  //flash
  app.use(flash())

  //middleware
  app.use((req, res, next)=>{
      res.locals.success_msg = req.flash('success_msg')
      res.locals.error_msg = req.flash('error_msg')
      next()
})
  


//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Handlebars
app.engine('handlebars', handlebars({defaultLayout: "main"}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, "public")))

//Conexão com o banco
mongoose.connect('mongodb://localhost/escola', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Conectado com o banco')
}).catch((erro)=>{
    console.log('erro' + erro)
})

//Rotas
app.use('/', home)
app.use('/sobre', sobre)
app.use('/contato', contato)
app.use('/usuario', usuario)
app.use('/blog', blog)
app.use('/docentes', docentes)
app.use('/cursos', cursos)
app.use('/dashboard', dashboard)
app.use('/add_bd', add_bd)
app.use('/responsaveis', responsaveis)
app.use('/biblioteca', biblioteca)
app.use('/para_responsaveis', para_responsaveis)
app.use('/video', video)



const PORT = 8080
app.listen(PORT, ()=>{
    console.log('Servidor Conectado')
})

