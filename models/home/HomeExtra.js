const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeExtra = new Schema({
    subtitulotop: {
        type: String,
        required: true
    },
    tituloum: {
        type: String,
        required: true
    },
    descum: {
        type: String,
        required: true
    },
    urltituloum: {
        type: String,
        required:true
    },
    titulodois: {
        type: String,
        required: true
    },
    descdois: {
        type: String,
        required: true
    },
    urltitulodois: {
        type: String,
        required:true
    },
    titulotres: {
        type: String,
        required: true
    },
    desctres: {
        type: String,
        required: true
    },
    urltitulotres: {
        type: String,
        required:true
    },
    tituloquatro: {
        type: String,
        required: true
    },
    descquatro: {
        type: String,
        required: true
    },
    urltituloquatro: {
        type: String,
        required:true
    },
    titulocinco: {
        type: String,
        required: true
    },
    desccinco: {
        type: String,
        required: true
    },
    urltitulocinco: {
        type: String,
        required:true
    },
    tituloseis: {
        type: String,
        required: true
    },
    descseis: {
        type: String,
        required: true
    },
    urltituloseis: {
        type: String,
        required:true
    }
})

mongoose.model('homeextra', HomeExtra)