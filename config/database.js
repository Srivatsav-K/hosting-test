const mongoose = require('mongoose')

const configDB = () => {
    mongoose.connect('mongodb://localhost:27017/notes-redux')
        .then(() => console.log('connected to db'))
        .catch((err) => console.log('error connecting to db', err))
}

module.exports = configDB