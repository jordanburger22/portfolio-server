const express = require('express')
const authRouter = express.Router()
const {login, signup, googleLogin} = require('../controllers/userController')


authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.post('/google', googleLogin)

module.exports = authRouter