const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContatoPg = new Schema({
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    }
})

mongoose.model('contatopg', ContatoPg)