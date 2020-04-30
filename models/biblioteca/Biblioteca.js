const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Biblioteca = new Schema({
    editora: {
        type: String,
        
    },
    autor: {
        type: String,
        
    },
    titulo: {
        type: String,
       
    },
    isbn: {
        type: String,
       
    },
    fotocapa: {
        type: String,
        
    },
    
    categoria: {
        type:String,
        
    },
    descricao: {
        type:String,
        
    },
    ano: {
        type:String,
        
    },
    situacao: {
        type:String,
        
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

Biblioteca.plugin(mongoosePaginate)

mongoose.model('biblioteca', Biblioteca)