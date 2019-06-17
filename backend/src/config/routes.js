const express = require('express')
const { signIn, validateToken } = require('../api/auth/auth')
const { save } = require('../api/auth/usuario')

module.exports = function(app) {

    //rotas que serão abertas
    app.route('/signup').post(save)
    app.route('/auth').post(signIn)

    //rotas que serão fechadas
    const router = express.Router()
    app.use('/api', router)

    const userService   = require('../api/user/userService')
    userService.register(router, '/users')

}