const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const HomeMsg = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
        
    },
    serie: {
        type: String,
        required: true
       
    },
    telefone: {
        type: String,
        required:true
       
    },
    mensagem: {
        type: String,
        required: true
        
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

HomeMsg.plugin(mongoosePaginate)

mongoose.model('homemsg', HomeMsg)