const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Aluno = new Schema({
    nome_aluno: {
        type: String,
        
    },
    linguaportuguesa_um: {
        type: String,
        
    },
    linguaportuguesa_dois: {
        type: String,
        
    },
    linguaportuguesa_tres: {
        type: String,
        
    },
    linguaportuguesa_quatro: {
        
    },
    matematica_um: {
        type: String
    },
    matematica_dois: {
        type: String
    },
    matematica_tres: {
        type: String,
    },
    matematica_quatro: {
        type: String,
    },
    ciencias_um: {
        type: String,
    },
    ciencias_dois: {
        type: String,
    },
    ciencias_tres: {
        type: String,
    },
    ciencias_quatro: {
        type: String,
    },
    geografia_um: {
        type: String,
    },
    geografia_dois: {
        type: String,
    },
    geografia_tres: {
        type: String,
    },
    geografia_quatro: {
        type: String,
    },
    historia_um: {
        type: String,
    },
    historia_dois: {
        type: String,
    },
    historia_tres: {
        type: String,
    },
    historia_quatro: {
        type: String,
    },
    ingles_um: {
        type: String,
    },
    ingles_dois: {
        type: String,
    },
    ingles_tres: {
        type: String,
    },
    ingles_quatro: {
        type: String,
    },
    artes_um: {
        type: String,
    },
    artes_dois: {
        type: String,
    },
    artes_tres: {
        type: String,
    },
    artes_quatro: {
        type: String,
    }

})

//type: Schema.Types.ObjectId,
    //    ref: "usuario",

Aluno.plugin(mongoosePaginate)
mongoose.model('aluno', Aluno)