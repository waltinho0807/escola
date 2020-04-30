const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Blog = new Schema({
    titulo: {
        type: String,
        
    },
    subtitulo: {
        type: String,
        
    },
    desctopo: {
        type: String,
       
    },
    descricao: {
        type: String,
       
    },
    imagem: {
        type: String,
        
    },
    imagemdois: {
        type: String,
        
        
    },
    imagemtres: {
        type: String,
        
    },
    categoria: {
        type:String,
        
    },
    tag: {
        type:String,
        
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

Blog.plugin(mongoosePaginate)

mongoose.model('blog', Blog)