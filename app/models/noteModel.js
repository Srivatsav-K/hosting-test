const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    body: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Note = mongoose.model('Notes', noteSchema)

module.exports = Note