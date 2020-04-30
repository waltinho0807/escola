const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeEnsino = new Schema({
    subtitulo: {
        type: String,
        required: true
    },
    tituloum: {
        type: String,
        required: true
    },
    descumensino: {
        type: String,
        required: true
    },
    titulobtnum: {
        type: String,
        required: true
    },
    urlbtnum: {
        type: String,
        required: true
    },
    titulodois: {
        type: String,
        required: true
    },
    descdois: {
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
    titulotres: {
        type: String,
        required: true
    },
    desctres: {
        type: String,
        required: true
    },
    titulobtntres: {
        type: String,
        required: true
    },
    urlbtntres: {
        type: String,
        required: true
    },
    tituloquatro: {
        type: String,
        required: true
    },
    descquatro: {
        type: String,
        required: true
    },
    titulobtnquatro: {
        type: String,
        required: true
    },
    urlbtnquatro: {
        type: String,
        required: true
    }
})

mongoose.model("homeensino", HomeEnsino)