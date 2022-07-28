const express = require('express')
const notesControllers = require('../app/controllers/notesControllers')
const router = express.Router()

const userControllers = require('../app/controllers/userControllers')
const { userAuthentication } = require('../middleware/userAuthentication')

router.post('/users/signup', userControllers.signup)
router.post('/users/login', userControllers.login)
router.get('/users/account', userAuthentication, userControllers.account)
router.get('/users', userControllers.list)

router.route('/user/notes').get(userAuthentication, notesControllers.list).post(userAuthentication, notesControllers.create)
router.route('/user/notes/:id').get(userAuthentication, notesControllers.show).put(userAuthentication, notesControllers.update).delete(userAuthentication, notesControllers.delete)

module.exports = router