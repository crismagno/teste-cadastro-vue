const express = require('express')
const { signIn, signUp, validateToken } = require('../api/auth/auth')
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
    
    const statusVendaService = require('../api/status_venda/statusVendaService')
    statusVendaService.register(routerProtected, '/status-venda')

    const anotacaoService = require('../api/anotacao/anotacaoService')
    anotacaoService.register(routerProtected, '/anotacao')


    /*
    *rotas que serão abertas
    */
   app.route('/signup').post(signUp)
   app.route('/signin').post(signIn)
   app.route('/validateToken').post(validateToken)
}



// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null, './upload')
//     },

//     filename: function(req, file, callback){
//         callback(null, `${Date.now()}_IMG`)
//     }
// })

// const upload = multer({ storage }).single('arquivo')
