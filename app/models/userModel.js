const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const uniqueValidator = require('mongoose-unique-validator')
const bcryptjs = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: [4, 'username too short'],
        maxlength: [64, 'username too long'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function (value) {
                return isEmail(value)
            },
            message: function () {
                return 'Invalid email'
            }
        },
        unique: true,
        trim: true

    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
            },
            message: function () {
                return 'Password must contain at least 1 uppercase character,lowercase character,number & a special character'
            }
        },
        minlength: [8, 'password too short'],
        maxlength: [128, 'password too long']
    }
}, { timestamps: true })

userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' })

userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt()
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                    .then((encrypted) => {
                        user.password = encrypted
                        next()
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User