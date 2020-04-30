const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema


const Cursos = new Schema({
    curso: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    desccurso: {
        type: String,
        required: true
    },
    urlcurso: {
        type: String,
        required: true
    },
    imgcurso: {
        type: String,
        
    }
})

Cursos.plugin(mongoosePaginate)
mongoose.model('cursos', Cursos)