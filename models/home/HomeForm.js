const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeForm = new Schema({
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    titulobtn:{
        type: String,
        required: true
    }
})

mongoose.model('homeform', HomeForm)