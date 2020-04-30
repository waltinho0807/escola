const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Docentes = new Schema({
    nome: {
        type: String,
        required: true
    },
    aula: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        
    },
    desc: {
        type: String,
        required: true
    },
    facebook:{
        type: String
    },
    instagram: {
        type: String
    },
    tweeter: {
        type: String
    }
})

mongoose.plugin(mongoosePaginate)
mongoose.model('docentes', Docentes)