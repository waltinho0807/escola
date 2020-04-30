const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeContagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    titulonumum: {
        type: String,
        required: true
    },
    numeroum: {
        type: Number,
        required: true
    },
    titulonumdois: {
        type: String,
        required: true
    },
    numerodois: {
        type: Number,
        required: true
    },
    titulonumtres: {
        type: String,
        required: true
    },
    numerotres: {
        type: Number,
        required: true
    },
    titulonumquatro: {
        type: String,
        required: true
    },
    numeroquatro: {
        type: Number,
        required: true
    },
})

mongoose.model("homecontagem", HomeContagem)