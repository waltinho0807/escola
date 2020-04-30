const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Img_aluno = new Schema({
    ra_aluno: {
        type: Schema.Types.ObjectId,
        ref: "aluno",
    },
    foto_aluno: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: false
    }

})

Img_aluno.plugin(mongoosePaginate)
mongoose.model('img_aluno', Img_aluno)