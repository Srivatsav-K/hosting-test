const jwt = require('jsonwebtoken')
const User = require('../app/models/userModel')

const userAuthentication = (req, res, next) => {
    if (!req.header('x-auth')) {
        res.json({ errors: 'Token not present' })
    } else {
        const token = req.header('x-auth').split(' ')[1]
        let tokenData
        try {
            tokenData = jwt.verify(token, process.env.SECRET_KEY)
            User.findOne({ _id: tokenData._id }, '-password')
                .then((user) => {
                    if (!user) {
                        res.json({ errors: 'User not found' })
                    } else {
                        req.user = user
                        next()
                    }
                })
        } catch (e) {
            res.json({ errors: e })
        }
    }
}

module.exports = { userAuthentication }