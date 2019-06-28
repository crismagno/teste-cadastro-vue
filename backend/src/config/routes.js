const express = require('express')
const { signIn, signUp, validateToken } = require('../api/auth/auth')
// const { authenticate } = require('./passport')
const verifyToken = require('./verifyToken')

module.exports = function(app) {

    /*
    *rotas que serão protegidas de usuários e produtos
    */
    const routerProtected = express.Router()
    app.use('/api', routerProtected)

    routerProtected.use(verifyToken)

    const userService = require('../api/user/userService')
    userService.register(routerProtected, '/users')

    const productService = require('../api/product/productService')
    productService.register(routerProtected, '/products')





    /*
    *rotas que serão abertas
    */
   app.route('/signup').post(signUp)
   app.route('/signin').post(signIn)
   app.route('/validateToken').post(validateToken)
}
