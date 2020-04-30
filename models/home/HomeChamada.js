const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeChamada = new Schema({
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    titulobtn: {
        type: String,
        required:true
    },
    urlbtn: {
        type: String,
        required: true
    } 
})

mongoose.model('homechamada', HomeChamada)