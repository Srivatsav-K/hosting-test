const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {}

userControllers.list = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

userControllers.signup = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
}

userControllers.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({ errors: 'Invalid email or password' })
            } else {
                bcryptjs.compare(body.password, user.password)
                    .then((match) => {
                        if (!match) {
                            res.json({ errors: 'Invalid email or password' })
                        } else {
                            const tokenData = {
                                _id: user._id,
                                username: user.username,
                                email: user.email
                            }
                            const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '2d' })
                            res.json({ token: `Bearer ${token}` })
                        }
                    })
                    .catch(err => res.json(err))
            }
        })
        .catch(err => {
            res.json(err)
        })
}

userControllers.account = (req, res) => {
    res.json(req.user)
}

module.exports = userControllers