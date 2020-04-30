const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const Serie = new Schema({
    titulo: {
        type: String,
        
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

Serie.plugin(mongoosePaginate)

mongoose.model('serie', Serie)