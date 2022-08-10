const mongoose = require('mongoose')

const configDB = () => {
    mongoose.connect('mongodb+srv://srivatsav:WtfPIzPi2A3WczXl@deploy-test.wxaydrj.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('connected to db'))
        .catch((err) => console.log('error connecting to db', err))
}

module.exports = configDB