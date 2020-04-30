const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
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
require('../models/sobre/SobreLado')
const SobreLado = mongoose.model('sobrelado')
require('../models/sobre/SobreTopo')
const SobreTopo = mongoose.model('sobretopo')
require('../models/home/HomeContagem')
const HomeContagem = mongoose.model('homecontagem')
require('../models/contato/ContatoPg')
const ContatoPg = mongoose.model('contatopg')
require('../models/usuario/Usuario')
const Usuario = mongoose.model('usuario')
require('../models/serie/Serie')
const Serie = mongoose.model('serie')

router.get('/', (req, res)=>{
   /* new HomeTopo({
        tituloum: "Crianças são os melhores Exploradores do Mundo",
        titulodois: "Ensino Perfeito Para  Seus Filhos",
        titulobtnum: "Saiba Mais",
        urlbtnum: "/sobre",
        titulobtndois: "Saiba Mais",
        urlbtndois: "/sobre",
        subtituloum: "Professores Qualificados",
        descum: "Nossos professores são experientes e qualificados com amplo curriculo academico .",
        subtitulodois: "Educação Especial",
        descdois: "Temos varias ativides extra classe e promovemos sempre a integração dos pais.",
        subtitulotres: "Biblioteca &amp; Informatica",
        desctres: "Alunos tem acesso a biblioteca e um amplo laboratorio de informatica.",
        subtituloquatro: "Ensino Forte",
        descquatro: "Educação de qualidade comprovada, com aprovações nos melhores vestibulares."
    }).save().then(()=>{
        res.send('Cadastrado')
    })*/

  /*  new HomeChamada({
        titulo: "Traga Seu Filho Para Estudar Com A Gente",
        subtitulo: "Uma simples lembrança para guardar na memória os melhores amigos e os momentos que passamos juntos neste ano que se encerra.",
        titulobtn: "Estude conosco",
        urlbtn: "/contato"
    }).save().then(()=>{
        res.send('Cadastrado')
    }) */

   /* new HomeExtra({
        subtitulotop: "As atividades extracurriculares possuem o poder de fazer aflorar determinados aspectos nas crianças e até mesmo trabalhar dificuldades e fragilidades.",
        tituloum: "Informática",
        descum: "As aulas de informática trazem inúmeros benefícios para os alunos. A tecnologia motiva os alunos e facilita a sua capacidade de atenção.",
        urltituloum: "#",
        periodoum: "Ano Letivo",
        titulodois: "Balé Aereo",
        descdois: "O Balé Aéreo une a dança, pilates e acrobacias de circo em um só método. Aqui se aprende brincando.",
        urltitulodois: "#",
        periododois: "Ano Letivo",
        titulotres: "Violão",
        desctres: "Ao tocar violão, a criança aprende a socializar, a expressar seus sentimentos e a enriquecer seu universo.",
        urltitulotres: "#",
        periodotres: "Ano Letivo",
        tituloquatro: "Judô",
        descquatro: "Os seus principais objetivos são fortalecer o físico, a mente e o espírito de forma integrada, além de desenvolver técnicas de defesa pessoal.",
        urltituloquatro: "#",
        periodoquatro: "Ano Letivo",
        
    }).save().then(()=>{
        res.send('Cadastrado')
    })*/

   /* new HomeForm({
        titulo: "Solicite Nossos Preços",
        subtitulo: "Já pensou matricular seu filho em um dos melhores Colégios do Município então venha nos fazer uma visita ou entre em contato!.",
        titulobtn: "Enviar",
    }).save().then(()=>{
        res.send('Cadastrado')
    }) */

   /* new HomeEnsino({
        subtitulo: "Nossos alunos têm aulas de Língua Inglesa a partir do Maternal e no 1 ano do Ensino Fundamental, além do Inglês é introduzido  Ensino de Língua Espanhola.",
        tituloum: "Educação Infantil",
        descumensino: "A partir do ano que vem o Colégio tem turmas do Maternal I, com idade de 02 anos.",
        titulobtnum: "Saiba Mais",
        urlbtnum: "#",
        titulodois:"Fundamental I e II" ,
        descdois: "Nosso material do Ensino Fundamental do Ético propõe uma abordagem contextualizada.",
        titulobtndois: "Saiba Mais",
        urlbtndois: "#",
        titulotres: "Médio",
        desctres: "E como Colégio nos incentivamos e apoiamos nossos alunos a realizarem seus sonhos",
        titulobtntres: "Saiba Mais",
        urlbtntres: "#",
        tituloquatro: "Superior",
        descquatro: "Você sabia que o Colégio Novo Milleniun é polo Ead da UniCesumar? A graduação que você precisa.",
        titulobtnquatro: "Saiba Mais",
        urlbtnquatro: "#"

    }).save().then(()=>{
        res.send('Cadastrado')
    }) */

    /*new SobreLado({
        titulo: "Bem Vindo A Nossa Escola",
        desc: "O Colégio Novo Milleniun está com as Matrículas Abertas para o ano letivo de 2020.A partir do ano que vem o Colégio tem turmas do Maternal I, com idade de 02 anos para a Educação InfantilFaça-nos uma visita, venha conhecer a nossa infraestrutura, nosso material e a nossa política de descontos com os nossos convênios.O futuro do seu filho começa aqui!",
        titulobtn: "Saiba Mais",
        urlbtn: "#"
    }).save().then(()=>{
        res.send('Cadastrado')
    }) 

    new SobreTopo({
        titulotop: "O Que Nos Oferecemos",
        subtitulotop: "Um ensino forte e de qualidade, ampla infra estrutura, todo suporte para pais e alunos para um ensino eficaz .",
        tituloum: "Segurança Primeiro",
        descum: "Nossa estrutura é preparada para os desafios acadêmicos e para o bem-estar de todo o núcleo escolar.",
        titulodois: "Professores qualificados",
        descdois: "Uma forte equipe de docentes, para um ensino de qualidade.",
        titulotres: "Atividades Criativas",
        desctres: "Proporcionamos atividades extra classe, e sempre envolvendo familiares.",
        tituloquatro: "Classes Regulares",
        descquatro: "Para atividades extra, e reforço.",
        titulocinco: "Classes Suficientes",
        desccinco: "Salas para todas as turmas, equipadas com todo conforto para os launos.",
        tituloseis: "Esportes e Diversão",
        descseis: "Temos quadra coberta e playground na nossa estrutura.",
    }).save().then(()=>{
        res.send('Cadastrado')
    }) 

    new HomeContagem({
        titulo: "Ha mais de 20 anos",
        subtitulo: "Seriedade e Competência em tudo o que faz!Ensino Infantil, Ensino Fundamental, Ensino Médio, Ensino Superior - EAD Unicesumar",
        titulonumum: "Professores",
        numeroum: 25,
        titulonumdois: "Alunos",
        numerodois: 2000 ,
        titulonumtres: "Pais Felizes",
        numerotres: 564,
        titulonumquatro: "Premios",
        numeroquatro: 30,
    }).save().then(()=>{
        res.send('Cadastrado')
    })
    
    new ContatoPg({
        endereco: "Rua Ricardo Fogaroli, 440 Vila S Paulo, 19280-000 Teodoro Sampaio, Sao Paulo, Brazil",
        telefone: "+55 18 3282-3339",
        email: "Colegionovomilenium@ig.com",
        site:"colegionovomilleniun.com.br"
    }).save().then(()=>{
        res.send('Cadastrado')
    })*/
     
  /*  var senha = "21213939"
    bcryptjs.genSalt(10, (erro, salt)=>{
        bcryptjs.hash(senha, salt, (erro, hash)=>{
            if(erro){
                console.log(erro)
                res.send('Erro')
            }else{
                var senha_cripto = hash
                new Usuario({
                    nome: "novomilleniun",
                    email: "novomilleniun@novomilleniun",
                    senha: senha_cripto
                }).save().then(()=>{
                    res.send('Cadastrado')
                }).catch((erro)=>{
                    req.flash('error_msg', 'Erro')
                }) 
            }
        })
    })*/

    /*var senha = "123456"
    bcryptjs.genSalt(10, (erro, salt)=>{
        bcryptjs.hash(senha, salt, (erro, hash)=>{
            if(erro){
                console.log(erro)
                res.send('Erro')
            }else{
                var senha_cripto = hash
                new Usuario({
                    nome: "pai1",
                    email: "pai1@pai1",
                    senha: senha_cripto
                }).save().then(()=>{
                    res.send('Cadastrado')
                }).catch((erro)=>{
                    req.flash('error_msg', 'Erro')
                }) 
            }
        })
    })*/

   /* new Serie({
        titulo:"3º Médio",
    }).save().then(()=>{
        res.send('Cadastrado')
    })*/

     
})

     


module.exports = router