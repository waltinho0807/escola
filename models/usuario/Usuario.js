const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    senha: {
        type: String,
        
    },
    rr: {
       type: String,
         
    },
    cpf: {
        type: String
    },
    acesso: {
        type: String
    },
    boletos: {
        type: String
    },
    foto_perfil: {
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

Usuario.plugin(mongoosePaginate)
mongoose.model('usuario', Usuario)