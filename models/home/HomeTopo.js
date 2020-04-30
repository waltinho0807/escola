const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeTopo = new Schema({
    tituloum: {
        type: String,
        required: true
    },
    titulodois: {
        type: String,
        required:true
    },
    titulobtnum: {
        type: String,
        required: true
    },
    urlbtnum: {
        type: String,
        required: true
    },
    titulobtndois: {
        type: String,
        required: true
    },
    urlbtndois: {
        type: String,
        required: true
    },
    subtituloum: {
        type: String,
        required: true
    },
    descum: {
        type: String,
        required: true
    },
    subtitulodois: {
        type: String,
        required: true
    },
    descdois: {
        type: String,
        required: true
    },
    subtitulotres: {
        type: String,
        required: true
    },
    desctres: {
        type: String,
        required: true
    },
    subtituloquatro: {
        type: String,
        required: true
    },
    descquatro: {
        type: String,
        required: true
    }

})

mongoose.model('hometopo', HomeTopo)