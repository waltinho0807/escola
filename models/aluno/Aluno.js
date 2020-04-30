const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Aluno = new Schema({
    nome: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    serie: {
        type: Schema.Types.ObjectId,
        ref: "serie",
        
    },
    ra: {
        type: String,
        
    },
    rr_responsavel: {
        type: Schema.Types.ObjectId,
        ref: "usuario",
    },
    cpf: {
        type: String
    },
    foto_aluno: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: false
    }

})

Aluno.plugin(mongoosePaginate)
mongoose.model('aluno', Aluno)