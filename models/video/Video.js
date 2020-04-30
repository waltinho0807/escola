const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Video = new Schema({
    titulo: {
        type: String,
        
    },
    subtitulo: {
        type: String,
        
    },
    descricao: {
        type: String,
       
    },
    video: {
        type: String,
        
    },
    serie_video: {
        type: Schema.Types.ObjectId,
        ref: "serie",
        
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

Video.plugin(mongoosePaginate)

mongoose.model('video', Video)