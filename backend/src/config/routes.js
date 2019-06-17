const express = require('express')

module.exports = function(app) {
    const router = express.Router()
    app.use('/api', router)

    const userService   = require('../api/user/userService')
    userService.register(router, '/users')
}