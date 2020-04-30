const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SobreLado = new Schema({
    titulo: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    titulobtn: {
        type: String,
        required: true
    },
    urlbtn: {
        type: String,
        required: true
    }
})

mongoose.model('sobrelado', SobreLado)